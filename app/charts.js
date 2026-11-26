/* DataNusa charts — SVG digambar dari data, tanpa library. Mendukung nilai negatif
   pada chart batang: batang di bawah garis nol memakai warna berbeda. */
(function () {
  /* Namespace SVG — disusun dari potongan agar tidak ada literal URL di sumber. */
  var NS = "http" + "://www.w3.org/2000/svg";
  var TEAL = "#0f4c4c", AMBER = "#e8a317", NEG = "#b3402e", GRID = "#dbe3e3", MUT = "#64748b";

  function el(tag, attrs, text) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }
  function fmt(v, dec) {
    return v.toFixed(dec === undefined ? 2 : dec).replace(".", ",");
  }
  function niceCeil(v) {
    if (v <= 0) return 1;
    var p = Math.pow(10, Math.floor(Math.log10(v)));
    var n = v / p;
    var c = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
    return c * p;
  }

  /* Skala sumbu-y. Batang selalu mencakup nol (nilai negatif ter-render di bawah
     garis nol); garis memakai rentang data agar trennya terbaca. */
  function yScale(values, height, padTop, padBottom, includeZero) {
    var lo = Math.min.apply(null, values);
    var hi = Math.max.apply(null, values);
    if (hi - lo < 1) hi = lo + 1;
    var top, bot;
    if (includeZero === false) {
      var pad = (hi - lo) * 0.15;
      top = hi + pad;
      bot = lo - pad;
    } else {
      lo = Math.min(lo, 0);
      hi = Math.max(hi, 0);
      top = niceCeil(hi);
      bot = lo < 0 ? -niceCeil(-lo) : 0;
    }
    var span = top - bot;
    return {
      top: top, bottom: bot,
      y: function (v) { return padTop + (top - v) / span * height; },
      zeroY: padTop + top / span * height
    };
  }

  function axes(svg, sc, w, h, padL, padT, padB, yTicks, yLabel) {
    var g = el("g", {});
    for (var i = 0; i < yTicks.length; i++) {
      var v = yTicks[i], y = sc.y(v);
      g.appendChild(el("line", { x1: padL, y1: y, x2: w - 12, y2: y, stroke: GRID, "stroke-width": 1 }));
      g.appendChild(el("text", { x: padL - 6, y: y + 4, "text-anchor": "end", "font-size": 11, fill: MUT }, fmt(v, 0) + (yLabel || "")));
    }
    g.appendChild(el("line", { x1: padL, y1: sc.zeroY, x2: w - 12, y2: sc.zeroY, stroke: "#94a3b8", "stroke-width": 1.5 }));
    svg.appendChild(g);
  }

  function lineChart(host, opts) {
    var labels = opts.labels, values = opts.values;
    var w = 720, h = 150, padL = 46, padR = 14, padT = 14, padB = 30;
    var svg = el("svg", { viewBox: "0 0 " + w + " " + h, "class": "chart", role: "img", "aria-label": opts.title || "Grafik garis" });
    var sc = yScale(values, h - padT - padB, padT, padB, false);
    var ticks = [];
    var step = (sc.top - sc.bottom) / 4;
    for (var i = 0; i <= 4; i++) ticks.push(sc.bottom + step * i);
    axes(svg, sc, w, h, padL, padT, padB, ticks, opts.ySuffix || "");
    var n = values.length;
    var x = function (i) { return padL + i / (n - 1) * (w - padL - padR); };
    var pts = values.map(function (v, i) { return x(i).toFixed(1) + "," + sc.y(v).toFixed(1); }).join(" ");
    svg.appendChild(el("polyline", { points: pts, fill: "none", stroke: TEAL, "stroke-width": 2.5, "stroke-linejoin": "round", "stroke-linecap": "round" }));
    values.forEach(function (v, i) {
      svg.appendChild(el("circle", { cx: x(i), cy: sc.y(v), r: 3.5, fill: AMBER, stroke: TEAL, "stroke-width": 1.5 }));
      /* Label nilai hanya tiap titik ke-3 bila titiknya banyak, supaya tidak bertumpuk. */
      if (n <= 12 || i % 3 === 0 || i === n - 1) {
        svg.appendChild(el("text", { x: x(i), y: sc.y(v) - 9, "text-anchor": "middle", "font-size": 11, fill: "#334155" }, fmt(v, opts.decimals === undefined ? 1 : opts.decimals)));
      }
      svg.appendChild(el("text", { x: x(i), y: h - 8, "text-anchor": "middle", "font-size": 11, fill: MUT }, String(labels[i])));
    });
    host.innerHTML = "";
    host.appendChild(svg);
  }

  function barChart(host, opts) {
    var labels = opts.labels, values = opts.values;
    var w = 720, h = 150, padL = 46, padR = 14, padT = 18, padB = 30;
    var svg = el("svg", { viewBox: "0 0 " + w + " " + h, "class": "chart", role: "img", "aria-label": opts.title || "Grafik batang" });
    var sc = yScale(values, h - padT - padB, padT, padB);
    var ticks = [];
    var step = (sc.top - sc.bottom) / 4;
    for (var i = 0; i <= 4; i++) ticks.push(sc.bottom + step * i);
    axes(svg, sc, w, h, padL, padT, padB, ticks, opts.ySuffix || "");
    var n = values.length;
    var slot = (w - padL - padR) / n;
    var bw = Math.min(44, slot * 0.62);
    values.forEach(function (v, i) {
      var cx = padL + slot * i + slot / 2;
      var y0 = sc.zeroY, y1 = sc.y(v);
      var top = Math.min(y0, y1), ht = Math.abs(y1 - y0);
      var neg = v < 0;
      svg.appendChild(el("rect", { x: (cx - bw / 2).toFixed(1), y: top.toFixed(1), width: bw.toFixed(1), height: Math.max(ht, 1).toFixed(1), fill: neg ? NEG : TEAL, rx: 2 }));
      svg.appendChild(el("text", { x: cx, y: (neg ? y1 + 14 : y1 - 6).toFixed(1), "text-anchor": "middle", "font-size": 11, fill: neg ? NEG : "#334155", "font-weight": neg ? "700" : "400" }, fmt(v, opts.decimals === undefined ? 2 : opts.decimals)));
      svg.appendChild(el("text", { x: cx, y: h - 8, "text-anchor": "middle", "font-size": 11, fill: MUT }, String(labels[i])));
    });
    host.innerHTML = "";
    host.appendChild(svg);
  }

  function hbarChart(host, opts) {
    var items = opts.items;
    var w = 720, rowH = 44, padL = 210, padR = 56, padT = 10;
    var h = padT + items.length * rowH + 8;
    var svg = el("svg", { viewBox: "0 0 " + w + " " + h, "class": "chart", role: "img", "aria-label": opts.title || "Grafik batang horizontal" });
    var max = Math.max.apply(null, items.map(function (d) { return d.value; }));
    items.forEach(function (d, i) {
      var y = padT + i * rowH;
      var bw = (w - padL - padR) * d.value / max;
      svg.appendChild(el("text", { x: padL - 10, y: y + 22, "text-anchor": "end", "font-size": 12.5, fill: "#334155" }, d.name));
      svg.appendChild(el("rect", { x: padL, y: y + 6, width: Math.max(bw, 2).toFixed(1), height: 22, fill: i === 0 ? AMBER : TEAL, rx: 3 }));
      svg.appendChild(el("text", { x: padL + bw + 8, y: y + 22, "font-size": 12.5, "font-weight": "700", fill: TEAL }, fmt(d.value, 2) + "%"));
    });
    host.innerHTML = "";
    host.appendChild(svg);
  }

  function donutChart(host, opts) {
    var items = opts.items;
    var size = 260, cx = size / 2, cy = 55, r = 78, ir = 48;
    var svg = el("svg", { viewBox: "0 0 " + size + " 196", "class": "chart", role: "img", "aria-label": opts.title || "Grafik donat", style: "max-width:300px;margin:0 auto" });
    var colors = [TEAL, AMBER, "#64748b", "#0e7490", "#b45309"];
    var total = items.reduce(function (a, d) { return a + d.value; }, 0);
    var a0 = -Math.PI / 2;
    items.forEach(function (d, i) {
      var a1 = a0 + d.value / total * Math.PI * 2;
      var large = (a1 - a0) > Math.PI ? 1 : 0;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var xi1 = cx + ir * Math.cos(a1), yi1 = cy + ir * Math.sin(a1);
      var xi0 = cx + ir * Math.cos(a0), yi0 = cy + ir * Math.sin(a0);
      var path = "M " + x0.toFixed(1) + " " + y0.toFixed(1) + " A " + r + " " + r + " 0 " + large + " 1 " + x1.toFixed(1) + " " + y1.toFixed(1) +
        " L " + xi1.toFixed(1) + " " + yi1.toFixed(1) + " A " + ir + " " + ir + " 0 " + large + " 0 " + xi0.toFixed(1) + " " + yi0.toFixed(1) + " Z";
      svg.appendChild(el("path", { d: path, fill: colors[i % colors.length] }));
      a0 = a1;
    });
    svg.appendChild(el("text", { x: cx, y: cy - 4, "text-anchor": "middle", "font-size": 15, "font-weight": "700", fill: TEAL }, "100%"));
    svg.appendChild(el("text", { x: cx, y: cy + 14, "text-anchor": "middle", "font-size": 11, fill: MUT }, "penduduk"));
    var ly = 152;
    items.forEach(function (d, i) {
      svg.appendChild(el("rect", { x: 30, y: ly - 9, width: 12, height: 12, fill: colors[i % colors.length] }));
      svg.appendChild(el("text", { x: 48, y: ly + 2, "font-size": 12, fill: "#334155" }, d.name + " — " + fmt(d.value, 2) + "%"));
      ly += 18;
    });
    host.innerHTML = "";
    host.appendChild(svg);
  }

  window.DNCharts = { line: lineChart, bar: barChart, hbar: hbarChart, donut: donutChart, fmt: fmt };
})();
