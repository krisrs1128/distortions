// ../../../../distortions-js/lib/layering.js
import * as d33 from "https://esm.sh/d3@7";
import d3col from "https://cdn.jsdelivr.net/npm/d3-svg-legend@2.25.6/+esm";

// ../../../../distortions-js/lib/annotation.js
function annotation(svg, options, width, height, margin) {
  const defaults = {
    title: "",
    x: "",
    y: ""
  };
  const opts = { ...defaults, ...options };
  return {
    type: "labs",
    options: opts,
    render: () => {
      if (opts.title) {
        svg.append("text").attr("x", width / 2).attr("y", margin.top / 2).attr("text-anchor", "middle").style("font-size", "16px").text(opts.title);
      }
      if (opts.x) {
        svg.append("text").attr("x", width / 2).attr("y", height - margin.bottom / 3).attr("text-anchor", "middle").text(opts.x);
      }
      if (opts.y) {
        svg.append("text").attr("transform", "rotate(-90)").attr("x", -height / 2).attr("y", margin.left / 3).attr("text-anchor", "middle").text(opts.y);
      }
    }
  };
}

// ../../../../distortions-js/lib/reshape.js
function flatten_edges(N, dataset, mappingObj) {
  let link_data = [];
  for (let Ni in N) {
    for (let Nj in N[Ni]) {
      link_data.push({
        "_id": `${Ni}_${N[Ni][Nj]}`,
        x1: dataset[Ni][mappingObj.x],
        y1: dataset[Ni][mappingObj.y],
        x2: dataset[N[Ni][Nj]][mappingObj.x],
        y2: dataset[N[Ni][Nj]][mappingObj.y],
        "_id_source": Ni,
        "_id_target": N[Ni][Nj]
      });
    }
  }
  return link_data;
}

