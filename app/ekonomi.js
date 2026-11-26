/* Halaman Ekonomi: pertumbuhan PDB, sektor PDB, inflasi, perdagangan, pengangguran. */
document.addEventListener("DOMContentLoaded", function () {
  var D = window.DATANUSA;
  window.DNCharts.bar(document.getElementById("growth-chart"), {
    labels: D.gdpGrowth.years, values: D.gdpGrowth.values,
    title: "Pertumbuhan PDB 2015–2024", decimals: 2, ySuffix: "%"
  });
  window.DNCharts.hbar(document.getElementById("sector-chart"), {
    items: D.gdpSectors, title: "Struktur PDB 2024 menurut lapangan usaha"
  });
  window.DNCharts.line(document.getElementById("inflation-chart"), {
    labels: D.inflationTrend.years, values: D.inflationTrend.values,
    title: "Tren inflasi 2015–2024", decimals: 2, ySuffix: "%"
  });
  window.DNCharts.line(document.getElementById("unemp-chart"), {
    labels: D.unemploymentTrend.years, values: D.unemploymentTrend.values,
    title: "Tren pengangguran 2015–2024", decimals: 2, ySuffix: "%"
  });
  /* Konteks: TPT 2024 (4,91%) adalah yang terendah dalam satu dekade. */
  document.getElementById("growth-chart").closest(".panel").querySelector(".chart-note").textContent +=
    " Rata-rata 2015–2019: 5,04% per tahun.";
});
