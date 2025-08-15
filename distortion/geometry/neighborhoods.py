from altair_transform import extract_data
from scipy.spatial.distance import cdist
from sklearn.neighbors import NearestNeighbors
import altair as alt
import numpy as np
import pandas as pd


def iqr(x, percentiles):
    """
    Calculate the interquartile range between given percentiles.
    
    This function computes the difference between two percentiles of the
    input array, typically used to measure the spread of data.

    Parameters
    ----------
    x : array-like
        Input array for which to calculate the interquartile range.
    percentiles : array-like of length 2
        Two percentile values (e.g., [25, 75] for standard IQR).
        The function returns the difference between the higher and lower percentiles.

    Returns
    -------
    float
        The interquartile range (difference between the specified percentiles).
    """
    return np.subtract(*np.percentile(x, percentiles))

def neighborhood_distances(adata, embed_key="X_umap"):
    """
    Compute pairwise distances between samples and their neighbors in both original and embedding spaces.

    This function calculates pairwise distances between each sample and its
    neighbors in the original high-dimensional space and compares them with
    distances in the reduced embedding space. This is useful for analyzing
    how well the embedding preserves local neighborhood structure.

    Parameters
    ----------
    adata : anndata.AnnData
        Annotated data matrix. Must contain a precomputed embedding (e.g., UMAP or t-SNE) in `obsm[embed_key]`
        and a neighbor graph in `obsp["distances"]`.
    embed_key : str, default="X_umap"
        Key in `adata.obsm` where the embedding coordinates are stored.

    Returns
    -------
    pd.DataFrame
        DataFrame with columns:
            - 'center': index of the sample (cell)
            - 'neighbor': index of the neighbor sample
            - 'true': distance in the original space (from `adata.obsp["distances"]`)
            - 'embedding': distance in the embedding space (from `adata.obsm[embed_key]`)

    Notes
    -----
    The number of neighbors is determined by the structure of the neighbor graph in `adata.obsp["distances"]`.
    The function assumes that the embedding and neighbor graph have already been computed.
    """
    knn_graph = adata.obsp["distances"]
    dist_list = []

    for ix in range(len(adata)):
        neighbors = knn_graph[ix].nonzero()[1]
        true = knn_graph[ix, neighbors].toarray().flatten()
        embedding = cdist(
            [adata.obsm[embed_key][ix, :]], 
            adata.obsm[embed_key][neighbors, :]
        ).flatten()
        dist_list.append(pd.DataFrame({
            "center": [ix] * len(neighbors), 
            "neighbor": neighbors,
            "true": true,
            "embedding": embedding
        }))

    return pd.concat(dist_list)

def neighborhoods(adata, outlier_factor=3, threshold=0.2, method="box",
                  percentiles=[75, 25], frame=[50, 50], nbin=10, **kwargs):
    """
    Identify broken neighborhoods in embeddings using different methods.
    
    This function serves as the main interface for detecting broken neighborhoods
    in dimensionality reduction embeddings. It supports multiple methods for
    identifying outliers and broken links between original and embedding spaces.

    Parameters
    ----------
    adata : anndata.AnnData
        Annotated data matrix with precomputed embedding and neighbor graph.
    outlier_factor : float, default=3
        Factor used to determine outlier threshold. Higher values are more
        permissive (fewer outliers detected).
    threshold : float, default=0.2  
        Proportion threshold for flagging samples as having broken neighborhoods.
        Centers with more than this proportion of broken neighbors are flagged.
    method : str, default="box"
        Method for identifying broken neighborhoods. Options:
        - "box": Uses boxplot-based outlier detection
        - "window": Uses sliding window smoothing with residual analysis
    percentiles : list of float, default=[75, 25]
        Percentiles used for IQR calculation in windowing method.
    frame : list of int, default=[50, 50]
        Window frame size [before, after] for sliding window smoothing.
    nbin : int, default=10
        Number of bins for boxplot method.
    **kwargs : keyword arguments
        Additional arguments passed to neighborhood_distances().

    Returns
    -------
    dict
        Dictionary mapping center indices to lists of their neighbor indices
        for samples with broken neighborhoods.

    Raises
    ------
    NotImplementedError
        If an unsupported method is specified.
    """
    if method == "box":
        return neighborhoods_box(adata, outlier_factor, threshold, nbin, **kwargs)
    if method == "window":
        return neighborhoods_window(adata, outlier_factor, threshold, percentiles, frame, **kwargs)
    else:
        return NotImplementedError(f"Method {method} not implemented for broken neighborhood construction.")

