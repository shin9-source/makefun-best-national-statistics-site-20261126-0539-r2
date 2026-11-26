/* Beranda DataNusa: chart hero pertumbuhan PDB (toggle batang/garis + rentang tahun),
   tren penduduk, tabel 10 provinsi terpadat, daftar rilis terbaru. */
document.addEventListener("DOMContentLoaded", function () {
  var D = window.DATANUSA;
  var mode = "bar";
  var fromYear = 2015;

  function sliceYears() {
    var g = D.gdpGrowth;
    var labels = [], values = [];
    for (var i = 0; i < g.years.length; i++) {
      if (g.years[i] >= fromYear) { labels.push(g.years[i]); values.push(g.values[i]); }
    }
    return { labels: labels, values: values };
  }
  function drawHero() {
    var s = sliceYears();
    var host = document.getElementById("hero-chart");
    var opts = { labels: s.labels, values: s.values, title: "Pertumbuhan PDB Indonesia", decimals: 2, ySuffix: "%" };
    if (mode === "bar") window.DNCharts.bar(host, opts);
    else window.DNCharts.line(host, opts);
    document.getElementById("hero-note").textContent =
      "Pertumbuhan PDB " + fromYear + "–2024, persen (y-on-y). Tahun 2020: −2,07% — kontraksi pertama sejak 1998. Sumber: BPS.";
    document.getElementById("hero-note").setAttribute("aria-live", "polite");
  }
  document.getElementById("toggle-bar").addEventListener("click", function () {
    mode = "bar";
    this.setAttribute("aria-pressed", "true");
    document.getElementById("toggle-line").setAttribute("aria-pressed", "false");
    drawHero();
  });
  document.getElementById("toggle-line").addEventListener("click", function () {
    mode = "line";
    this.setAttribute("aria-pressed", "true");
    document.getElementById("toggle-bar").setAttribute("aria-pressed", "false");
    drawHero();
  });
  document.getElementById("year-from").addEventListener("change", function () {
    fromYear = parseInt(this.value, 10);
    drawHero();
  });
  drawHero();

  window.DNCharts.line(document.getElementById("pop-chart"), {
    labels: D.populationTrend.years, values: D.populationTrend.values,
    title: "Tren penduduk Indonesia", decimals: 1, ySuffix: " jt"
  });

  var top = D.provinces.slice().sort(function (a, b) { return b.pop - a.pop; }).slice(0, 10);
  var body = document.getElementById("top10-body");
  var total = D.provinces.reduce(function (s, p) { return s + p.pop; }, 0);
  top.forEach(function (p, i) {
    var tr = document.createElement("tr");
    tr.innerHTML = "<td>" + (i + 1) + "</td><td>" + p.name + "</td>" +
      "<td class=\"num\">" + window.DN.fmtID(p.pop, 1) + "</td>" +
      "<td class=\"num\">" + window.DN.fmtID(p.pop / total * 100, 2) + "%</td>";
    body.appendChild(tr);
  });

  var list = document.getElementById("releases");
  D.releases.forEach(function (r) {
    var li = document.createElement("li");
    var d = document.createElement("span"); d.className = "date"; d.textContent = r.date;
    var t = document.createElement("span"); t.textContent = r.title + " — " + r.source;
    li.appendChild(d); li.appendChild(t); list.appendChild(li);
  });
});
