# C. elegans Embeddings

This directory contains precomputed embeddings for the C. elegans dataset used in the tutorial.

## Files

- `c_elegans_embeddings.joblib` - Precomputed UMAP and DenseUMAP embeddings

## Contents

The joblib file contains:
- `embedding_dumap`: DenseUMAP embedding (2D)
- `embedding_umap`: UMAP embedding (2D)  
- `data`: Original high-dimensional data
- `metadata`: Cell type metadata

## Usage

These embeddings are used in the `c_elegans_algorithm_comparison.ipynb` tutorial to save users time. Instead of waiting several minutes for the embeddings to be generated, users can download these precomputed versions.

## Generation

The embeddings were generated using:
- UMAP: `umap.UMAP(n_neighbors=10, n_components=2, n_epochs=500, densmap=False)`
- DenseUMAP: `umap.UMAP(n_neighbors=10, n_components=2, n_epochs=500, densmap=True)`

## File Size

The compressed joblib file is approximately 79 MB.

## License

These embeddings are derived from the original C. elegans dataset and are provided under the same license terms.