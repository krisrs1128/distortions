import {DistortionPlot} from "distortions";
import * as d3 from "https://esm.sh/d3@7";

// Function to get priority based on string content
function sort_priority(str) {
  if (str.includes('geom')) return 1;
  if (str.includes('scale')) return 2;
  if (str.includes('inter')) return 3;
  return 2;
}

function layer_order(a, b) {
  const A = sort_priority(a.type);
  const B = sort_priority(b.type);
  if (A != B) {
    return A - B;
  }
  return 0;
}

function render({ model, el }) {
  // A ggplot2-like API for creating distortion plots
  let plot = new DistortionPlot(el, model.get("options"))
    .data(model.get("dataset"))
    .mapping(model.get("_mapping"))

  // add color and size scales
  let layers = model.get("layers")
  if (Object.keys(plot.mappingObj).some(m => m === "color") && !layers.some(l => l.type === "scale_color")) {
    layers.push({ type: "scale_color", options: {} });
  }
  layers.sort(layer_order)

  // render all the layers
  layers.forEach(l => callLayer(plot, l, model))
  plot.render()

  // save if requested
  model.on("msg:custom", msg => {
    if (msg.type === "save") {
      let elem = d3.select(el).select("svg")
      let svgStr = new XMLSerializer().serializeToString(elem.node());
      model.set("elem_svg", svgStr);
      model.save_changes()
    }
  })
}

function callLayer(plot, layer, model) {
  switch (layer.type) {
    case 'geom_ellipse':
      plot.geomEllipse(layer.options);
      break;
    case 'geom_hair':
      plot.geomHair(layer.options);
      break;
    case 'geom_edge_link':
      plot.geomEdgeLink(layer.options);
      break;
    case 'inter_edge_link':
      plot.interEdgeLink(layer.options);
      break;
    case 'inter_isometry':
      plot.interIsometry(layer.options);
      break;
    case 'inter_boxplot':
      plot.interBoxplot(
        model.get("distance_summaries"),
        model.get("outliers"),
        layer.options
      );
      break;
    case 'scale_color':
      plot.scaleColor(layer.options);
      break;
    case 'scale_size':
      plot.scaleSize(layer.options);
      break;
    case 'labs':
      plot.labs(layer.options);
      break;
  }
}

export default { render };