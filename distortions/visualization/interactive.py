import traitlets
import anywidget
from pathlib import Path
from ..geometry import boxplot_data

class dplot(anywidget.AnyWidget):
    """
    Interactive Distortion Plot Widget

    This class provides an interactive widget for visualizing distortion metrics
    computed on datasets, with a ggplot2-like syntax for adding graphical marks
    and overlaying distortion criteria. It is designed for use in Jupyter
    environments and leverages the anywidget and traitlets libraries for
    interactivity. You can pause mouseover interactivity by holding down the
    control key.

    Parameters
    ----------
    df : pandas.DataFrame
        The input dataset to visualize. Must be convertible to a list of records.
    *args : tuple
        Additional positional arguments passed to the parent AnyWidget.
    **kwargs : dict
        Additional keyword arguments passed to the parent AnyWidget and used as
        visualization options.

    Methods
    -------
    mapping(**kwargs)
        Specify the mapping from data columns to visual properties.
    geom_ellipse(**kwargs)
        Add an ellipse layer to the plot.
    geom_hair(**kwargs)
        Add a hair (small oriented lines) layer to the plot.
    labs(**kwargs)
        Add labels to the plot.
    geom_edge_link(**kwargs)
        Add edge link geometry to the plot.
    inter_edge_link(**kwargs)
        Add interactive edge link geometry to the plot.
    inter_isometry(**kwargs)
        Add interactive isometry overlays to the plot.
    scale_color(**kwargs)
        Add a color scale to the plot.
    scale_size(**kwargs)
        Add a size scale to the plot.
    inter_boxplot(dists, **kwargs)
        Add an interactive boxplot layer for distortion metrics, using provided
        distance summaries and outlier information.
    save(filename)
        Save the current view to SVG.

    Examples
    --------
    >>> import pandas as pd
    >>> df = pd.DataFrame({...})
    >>> dplot(df).mapping(x='embedding_1', y='embedding_2').geom_ellipse()
    """
    widget_dir = Path(__file__).parent / "widget"
    _esm = widget_dir / "render.js"
    _mapping = traitlets.Dict().tag(sync=True)
    dataset = traitlets.List().tag(sync=True)
    layers = traitlets.List().tag(sync=True)
    neighbors = traitlets.List().tag(sync=True)
    distance_summaries = traitlets.List().tag(sync=True)
    outliers = traitlets.List().tag(sync=True)
    options = traitlets.Dict().tag(sync=True)
    elem_svg = traitlets.Unicode().tag(sync=True)
    
    def __init__(self, df, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.dataset = df.to_dict("records")
        self.options = kwargs
    
    def mapping(self, **kwargs):
        """
        Specify the Mapping 
        """
        kwargs = {"angle": "angle", "a": "s1", "b": "s0", **kwargs}
        self._mapping = kwargs
        return self
    
    def geom_ellipse(self, **kwargs):
        self.layers = self.layers + [{"type": "geom_ellipse", "options": kwargs}]
        return self

    def geom_hair(self, **kwargs):
        self.layers = self.layers + [{'type': 'geom_hair', 'options': kwargs}]
        return self

    def labs(self, **kwargs):
        self.layers = self.layers + [{"type": "labs", "options": kwargs}]
        return self

    def geom_edge_link(self, **kwargs):
        self.layers = self.layers + [{"type": "geom_edge_link", "options": kwargs}]
        return self

    def inter_edge_link(self, **kwargs):
        self.layers = self.layers + [{"type": "inter_edge_link", "options": kwargs}]
        return self

    def inter_isometry(self, **kwargs):
        self.layers = self.layers + [{"type": "inter_isometry", "options": kwargs}]
        return self

    def scale_color(self, **kwargs):
        self.layers = self.layers + [{"type": "scale_color", "options": kwargs}]
        return self

    def scale_size(self, **kwargs):
        self.layers = self.layers + [{"type": "scale_size", "options": kwargs}]
        return self

    def inter_boxplot(self, dists, **kwargs):
        summaries, outliers = boxplot_data(dists["true"], dists["embedding"], **kwargs)
        outliers["center"] = dists.center.values[outliers["index"].values]
        outliers["neighbor"] = dists.neighbor.values[outliers["index"].values]

        # pass the related data to the visualization
        self.layers = self.layers + [{"type": "inter_boxplot", "options": kwargs}]
        self.distance_summaries = summaries.to_dict("records")
        self.outliers = outliers.to_dict("records")
        return self

    def save(self, filename="plot.svg"):
        self.send({"type": "save"})
        with open(filename, "w") as f:
            f.write(self.elem_svg)
        f.close()