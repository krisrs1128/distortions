import scanpy as sc
import pandas as pd

def scanpy_umap(adata, max_cells=200, n_neighbors=10, n_pcs=40):
    """
    Runs UMAP visualization on an AnnData object with basic preprocessing.

    This wrapper function filters genes by minimum count, applies log
    transformation, selects highly variable genes, computes neighbors in PCA
    space, and runs UMAP.

    Parameters
    ----------
    adata : anndata.AnnData
        AnnData experiment object containing the data to filter, transform, and
        apply UMAP to.
    max_cells : int, optional (default: 200)
        Maximum number of cells to use for visualization.
    n_neighbors : int, optional (default: 10)
        Number of neighbors to use for constructing the neighborhood graph.
    n_pcs : int, optional (default: 40)
        Number of principal components to use for neighborhood graph construction.

    Returns
    -------
    adata : anndata.AnnData
        The AnnData object after preprocessing and UMAP computation.

    Notes
    -----
    The function modifies the input AnnData object in place.

    Examples
    --------
    >>> import scanpy as sc
    >>> from distortion.visualization import scanpy_umap
    >>> adata = sc.datasets.pbmc3k()
    >>> adata_umap = scanpy_umap(adata, max_cells=100, n_neighbors=15, n_pcs=30)
    >>> sc.pl.umap(adata_umap)
    """
    adata = adata[:max_cells, :]

    # Preprocess the dataset
    sc.pp.filter_genes(adata, min_counts=1)
    sc.pp.log1p(adata)
    sc.pp.highly_variable_genes(adata, min_mean=0.5, min_disp=0.5)
    adata = adata[:, adata.var.highly_variable]

    # Run UMAP
    sc.pp.neighbors(adata, n_neighbors=n_neighbors, n_pcs=n_pcs)
    sc.tl.umap(adata)
    return adata