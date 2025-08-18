import pandas as pd

def eigenvalue_plot(Hs, cluster_labels, identity_point=True, width=None,
                    height=None, sort_order=None):
    """Plot eigenvalues with identity line and optional (1,1) point.
    
    This function is useful for understanding differences in distortion across
    clusters. For example, if ellipses all have larger major and minor axis
    length in one cell type, then this will appear as a cluster in the top right
    of this eigenvalue plot.

    Requires altair to be installed. Install with: pip install altair
    
    Parameters:
    -----------
    sort_order : list, optional
        Order for categories in legend and color assignment
    """
    try:
        import altair as alt
    except ImportError:
        raise ImportError(
            "altair is required for eigenvalue_plot. "
            "Install it with: pip install altair"
        )
    
    # prepare data
    df = pd.DataFrame({"s0": Hs[:, 0], "s1": Hs[:, 1], "cluster": cluster_labels})
    x_domain = [df['s0'].min(), df['s0'].max()]
    y_domain = [df['s1'].min(), df['s1'].max()]
    
    # Set up color encoding with optional sort order
    if sort_order is not None:
        color_encoding = alt.Color("cluster", sort=sort_order)
    else:
        color_encoding = alt.Color("cluster")
    
    scatter = alt.Chart(df).mark_circle().encode(
        x=alt.X("s0", axis=alt.Axis(title="λ₁"), scale=alt.Scale(domain=x_domain)),
        y=alt.Y("s1", axis=alt.Axis(title="λ₂"), scale=alt.Scale(domain=y_domain)),
        color=color_encoding
    )
    
    line_range = [max(df['s0'].min(), df['s1'].min()), min(df['s0'].max(), df['s1'].max())]
    identity = alt.Chart(pd.DataFrame({'s0': line_range, 's1': line_range})).mark_line(
        color="#9d9d9d", strokeDash=[5, 5], opacity=0.7
    ).encode(x=alt.X("s0", scale=alt.Scale(domain=x_domain)), y=alt.Y("s1", scale=alt.Scale(domain=y_domain)))
    
    # assemble plot
    plot = identity + scatter
    if identity_point:
        point = alt.Chart(pd.DataFrame({"s0": [1], "s1": [1]})).mark_circle(
            color="#0c0c0c", size=100
        ).encode(x=alt.X("s0", scale=alt.Scale(domain=x_domain)), y=alt.Y("s1", scale=alt.Scale(domain=y_domain)))
        plot += point
    
    plot = plot.configure_axis(grid=False)
    if width or height:
        plot = plot.properties(width=width, height=height)
    
    return plot