// ../../../../distortions-js/lib/boxplot.js
import * as d3 from "https://esm.sh/d3@7";
function draw_boxplot(params, summaries, outliers) {
  params.g.append("g").attr("class", params.opts.className);
  draw_whiskers(params, summaries);
  draw_rects(params, summaries);
  draw_outliers(params, outliers);
  outlier_reactivity(params, outliers);
  annotate_outliers(params);
}
function draw_rects(params, summaries) {
  params.g.select(`.${params.opts.className}`).selectAll("rect").data(summaries, (d) => d.bin).enter().append("rect").attr("x", (d) => params.xBoxScale(d.bin)).attr("y", (d) => params.yBoxScale(d.q3)).attr("width", params.xBoxScale.bandwidth()).attr("height", (d) => params.yBoxScale(d.q1) - params.yBoxScale(d.q3)).attr("fill", params.opts.fill).attr("stroke", params.opts.stroke);
  params.g.select(`.${params.opts.className}`).selectAll("line").data(summaries, (d) => d.id).enter().append("line").attr("x1", (d) => params.xBoxScale(d.bin)).attr("y1", (d) => params.yBoxScale(d.q2)).attr("x2", (d) => params.xBoxScale(d.bin) + params.xBoxScale.bandwidth()).attr("y2", (d) => params.yBoxScale(d.q2)).attr("stroke", params.opts.stroke);
}
function draw_whiskers(params, summaries) {
  params.g.select(`.${params.opts.className}`).selectAll(".whisker").data(summaries, (d) => d.bin).enter().append("line").attr("class", "whisker").attr("x1", (d) => params.xBoxScale(d.bin) + params.xBoxScale.bandwidth() / 2).attr("y1", (d) => params.yBoxScale(d.lower)).attr("x2", (d) => params.xBoxScale(d.bin) + params.xBoxScale.bandwidth() / 2).attr("y2", (d) => params.yBoxScale(d.upper)).attr("stroke", params.opts.stroke);
}
function draw_outliers(params, outliers) {
  params.g.select(`.${params.opts.className}`).selectAll("circle").data(outliers, (d) => `${d.center}-${d.neighbor}`).enter().append("circle").attr("cx", (d) => params.xBoxScale(d.bin) + params.xBoxScale.bandwidth() / 2).attr("cy", (d) => params.yBoxScale(d.value)).attr("r", params.opts.outlierRadius).attr("fill", params.opts.fill);
}
function outlier_reactivity(params, outliers) {
  let brush2 = d3.brush().on("brush end", brushed).extent(
    [
      [params.xBoxScale.range()[0] - 15, params.yBoxScale.range()[1] - 15],
      [params.xBoxScale.range()[1] + 15, params.yBoxScale.range()[0] + 15]
    ]
  );
  params.g.select(`.${params.opts.className}`).call(brush2);
  params.g.insert("g").attr("id", "link_highlight");
  function brushed(event) {
    if (!event.selection) return;
    let [[x0, y0], [x1, y1]] = event.selection;
    let selected = outliers.filter((d) => {
      let cx = params.xBoxScale(d.bin) + params.xBoxScale.bandwidth() / 2;
      let cy = params.yBoxScale(d.value);
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    });
    highlight_outliers(params, selected);
    highlight_links(params, selected);
  }
}
function highlight_outliers(params, selected) {
  const ids = new Set(selected.map((d) => `${d.center}-${d.neighbor}`));
  params.g.select(`.${params.opts.className}`).selectAll("circle").attr("fill", (d) => ids.has(`${d.center}-${d.neighbor}`) ? params.opts.highlightColor : params.opts.fill);
}
function highlight_links(params, selected) {
  let links = [];
  for (let i = 0; i < selected.length; i++) {
    links.push({
      "center": params.dataset[selected[i]["center"]],
      "neighbor": params.dataset[selected[i]["neighbor"]],
      "center_id": selected[i]["center"],
      "neighbor_id": selected[i]["neighbor"]
    });
  }
  let link_selection = params.g.select("#link_highlight").selectAll("line").data(links, (d) => `${d.center_id}-${d.neighbor_id}`);
  link_selection.exit().remove();
  link_selection.enter().append("line").attr("x1", (d) => params.xScale(d.center.embedding_0)).attr("y1", (d) => params.yScale(d.center.embedding_1)).attr("x2", (d) => params.xScale(d.neighbor.embedding_0)).attr("y2", (d) => params.yScale(d.neighbor.embedding_1)).attr("stroke", params.opts.highlightColor).attr("stroke-width", params.opts.strokeWidth).attr("id", (d) => `${d.center_id}-${d.neighbor_id}`);
  const highlight_ids = new Set(links.flatMap((d) => [d.center_id, d.neighbor_id]));
  for (let i = 0; i < params.opts.otherClasses.length; i++) {
    params.g.select(`.${params.opts.otherClasses[i]}`).selectAll("*").attr("stroke", (d) => {
      return highlight_ids.has(d._id) ? params.opts.highlightColor : null;
    }).attr("stroke-width", (d) => highlight_ids.has(d._id) ? params.opts.highlightStrokeWidth : null).attr("fill-opacity", (d) => highlight_ids.has(d._id) ? params.opts.opacity : params.opts.backgroundOpacity);
  }
}
function annotate_outliers(params) {
  params.g.select(`.${params.opts.className}`).append("g").attr("class", "x-axis").attr("transform", `translate(0,${params.yBoxScale.range()[0]})`).call(d3.axisBottom(params.xBoxScale)).selectAll("text").attr("transform", "rotate(90)").attr("x", 10).attr("y", -params.xBoxScale.bandwidth() * 0.25).style("text-anchor", "start");
  params.g.select(`.${params.opts.className}`).append("g").append("g").attr("class", "y-axis").attr("transform", `translate(${params.xBoxScale.range()[0]},0)`).call(d3.axisLeft(params.yBoxScale).ticks(5));
  params.g.select(`.${params.opts.className}`).append("text").attr("text-anchor", "middle").attr("x", (params.xBoxScale.range()[0] + params.xBoxScale.range()[1]) / 2).attr("y", params.yBoxScale.range()[1] - 10).style("fill", "#0c0c0c").style("font-size", "10px").text("Embedding vs. Original Distance");
}

