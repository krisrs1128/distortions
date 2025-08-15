"""Riemannian Metric learning utilities and algorithms.

   To use the "geometric" Laplacian from geometry.py for statistically
   consistent results.
"""

# Author: Marina Meila <mmp@stat.washington.edu>
#         after the Matlab function rmetric.m by Dominique Perrault-Joncas
# LICENSE: Simplified BSD https://github.com/mmp2/megaman/blob/master/LICENSE

import numpy as np
import pandas as pd

def arrays_to_df(x):
    x_flat = [x_.flatten() for x_ in x]
    return pd.DataFrame(x_flat)

def local_distortions(embedding, data, geom):
    """
    Compute local Riemannian metric distortions for each sample.

    Parameters
    ----------
    embedding : np.ndarray, shape (n_samples, n_embedding_dims)
        Low-dimensional embedding of the data. Each row corresponds to a sample,
        and each column corresponds to an embedding dimension.
    data : np.ndarray, shape (n_samples, n_features)
        Original high-dimensional data. Each row is a sample, each column a feature.
    geom : Geometry
        An instance of the Geometry class (from geometry.py) that provides
        methods for setting the data matrix and computing the Laplacian matrix.

    Returns
    -------
    H : np.ndarray
        Dual Riemannian metric tensor for each sample.
    Hvv : np.ndarray
        Singular vectors of the dual metric tensor for each sample.
    Hs : np.ndarray
        Singular values of the dual metric tensor for each sample.

    Notes
    -----
    This function sets the data matrix in the provided Geometry object,
    computes the Laplacian matrix, and then estimates the local Riemannian
    metric distortions in the embedding space using the original data.
    """
    geom.set_data_matrix(data)
    L = geom.compute_laplacian_matrix()
    _, _, Hvv, Hs, _, H = riemann_metric(embedding, L, n_dim=2)
    return H, Hvv, Hs

def bind_metric(embedding, Hvv, Hs):
    """
    Combine embedding coordinates with local Riemannian metric information.

    Parameters
    ----------
    embedding : np.ndarray, shape (n_samples, n_embedding_dims)
        The low-dimensional embedding of the data. This should be the same array
        as the `embedding` argument passed to `local_distortions`.
    Hvv : np.ndarray, shape (n_samples, n_embedding_dims, n_embedding_dims)
        The singular vectors of the dual Riemannian metric tensor for each sample,
        as returned by `local_distortions`.
    Hs : np.ndarray, shape (n_samples, n_embedding_dims)
        The singular values of the dual Riemannian metric tensor for each sample,
        as returned by `local_distortions`.

    Returns
    -------
    combined : pd.DataFrame
        A DataFrame containing the embedding coordinates, the singular vectors and
        singular values of the local dual Riemannian metric for each sample, and
        an additional column "angle" computed from the first two singular vector
        components.

    Notes
    -----
    This function is intended to facilitate analysis and visualization by merging
    the embedding and local metric information into a single tabular structure.
    """
    K = embedding.shape[1]
    Hvv_df = pd.concat([arrays_to_df(Hvv), arrays_to_df(Hs)], axis=1)
    embedding_df = pd.DataFrame(embedding, columns=[f"embedding_{i}" for i in range(K)])
    embedding_df = embedding_df.reset_index(drop=True)
    Hvv_df = Hvv_df.reset_index(drop=True)

    # merge the embedding and metric data
    combined = pd.concat([embedding_df, Hvv_df], axis=1)
    metric_columns = sum([[f"x{i}", f"y{i}"] for i in range(K)], []) + [f"s{i}" for i in range(K)]
    combined.columns = list(embedding_df.columns) + metric_columns
    combined["angle"] = np.arctan(combined.y1 / combined.x1) * (180 / np.pi)
    return combined
    
