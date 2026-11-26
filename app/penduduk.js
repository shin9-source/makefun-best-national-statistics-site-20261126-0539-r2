/* Halaman Penduduk: tren penduduk, struktur umur (SUPAS 2025), tabel 38 provinsi. */
document.addEventListener("DOMContentLoaded", function () {
  var D = window.DATANUSA;
  window.DNCharts.line(document.getElementById("pop-chart"), {
    labels: D.populationTrend.years, values: D.populationTrend.values,
    title: "Tren penduduk Indonesia 2010–2024", decimals: 1, ySuffix: " jt"
  });
  window.DNCharts.donut(document.getElementById("age-chart"), {
    items: D.ageStructure, title: "Struktur umur penduduk"
  });

  var table = document.getElementById("prov-table");
  var body = table.tBodies[0];
  var total = D.provinces.reduce(function (s, p) { return s + p.pop; }, 0);
  D.provinces.forEach(function (p) {
    var tr = document.createElement("tr");
    var density = p.pop * 1000 / p.area;
    tr.innerHTML = "<td>" + p.name + "</td>" +
      "<td class=\"num\">" + window.DN.fmtID(p.pop, 1) + "</td>" +
      "<td class=\"num\">" + window.DN.fmtID(p.pop / total * 100, 2) + "%</td>" +
      "<td class=\"num\">" + window.DN.fmtID(density, 0) + "</td>" +
      "<td class=\"num\">" + window.DN.fmtID(p.ipm, 2) + "</td>";
    body.appendChild(tr);
  });
  window.DN.makeSortable(table);
  window.DN.bindFilter(document.getElementById("prov-search"), table);
  document.getElementById("filter-count").textContent = "38 dari 38 provinsi ditampilkan.";
});
