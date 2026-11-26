/* Halaman Sosial: tren IPM dan kemiskinan, perbandingan IPM antar provinsi. */
document.addEventListener("DOMContentLoaded", function () {
  var D = window.DATANUSA;
  window.DNCharts.line(document.getElementById("hdi-chart"), {
    labels: D.hdiTrend.years, values: D.hdiTrend.values,
    title: "Tren IPM 2015–2024", decimals: 2, ySuffix: ""
  });
  window.DNCharts.line(document.getElementById("poverty-chart"), {
    labels: D.povertyTrend.years, values: D.povertyTrend.values,
    title: "Tren kemiskinan 2015–2024", decimals: 2, ySuffix: "%"
  });
  var picks = ["DKI Jakarta", "DI Yogyakarta", "Kepulauan Riau", "Kalimantan Timur", "Bali", "Banten", "Jawa Timur", "Nusa Tenggara Timur", "Papua", "Papua Pegunungan"];
  var items = picks.map(function (name) {
    var p = D.provinces.find(function (x) { return x.name === name; });
    return { name: p.name, value: p.ipm };
  }).sort(function (a, b) { return b.value - a.value; });
  window.DNCharts.hbar(document.getElementById("hdi-prov-chart"), { items: items, title: "IPM provinsi terpilih 2024" });
  var spread = (items[0].value - items[items.length - 1].value).toFixed(2).replace(".", ",");
  document.getElementById("hdi-prov-chart").closest(".panel").querySelector(".chart-note").textContent +=
    " Rentang provinsi terpilih: " + spread + " poin.";
});