// ../../../../distortions-js/lib/inter_edge_link.js
function link_update(ev, g, N, dataset, mappingObj, xScale, yScale, opts, margin) {
  let broken = Object.keys(N).map((k) => {
    return { "_id": k, "data": dataset[parseInt(k)] };
  });
  let center = [xScale.invert(ev.layerX - margin.left), yScale.invert(ev.layerY - margin.top)];
  let current_centers = [];
  for (let i = 0; i < broken.length; i++) {
    let dist = (broken[i].data[mappingObj.x] - center[0]) ** 2 + (broken[i].data[mappingObj.y] - center[1]) ** 2;
    if (dist < opts.threshold) {
      current_centers.push(broken[i]._id);
    }
  }
  let current_links = flatten_edges(filter_obj(N, current_centers), dataset, mappingObj);
  let selection = g.select(`.${opts.className}`).selectAll("line").data(current_links, (d) => d._id);
  selection.enter().append("line").attr("x1", (d) => xScale(d.x1)).attr("y1", (d) => yScale(d.y1)).attr("x2", (d) => xScale(d.x2)).attr("y2", (d) => yScale(d.y2)).attr("stroke-width", opts.strokeWidth).attr("stroke", opts.stroke).attr("opacity", opts.opacity);
  for (let c in opts.otherClasses) {
    g.select(`.${opts.otherClasses[c]}`).selectAll("*").attr("opacity", (d) => Object.keys(N).indexOf(d._id.toString()) == -1 ? opts.backgroundOpacity : opts.opacity).attr("stroke-width", (d) => Object.keys(N).indexOf(d._id.toString()) == -1 ? 0 : opts.highlightStrokeWidth);
  }
  selection.exit().remove();
}
function filter_obj(raw, allowed) {
  return Object.keys(raw).filter((key) => allowed.includes(key)).reduce((obj, key) => {
    obj[key] = raw[key];
    return obj;
  }, {});
}