def riemann_metric(Y, laplacian, n_dim=None, invert_h=False, mode_inv = 'svd'):
    """
    Parameters
    ----------
    Y: array-like, shape = (n_samples, mdimY )
        The embedding coordinates of the points
    laplacian: array-like, shape = (n_samples, n_samples)
        The Laplacian of the data. It is recommended to use the "geometric"
        Laplacian (default) option from geometry.graph_laplacian()
    n_dim : integer, optional
        Use only the first n_dim <= mdimY dimensions.All dimensions
        n_dim:mdimY are ignored.
    invert_h: boolean, optional
        if False, only the "dual Riemannian metric" is computed
        if True, the dual metric matrices are inverted to obtain the
        Riemannian metric G.
    mode_inv: string, optional
       How to compute the inverses of h_dual_metric, if invert_h
        "inv", use numpy.inv()
        "svd" (default), use numpy.linalg.svd(), then invert the eigenvalues
        (possibly a more numerically stable method with H is symmetric and
        ill conditioned)

    Returns
    -------
    h_dual_metric : array, shape=(n_samples, n_dim, n_dim)
    Optionally :
    g_riemann_metric : array, shape=(n_samples, n_dim, n_dim )
    Hvv : singular vectors of H, transposed, shape = ( n_samples, n_dim, n_dim )
    Hsvals : singular values of H, shape = ( n_samples, n_dim )
    Gsvals : singular values of G, shape = ( n_samples, n_dim )

    Notes
    -----
    References
    ----------
    "Non-linear dimensionality reduction: Riemannian metric estimation and
    the problem of geometric discovery",
    Dominique Perraul-Joncas, Marina Meila, arXiv:1305.7255
    """
    n_samples = laplacian.shape[0]
    h_dual_metric = np.zeros((n_samples, n_dim, n_dim))
    n_dim_Y = Y.shape[1]
    h_dual_metric_full = np.zeros((n_samples, n_dim_Y, n_dim_Y))
    for i in range(n_dim_Y):
        for j in range(i, n_dim_Y):
            yij = Y[:,i] * Y[:,j]
            h_dual_metric_full[ :, i, j] = \
                0.5 * (laplacian.dot(yij) - \
                       Y[:, j] * laplacian.dot(Y[:, i]) - \
                       Y[:, i] * laplacian.dot(Y[:, j]))
    for j in np.arange(n_dim_Y - 1):
        for i in np.arange(j+1, n_dim_Y):
            h_dual_metric_full[:, i, j] = h_dual_metric_full[:, j, i]

    riemann_metric, h_dual_metric, Hvv, Hsvals, Gsvals = \
        compute_G_from_H(h_dual_metric_full)
    return h_dual_metric, riemann_metric, Hvv, Hsvals, Gsvals, h_dual_metric_full


def compute_G_from_H(H, mdimG=None, mode_inv="svd"):
    """
    Parameters
    ----------
    H : the inverse R. Metric
    if mode_inv == 'svd':
       also returns Hvv, Hsvals, Gsvals the (transposed) eigenvectors of
       H and the singular values of H and G
    if mdimG < H.shape[2]:
       G.shape = [ n_samples, mdimG, mdimG ] with n_samples = H.shape[0]

    Notes
    ------
    currently Hvv, Hsvals are n_dim = H.shape[2], and Gsvals, G are mdimG
    (This contradicts the documentation of riemann_metric which states
    that riemann_metric and h_dual_metric have the same dimensions)

    See the notes in RiemannMetric
    """
    n_samples = H.shape[0]
    n_dim = H.shape[2]
    if mode_inv is 'svd':
        Huu, Hsvals, Hvv = np.linalg.svd(H)
        if mdimG is None or mdimG == n_dim:
            # Gsvals = 1./Hsvals
            Gsvals = np.divide(1, Hsvals, out=np.zeros_like(Hsvals), where=Hsvals != 0)
            G = np.zeros((n_samples, n_dim, n_dim))
            new_H = H
            for i in np.arange(n_samples):
                G[i,:,:] = np.dot(Huu[i,:,:], np.dot( np.diag(Gsvals[i,:]), Hvv[i,:,:]))
        elif mdimG < n_dim:
            Gsvals[:,:mdimG] = 1./Hsvals[:,:mdimG]
            Gsvals[:,mdimG:] = 0.
            # this can be redone with np.einsum() but it's barbaric
            G = np.zeros((n_samples, mdimG, mdimG))
            new_H = np.zeros((n_samples, mdimG, mdimG))
            for i in np.arange(n_samples):
                G[i,:,:mdimG] = np.dot(Huu[i,:,mdimG], np.dot( np.diag(Gsvals[i,:mdimG]), Hvv[i,:,:mdimG]))
                new_H[i, :, :mdimG] = np.dot(Huu[i,:,mdimG], np.dot( np.diag(Hsvals[i,:mdimG]), Hvv[i,:,:mdimG]))
        else:
            raise ValueError('mdimG must be <= H.shape[1]')
        return G, new_H, Hvv, Hsvals, Gsvals
    else:
        raise NotImplementedError('Not yet implemented non svd update.')