def neighborhoods_window(adata, outlier_factor=3, threshold=0.2, percentiles=[75, 25], frame=[50, 50], **kwargs):
    """
    Identify broken neighborhoods using window-based smoothing and residual analysis.
    
    This method applies a sliding window median filter to the distance relationships
    and identifies outliers based on residuals from the smoothed curve. Points with
    large positive residuals indicate broken neighborhoods where embedding distances
    are much larger than expected.

    Parameters
    ----------
    adata : anndata.AnnData
        Annotated data matrix with precomputed embedding and neighbor graph.
    outlier_factor : float, default=3
        Multiplier for IQR-based outlier threshold. Residuals greater than
        median + outlier_factor * IQR are considered broken.
    threshold : float, default=0.2
        Proportion threshold for flagging samples as having broken neighborhoods.
    percentiles : list of float, default=[75, 25]
        Percentiles used for IQR calculation in residual analysis.
    frame : list of int, default=[50, 50]
        Window frame size [before, after] for sliding median calculation.
    **kwargs : keyword arguments
        Additional arguments passed to neighborhood_distances().

    Returns
    -------
    dict
        Dictionary mapping center indices to lists of their neighbor indices
        for samples with broken neighborhoods.
    """
    dists = neighborhood_distances(adata, **kwargs)
    brokenness = identify_broken_window(dists, outlier_factor, percentiles, frame)
    return threshold_links(dists, brokenness, threshold)

def neighborhoods_box(adata, outlier_factor=3, threshold=0.2, nbin=10, **kwargs):
    """
    Identify broken neighborhoods using boxplot-based outlier detection.
    
    This method bins the true distances and computes boxplot statistics within
    each bin. Links are considered broken if their embedding distance is an
    outlier relative to other links with similar true distances.

    Parameters
    ----------
    adata : anndata.AnnData
        Annotated data matrix with precomputed embedding and neighbor graph.
    outlier_factor : float, default=3
        IQR multiplier for boxplot outlier detection. Values beyond
        Q1 - outlier_factor*IQR or Q3 + outlier_factor*IQR are outliers.
    threshold : float, default=0.2
        Proportion threshold for flagging samples as having broken neighborhoods.
    nbin : int, default=10
        Number of bins to divide the true distance range into.
    **kwargs : keyword arguments
        Additional arguments passed to neighborhood_distances().

    Returns
    -------
    dict
        Dictionary mapping center indices to lists of their neighbor indices
        for samples with broken neighborhoods.
    """
    dists = neighborhood_distances(adata, **kwargs)
    brokenness = identify_broken_box(dists, outlier_factor, nbin)
    return threshold_links(dists, brokenness, threshold)

def threshold_links(dists, brokenness, threshold=0.2):
    """
    Flag samples with high proportions of broken neighborhood links.
    
    This function identifies samples where the proportion of broken neighborhood
    links exceeds a specified threshold, indicating problematic embedding regions.

    Parameters
    ----------
    dists : pd.DataFrame
        DataFrame containing distance information with 'center' and 'neighbor' columns.
    brokenness : pd.DataFrame
        DataFrame with 'center' and 'brokenness' columns indicating broken links.
    threshold : float, default=0.2
        Proportion threshold for flagging samples. Centers with more than this
        proportion of broken neighbors are included in the output.

    Returns
    -------
    dict
        Dictionary mapping center indices (int) to lists of their neighbor indices
        for samples exceeding the brokenness threshold.
    """
    brokenness = brokenness.reset_index()
    centers = brokenness.center.unique()
    summary_dict = {}

    for i in range(len(centers)):
        subset = brokenness[brokenness["center"] == centers[i]]
        if np.mean(subset["brokenness"]) > threshold:
            brokenness.loc[i, "brokenness"] = True
            summary_dict[centers[i]] = [int(z) for z in dists[dists.center == centers[i]].neighbor.values]
    return summary_dict