// ../../../../distortions-js/lib/inter_isometry.js
import * as d32 from "https://esm.sh/d3@7";
import { SVD } from "https://esm.sh/svd-js";
import { matrix, add, subtract, multiply, inv, diag, zeros, size, det } from "https://esm.sh/mathjs";
function isometry_update(ev, g, dataset, metrics, mappingObj, xScale, yScale, rScale, colorScale, opts, margin) {
  let f_star = [xScale.invert(ev.layerX - margin.left), yScale.invert(ev.layerY - margin.top)];
  let { h_star, kn } = local_metric(metrics, f_star, dataset, opts.metric_bw);
  let kn_t = local_metric(metrics, f_star, dataset, opts.transformation_bw)["kn"];
  kn_t = kn_t.map((k) => k / d32.max(kn_t));
  let h_star_ = inv(square_root_reorient(h_star));
  let h_star_inv = inv(h_star);
  let new_coords = [];
  let N = Object.values(dataset).length;
  for (let n = 0; n < N; n++) {
    let f_n = matrix([dataset[n][mappingObj.x], dataset[n][mappingObj.y]]);
    let f_tilde_n = add(multiply(h_star_, subtract(f_n, f_star)), f_star);
    let f_n_transform = add(multiply(kn_t[n], f_tilde_n), multiply(1 - kn_t[n], f_n));
    let h_product = multiply(h_star_inv, matrix(metrics[n]));
    let { q, v } = SVD(h_product._data);
    let sv_transform = [
      kn_t[n] * q[0] + (1 - kn_t[n]) * dataset[n]["s0"],
      kn_t[n] * q[1] + (1 - kn_t[n]) * dataset[n]["s1"]
    ];
    let v_transform = [
      kn_t[n] * v[0][0] + (1 - kn_t[n]) * dataset[n]["x0"],
      kn_t[n] * v[0][1] + (1 - kn_t[n]) * dataset[n]["y0"]
    ];
    new_coords.push({
      [mappingObj.x]: f_n_transform._data[0],
      [mappingObj.y]: f_n_transform._data[1],
      "s0": sv_transform[0],
      "s1": sv_transform[1],
      "x0": v_transform[0],
      "y0": v_transform[1],
      "new_angle": angle(v_transform[0], v_transform[1]),
      "kernel_transform": kn_t[n],
      "kernel_metric": kn[n] / d32.max(kn),
      "color": dataset[n][mappingObj.color],
      "_id": dataset[n]["_id"]
    });
  }
  for (let c in opts.otherClasses) {
    g.select(`.${opts.otherClasses[c]}`).selectAll("*").data(new_coords, (d) => d._id).attr("cx", (d) => xScale(d[mappingObj.x])).attr("cy", (d) => yScale(d[mappingObj.y])).attr("rx", (d) => rScale(d[mappingObj.a])).attr("ry", (d) => rScale(d[mappingObj.b])).attr("transform", (d) => `rotate(${d["new_angle"]} ${xScale(d[mappingObj.x])} ${yScale(d[mappingObj.y])})`);
    if (mappingObj.color !== null) {
      g.select(`.${opts.otherClasses[c]}`).selectAll("*").attr("fill", (d) => colorScale(d[mappingObj.color] ?? d["color"]));
    }
  }
  g.select(".isometry-links").selectAll("line").data(new_coords, (d) => d._id).attr("x1", (d) => xScale(d[mappingObj.x])).attr("y1", (d) => yScale(d[mappingObj.y]));
}
function similarities(f_star, dataset, gamma) {
  let result = [];
  for (let n = 0; n < Object.values(dataset).length; n++) {
    let f_n = [dataset[n].embedding_0, dataset[n].embedding_1];
    result.push(similarity(f_star, f_n, gamma));
  }
  let total = d32.sum(result);
  return result.map((d) => d / total);
}
function local_metric(metrics, f_star, dataset, gamma) {
  let N = Object.values(metrics).length;
  let h0 = matrix(metrics[0]);
  let h_star = zeros(size(h0));
  let kn = similarities(f_star, dataset, gamma);
  for (let n = 0; n < N; n++) {
    h_star = add(h_star, multiply(kn[n], matrix(metrics[n])));
  }
  let { q } = SVD(h_star._data);
  return { "h_star": h_star, "sv": q, "kn": kn };
}
function square_root_reorient(A) {
  let svd_result = SVD(A._data);
  let { v, q } = reorient(svd_result);
  return multiply(matrix(v), diag(q.map((qk) => Math.sqrt(qk))));
}
function reorient(svd_result) {
  let v = matrix(svd_result["v"]);
  let q = svd_result["q"];
  if (Math.abs(v._data[0][0]) < Math.abs(v._data[0][1])) {
    let P = matrix([[0, 1], [1, 0]]);
    v = multiply(v, P);
    q = [q[1], q[0]];
  }
  if (det(v) < 0) {
    v = multiply(v, diag([1, -1]));
  }
  if (v._data[0][0] < 0) {
    v = multiply(v, diag([-1, -1]));
  }
  return { "v": v, "q": q };
}
function similarity(a, b, gamma = 1) {
  let d = Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
  let result = Math.exp(-gamma * d);
  if (isNaN(result)) {
    return 0;
  }
  return result;
}
function angle(x1, y1) {
  return Math.atan(y1 / x1) * (180 / Math.PI) + 90;
}

