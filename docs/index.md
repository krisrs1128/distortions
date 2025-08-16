# Distortions

The `distortions` package gives functions to compute and visualize the
distortions that are introduced by nonlinear dimensionality reduction
algorithms. It is designed to wrap arbitrary embedding methods and builds on the
distortion estimation routines from the [`megaman` package](https://mmp2.github.io/megaman/).  The resulting visualizations
visualizations can let you interactively query properties that are not well
preserved by the embedding. For example, the image below shows us selecting
distances that are larger in the embedding space compared to the original data
space (to run this yourself, see the [`PBMC Atlas` article](tutorials/pbmc.html)).

![](https://github.com/krisrs1128/distortions-data/blob/main/figures/pbmc_boxplot.gif?raw=true)


## Installation

You can install the package using:

```
python -m pip install distortions
```

## Help

You can reach us by creating an Issue in the [package
repository](https://github.com/krisrs1128/distortions/issues) or sending an
email to [ksankaran@wisc.edu](mailto:ksankaran@wisc.edu). We appreciate your
trying out the package and will try our best to reply promptly.