def identify_broken_box(dists, outlier_factor=3, nbin=10):
    """
    Identify broken links using boxplot-based outlier detection within distance bins.
    
    This helper function bins the true distances and identifies outliers in the
    embedding distances within each bin using boxplot criteria.

    Parameters
    ----------
    dists : pd.DataFrame
        DataFrame with 'true' and 'embedding' distance columns.
    outlier_factor : float, default=3
        IQR multiplier for outlier detection threshold.
    nbin : int, default=10
        Number of bins to divide the true distance range into.

    Returns
    -------
    pd.DataFrame
        Copy of input distances DataFrame with additional 'brokenness' boolean column
        indicating which links are identified as broken outliers.
    """
    _, outliers = boxplot_data(dists["true"], dists["embedding"], nbin, outlier_factor)
    brokenness = dists.copy()
    brokenness = brokenness.reset_index()
    brokenness["brokenness"] = False
    brokenness.loc[outliers["index"].values, "brokenness"] = True
    return brokenness

def identify_broken_window(dists, outlier_factor=3, percentiles=[75, 25], frame=[50, 50]):
    """
    Identify broken links using sliding window smoothing and residual analysis.
    
    This helper function applies a sliding window median filter to the distance
    relationship and identifies links where the embedding distance significantly
    exceeds the smoothed expectation.

    Parameters
    ----------
    dists : pd.DataFrame
        DataFrame with 'true' and 'embedding' distance columns.
    outlier_factor : float, default=3
        Multiplier for IQR-based outlier threshold in residual analysis.
    percentiles : list of float, default=[75, 25]
        Percentiles used for IQR calculation.
    frame : list of int, default=[50, 50]
        Window frame size [before, after] for sliding median calculation.

    Returns
    -------
    pd.DataFrame
        DataFrame with original columns plus:
        - 'embedding_smooth': smoothed embedding distances
        - 'residual': difference between actual and smoothed embedding distances  
        - 'brokenness': boolean indicating broken links
    """
    line = alt.Chart(dists).transform_window(
        embedding_smooth='median(embedding)',
        sort=[alt.SortField('true')],
        frame=frame
    ).mark_line().encode(
        x='true:Q',
        y='embedding_smooth:Q'
    )

    result = extract_data(line).drop_duplicates()
    result["residual"] = result["embedding"] - result["embedding_smooth"]
    result["brokenness"] = result["residual"] > result["embedding_smooth"] + \
        outlier_factor * iqr(result["residual"], percentiles)
    return result


def broken_knn(embedding, k=2, z_thresh=1.0):
    """
    Determine broken points in embedding space using k-NN distances and Z-score thresholding.
    
    This function identifies potentially problematic points in an embedding by
    computing their average k-nearest neighbor distances, calculating Z-scores,
    and flagging points that exceed the threshold as broken or isolated.

    Parameters
    ----------
    embedding : array-like, shape (n_samples, n_features)
        The embedding coordinates for all samples.
    k : int, default=2
        Number of nearest neighbors to consider for distance calculation.
    z_thresh : float, default=1.0
        Z-score threshold for identifying broken points. Points with Z-scores
        greater than or equal to this value are considered broken.

    Returns
    -------
    list of int
        List of indices of broken points, sorted by descending Z-score.
        If no points exceed the threshold, returns the single point with
        the highest Z-score.
    """
    sub = embedding
    nbr_sub = NearestNeighbors(n_neighbors=k).fit(sub)
    d_sub, _ = nbr_sub.kneighbors(sub)
    d1 = d_sub.mean(axis=1) 
    
    # 2) Z-score & threshold
    mu, sigma = d1.mean(), d1.std()
    z = (d1 - mu) / sigma
    locs = np.where(z >= z_thresh)[0]
    if len(locs)==0:
        locs = [int(np.argmax(z))]

    # 3) rank by descending Z-score
    locs = sorted(locs, key=lambda i: z[i], reverse=True)
    return locs