// ../../../../distortions-js/lib/layering.js
var DistortionPlot = class {
  // default dimensions
  constructor(el, options) {
    const defaults = { width: 700, height: 350, margin: { top: 40, right: 90, bottom: 60, left: 90 }, labelFontSize: 14 };
    const opts = { ...defaults, ...options };
    let svg = d33.create("svg").attr("width", opts.width).attr("height", opts.height);
    el.appendChild(svg.node());
    this.svg = d33.select(el).select("svg");
    this.width = +this.svg.attr("width");
    this.height = +this.svg.attr("height");
    this.margin = opts.margin;
    this.plotWidth = this.width - this.margin.left - this.margin.right;
    this.plotHeight = this.height - this.margin.top - this.margin.bottom;
    this.labelFontSize = opts.labelFontSize;
    this.g = this.svg.append("g").attr("transform", `translate(${this.margin.left},${this.margin.top})`);
    this.xScale = d33.scaleLinear().range([0, this.plotWidth]);
    this.yScale = d33.scaleLinear().range([this.plotHeight, 0]);
    this.rScale = d33.scaleLinear();
    this.colorScale = d33.scaleOrdinal(d33.schemeCategory10);
    this.dataset = null;
    this.layers = [];
    this.title = "";
    this.xLabel = "";
    this.yLabel = "";
  }
  // Set the base data for the plot
  data(dataset) {
    this.dataset = dataset;
    if (Object.keys(dataset[0]).indexOf("_id") == -1) {
      for (let i = 0; i < dataset.length; i++) {
        dataset[i]._id = i;
      }
    }
    return this;
  }
  // Map data columns to x and y scales
  mapping(m) {
    this.mappingObj = m;
    if (this.dataset && this.mappingObj) {
      this.xScale.domain(d33.extent(this.dataset, (d) => +d[this.mappingObj.x])).nice();
      this.yScale.domain(d33.extent(this.dataset, (d) => +d[this.mappingObj.y])).nice();
      let radius_data = this.dataset.map((d) => [+d[this.mappingObj.a], +d[this.mappingObj.b]]);
      this.rScale.domain(d33.extent([].concat.apply([], radius_data))).nice();
      if (["kernel_transform", "kernel_metric"].includes(this.mappingObj.color)) {
        this.colorScale = d33.scaleLinear().domain([0, 1]).range(["white", "black"]);
      } else if (typeof this.dataset[0][this.mappingObj.color] === "string") {
        const uniqueValues = [...new Set(this.dataset.map((d) => d[this.mappingObj.color]))];
        this.colorScale.domain(uniqueValues);
      } else {
        const rangeValues = d33.extent(this.dataset.map((d) => d[this.mappingObj.color]));
        this.colorScale = d33.scaleLinear().domain(rangeValues);
      }
    }
    return this;
  }
  // Add points/scatter layer
  geomEllipse(options = {}) {
    const defaults = {
      radiusMax: 25,
      radiusMin: 3,
      color: null,
      opacity: 1,
      className: "ellipse"
    };
    const opts = { ...defaults, ...options };
    this.layers.push({
      type: "ellipse",
      options: opts,
      render: () => {
        this.rScale.range([opts.radiusMin, opts.radiusMax]);
        this.g.append("g").attr("class", opts.className).selectAll("ellipse").data(this.dataset, (d) => d._id).enter().append("ellipse").attr("cx", (d) => this.xScale(d[this.mappingObj.x])).attr("cy", (d) => this.yScale(d[this.mappingObj.y])).attr("rx", (d) => this.rScale(d[this.mappingObj.a])).attr("ry", (d) => this.rScale(d[this.mappingObj.b])).attr("transform", (d) => `rotate(${d[this.mappingObj.angle]} ${this.xScale(d[this.mappingObj.x])} ${this.yScale(d[this.mappingObj.y])})`).attr("fill", (d) => this.mappingObj.color ? this.colorScale(d[this.mappingObj.color]) : opts.color || "#0c0c0c").attr("opacity", opts.opacity);
      }
    });
    return this;
  }
  // Add hair (line) layer, mirroring geomEllipse behavior
  geomHair(options = {}) {
    const defaults = {
      className: "hair",
      color: null,
      radiusMax: 25,
      radiusMin: 0.1,
      opacity: 1,
      strokeWidth: 1
    };
    const opts = { ...defaults, ...options };
    this.layers.push({
      type: "hair",
      options: opts,
      render: () => {
        this.rScale.range([opts.radiusMin, opts.radiusMax]);
        if (this.mappingObj.color) {
          const uniqueValues = [...new Set(this.dataset.map((d) => d[opts.color]))];
          this.colorScale.domain(uniqueValues);
        }
        this.g.append("g").attr("class", opts.className).selectAll("rect").data(this.dataset).enter().append("rect").attr("class", opts.className).attr("x", (d) => {
          const cx = this.xScale(+d[this.mappingObj.x]);
          const r = this.rScale(+d[this.mappingObj.a]);
          return cx - r;
        }).attr("y", (d) => {
          const cy = this.yScale(+d[this.mappingObj.y]);
          return cy - opts.strokeWidth / 2;
        }).attr("width", (d) => {
          const r = this.rScale(+d[this.mappingObj.a]);
          return 2 * r;
        }).attr("height", opts.strokeWidth).attr("transform", (d) => {
          const cx = this.xScale(+d[this.mappingObj.x]);
          const cy = this.yScale(+d[this.mappingObj.y]);
          return `rotate(${+d[this.mappingObj.angle]} ${cx} ${cy})`;
        }).attr("fill", (d) => this.mappingObj.color ? this.colorScale(d[this.mappingObj.color]) : opts.color || "#0c0c0c").attr("opacity", opts.opacity);
      }
    });
    return this;
  }
  // Add scale_color for changing color mapping
  scaleColor(options = {}) {
    const defaults = {
      scheme: d33.schemeCategory10,
      className: null,
      padding: 20,
      x_offset: 20,
      y_offset: 0,
      size: 14,
      legendTextSize: 14,
      titleOffset: 15,
      labelOffset: 20
    };
    const opts = { ...defaults, ...options };
    this.layers.push({
      type: "scale_color",
      options: opts,
      render: () => {
        if (["kernel_transform", "kernel_metric"].includes(this.mappingObj.color)) {
          this.colorScale = d33.scaleLinear().domain([0, 1]).range(["white", "black"]);
        } else if (typeof this.dataset[0][this.mappingObj.color] === "string") {
          const uniqueValues = [...new Set(this.dataset.map((d) => d[this.mappingObj.color]))];
          this.colorScale = d33.scaleOrdinal(uniqueValues, opts.scheme);
        } else {
          const rangeValues = d33.extent(this.dataset.map((d) => d[this.mappingObj.color]));
          this.colorScale = d33.scaleLinear(rangeValues, [opts.scheme[0], opts.scheme[1]]);
        }
        let className = opts.className || this.layers[0].options.className;
        this.svg.select(`.${className}`).selectAll("*").attr("fill", (d) => this.colorScale(d[this.mappingObj.color]));
        this.svg.select(`.${className}-background`).selectAll("*").attr("fill", (d) => this.colorScale(d[this.mappingObj.color]));
        const legend = d3col.legendColor().shapePadding(opts.padding).shapeHeight(opts.size).shapeWidth(opts.size).title(this.mappingObj.color).scale(this.colorScale);
        this.g.append("g").attr("class", "legend").attr("id", "colorScale").attr("transform", `translate(${this.plotWidth + opts.x_offset}, ${opts.y_offset})`).call(legend);
        this.g.selectAll("#colorScale .label").attr("font-size", opts.legendTextSize).attr("transform", `translate(${opts.labelOffset}, ${0.75 * opts.size})`);
        this.g.select("#colorScale .legendTitle").attr("transform", `translate(0, -${opts.titleOffset})`).attr("font-size", opts.legendTextSize);
      }
    });
    return this;
  }
  scaleSize(options = {}) {
    const defaults = {
      nCells: 4,
      shapePadding: 20,
      labelOffset: 20,
      yOffset: 100,
      legendTextSize: 14,
      xOffset: 20,
      titleOffset: 20,
      symbolColor: "#a8a8a8"
    };
    const opts = { ...defaults, ...options };
    this.layers.push({
      type: "scale_size",
      options: opts,
      render: () => {
        const legend = d3col.legendSize().scale(this.rScale).shape("circle").shapePadding(opts.shapePadding).labelOffset(opts.labelOffset).orient("vertical").title("\u03BB(H\u2099)").cells(opts.nCells);
        this.g.append("g").attr("class", "legend").attr("id", "sizeScale").attr("transform", `translate(${this.plotWidth + opts.xOffset}, ${opts.yOffset})`).call(legend);
        this.g.selectAll("#sizeScale .legendCells circle").attr("fill", opts.symbolColor);
        this.g.selectAll("#sizeScale .label").attr("font-size", opts.legendTextSize);
        this.g.select("#sizeScale .legendTitle").attr("transform", `translate(0, -${opts.titleOffset})`).attr("font-size", opts.legendTextSize);
      }
    });
  }
  // Add labels (title, x-axis, y-axis)
  labs(options = {}) {
    this.layers.push(
      annotation(this.svg, options, this.width, this.height, this.margin)
    );
    return this;
  }
  geomEdgeLink(options = {}) {
    const defaults = {
      "stroke-width": 1,
      "stroke": "#363E59",
      "opacity": 1,
      className: "edge_link"
    };
    const opts = { ...defaults, ...options };
    let N = options.N;
    let link_data = flatten_edges(N, this.dataset, this.mappingObj);
    this.layers.push({
      type: "edge_link",
      options: opts,
      render: () => {
        this.g.select(`.${opts.className}`).selectAll("line").data(link_data, (d) => d._id).enter().insert("line").attr("class", opts.className).attr("x1", (d) => this.xScale(d.x1)).attr("y1", (d) => this.yScale(d.y1)).attr("x2", (d) => this.xScale(d.x2)).attr("y2", (d) => this.yScale(d.y2)).attr("stroke-width", opts["stroke-width"]).attr("stroke", opts.stroke).attr("opacity", opts.opacity);
      }
    });
  }
  interEdgeLink(options = {}) {
    const defaults = {
      strokeWidth: 1,
      backgroundOpacity: 0.2,
      className: "inter_edge_link",
      opacity: 1,
      otherClasses: ["ellipse"],
      stroke: "#363E59",
      highlightColor: "#363E59",
      highlightStrokeWidth: 1.5,
      threshold: 1
    };
    const opts = { ...defaults, ...options };
    let N = options.N;
    this.layers.push({
      type: "inter_edge_link",
      options: opts,
      render: () => {
        this.g.insert("g").attr("class", opts.className);
        for (let c in opts.otherClasses) {
          this.g.select(`.${opts.otherClasses[c]}`).selectAll("ellipse").attr("stroke", (d) => Object.keys(N).indexOf(d._id.toString()) == -1 ? "white" : opts.highlightColor).attr("stroke-width", (d) => Object.keys(N).indexOf(d._id.toString()) == -1 ? 0 : opts.highlightStrokeWidth);
        }
        let freeze = false;
        this.svg.on("mousemove", (ev) => {
          if (!freeze) {
            link_update(
              ev,
              this.g,
              N,
              this.dataset,
              this.mappingObj,
              this.xScale,
              this.yScale,
              opts,
              this.margin
            );
          }
        });
        this.svg.on("dblclick", () => {
          freeze = !freeze;
        });
      }
    });
  }
  interIsometry(options = {}) {
    const defaults = {
      backgroundOpacity: 0.2,
      className: "inter_isometry",
      magnify: 1,
      metric_bw: 10,
      stroke: "#a5a5a5",
      strokeWidth: 1.5,
      otherClasses: ["ellipse"],
      transformation_bw: 2
    };
    const opts = { ...defaults, ...options };
    this.layers.push({
      type: "inter_isometry",
      options: opts,
      render: () => {
        let metrics = options.metrics;
        this.g.append("g").lower().attr("class", "isometry-links").selectAll("line").data(this.dataset, (d) => d._id).enter().append("line").attr("x1", (d) => this.xScale(d[this.mappingObj.x])).attr("y1", (d) => this.yScale(d[this.mappingObj.y])).attr("x2", (d) => this.xScale(d[this.mappingObj.x])).attr("y2", (d) => this.yScale(d[this.mappingObj.y])).attr("stroke", opts.stroke).attr("stroke-width", opts.strokeWidth);
        for (let c in opts.otherClasses) {
          this.g.select(`.${opts.otherClasses[c]}`).clone(true).lower().attr("opacity", opts.backgroundOpacity).attr("class", `${opts.otherClasses[c]}-background`).selectAll("*").data(this.dataset);
        }
        let freeze = false;
        this.svg.on("mousemove", (ev) => {
          if (!freeze) {
            isometry_update(
              ev,
              this.g,
              this.dataset,
              metrics,
              this.mappingObj,
              this.xScale,
              this.yScale,
              this.rScale,
              this.colorScale,
              opts,
              this.margin
            );
          }
        });
        this.svg.on("dblclick", () => {
          freeze = !freeze;
        });
      }
    });
  }
  interBoxplot(distance_summaries, outliers, options = {}) {
    const defaults = {
      backgroundOpacity: 0.2,
      className: "inter_boxplot",
      fill: "#bcbcbc",
      highlightColor: "#363E59",
      highlightStrokeWidth: 1.5,
      legendOffset: 60,
      opacity: 1,
      otherClasses: ["ellipse"],
      outlierRadius: 2,
      relHeight: 0.3,
      relPanelMargin: 0.05,
      relWidth: 0.75,
      stroke: "#262626",
      strokeWidth: 1
    };
    const opts = { ...defaults, ...options };
    let y_vals = outliers.map((d) => d.value).concat(distance_summaries.map((d) => d.q1)).concat(distance_summaries.map((d) => d.q3));
    this.xScale.range([0, this.plotWidth * (opts.relWidth - opts.relPanelMargin)]);
    this.xBoxScale = d33.scaleBand().domain([...new Set(distance_summaries.map((d) => d.bin))]).range([opts.relWidth * this.plotWidth, this.plotWidth]);
    this.yBoxScale = d33.scaleLinear().domain([0, d33.max(y_vals)]).range([opts.relHeight * this.plotHeight, 0]);
    this.layers.push({
      type: "inter_isometry",
      options: opts,
      render: () => {
        this.g.select(".legend").attr("transform", `translate(${opts.relWidth * this.plotWidth}, ${opts.relHeight * this.plotHeight + opts.legendOffset})`);
        this.opts = opts;
        draw_boxplot(this, distance_summaries, outliers);
      }
    });
  }
  // Render all layers of the plot
  render() {
    const xAxis = d33.axisBottom(this.xScale);
    const yAxis = d33.axisLeft(this.yScale);
    this.g.append("g").attr("class", "x-axis").attr("transform", `translate(0, ${this.plotHeight})`).call(xAxis.tickFormat("").tickSize(0)).selectAll(".tick text").attr("font-size", this.labelFontSize);
    this.g.append("g").attr("class", "y-axis").call(yAxis.tickFormat("").tickSize(0)).selectAll(".tick text").attr("font-size", this.labelFontSize);
    this.layers.forEach((l) => l.render());
    return this;
  }
};