def neighbor_generator(embedding, broken_locations = [], number_neighbor=10):
    """
    Generate neighbor lists for broken points in the embedding space.
    
    This function finds nearest neighbors for specified broken points (or
    automatically detected ones) in the embedding space. It's useful for
    understanding the local neighborhood structure around problematic points.

    Parameters
    ----------
    embedding : array-like, shape (n_samples, n_features)
        The embedding coordinates for all samples.
    broken_locations : list of int, default=[]
        Indices of broken points for which to generate neighbors. If empty,
        automatically detects broken points using broken_knn().
    number_neighbor : int, default=10
        Number of nearest neighbors to find for each broken point.

    Returns
    -------
    dict
        Dictionary mapping broken point indices (int) to lists of their 
        nearest neighbor indices, excluding the point itself.
    """
    if len(broken_locations) == 0:
        broken_locations = broken_knn(embedding)
    nbr_full = NearestNeighbors(n_neighbors=number_neighbor+1).fit(embedding)
    isolated = {}
    for idx in broken_locations:
        _, neigh = nbr_full.kneighbors([embedding[idx]])
        isolated[int(idx)] = neigh[0][1:].tolist()  # drop self
    return isolated

def boxplot_data(x, y, nbin=10, outlier_iqr=3, **kwargs):
    """
    Compute boxplot statistics and identify outliers within distance bins.
    
    This function divides the x-values (typically true distances) into bins and
    computes boxplot statistics for the y-values (typically embedding distances)
    within each bin. It identifies outliers using the IQR method.

    Parameters
    ----------
    x : array-like
        Input values used for binning (typically true/original distances).
    y : array-like
        Target values for which to compute statistics (typically embedding distances).
    nbin : int, default=10
        Number of bins to divide the x-value range into.
    outlier_iqr : float, default=3
        IQR multiplier for outlier detection. Values beyond Q1 - outlier_iqr*IQR
        or Q3 + outlier_iqr*IQR within each bin are considered outliers.
    **kwargs : keyword arguments
        Additional keyword arguments (currently unused).

    Returns
    -------
    summaries : pd.DataFrame
        DataFrame with boxplot statistics for each bin containing columns:
        - 'bin_id': bin identifier
        - 'q1', 'q2', 'q3': quartile values
        - 'min', 'max': minimum and maximum values
        - 'iqr': interquartile range
        - 'lower', 'upper': outlier detection bounds
        - 'bin': string representation of bin range
    outliers : pd.DataFrame  
        DataFrame with outlier information containing columns:
        - 'index': original index of outlier point
        - 'bin_id': which bin the outlier belongs to
        - 'bin': string representation of bin range
        - 'value': the outlier y-value
    """
    # divide the data into nbin groups, and compute quantiles in each
    bin_ids, bin_edges = pd.cut(x, bins=nbin, labels=False, retbins=True)
    bin_edges = np.round(bin_edges, 1)

    summaries = (
        pd.DataFrame({'bin_id': bin_ids, 'y': y})
        .groupby('bin_id', as_index=False)['y']
        .agg(q1=lambda v: np.percentile(v, 25),
             q2=lambda v: np.percentile(v, 50),
             q3=lambda v: np.percentile(v, 75),
             min='min', max='max')
    )
    summaries['iqr'] = summaries.q3 - summaries.q1
    summaries['lower'] = np.maximum(summaries.q2 - outlier_iqr * summaries.iqr, summaries['min'])
    summaries['upper'] = np.minimum(summaries.q2 + outlier_iqr * summaries.iqr, summaries['max'])
    summaries['bin'] = summaries['bin_id'].map(lambda b: f"{bin_edges[b]}-{bin_edges[b + 1]}")

    # compute outliers according to the IQR above
    outliers = [
        {"index": i, "bin_id": int(b), "bin": f"{bin_edges[b]}-{bin_edges[b + 1]}", "value": val}
        for i, (b, val) in enumerate(zip(bin_ids, y))
        if not np.isnan(b) and (
            val < summaries.loc[b, 'q1'] - outlier_iqr * summaries.loc[b, 'iqr'] or
            val > summaries.loc[b, 'q3'] + outlier_iqr * summaries.loc[b, 'iqr']
        )
    ]
    return summaries, pd.DataFrame(outliers)