// render.js
import * as d34 from "https://cdn.skypack.dev/d3@7";
function sort_priority(str) {
  if (str.includes("geom")) return 1;
  if (str.includes("scale")) return 2;
  if (str.includes("inter")) return 3;
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
  let plot = new DistortionPlot(el, model.get("options")).data(model.get("dataset")).mapping(model.get("_mapping"));
  let layers = model.get("layers");
  if (Object.keys(plot.mappingObj).some((m) => m === "color") && !layers.some((l) => l.type === "scale_color")) {
    layers.push({ type: "scale_color", options: {} });
  }
  layers.sort(layer_order);
  layers.forEach((l) => callLayer(plot, l, model));
  plot.render();
  model.on("msg:custom", (msg) => {
    if (msg.type === "save") {
      let elem = d34.select(el).select("svg");
      let svgStr = new XMLSerializer().serializeToString(elem.node());
      model.set("elem_svg", svgStr);
      model.save_changes();
    }
  });
}
function callLayer(plot, layer, model) {
  switch (layer.type) {
    case "geom_ellipse":
      plot.geomEllipse(layer.options);
      break;
    case "geom_hair":
      plot.geomHair(layer.options);
      break;
    case "geom_edge_link":
      plot.geomEdgeLink(layer.options);
      break;
    case "inter_edge_link":
      plot.interEdgeLink(layer.options);
      break;
    case "inter_isometry":
      plot.interIsometry(layer.options);
      break;
    case "inter_boxplot":
      plot.interBoxplot(
        model.get("distance_summaries"),
        model.get("outliers"),
        layer.options
      );
      break;
    case "scale_color":
      plot.scaleColor(layer.options);
      break;
    case "scale_size":
      plot.scaleSize(layer.options);
      break;
    case "labs":
      plot.labs(layer.options);
      break;
  }
}
var render_default = { render };
export {
  render_default as default
};
