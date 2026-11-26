/* Halaman Daerah: pilih provinsi dari dropdown, panel datanya berubah; tabel 38 provinsi. */
document.addEventListener("DOMContentLoaded", function () {
  var D = window.DATANUSA;
  var total = D.provinces.reduce(function (s, p) { return s + p.pop; }, 0);
  var sel = document.getElementById("prov-select");

  D.provinces.forEach(function (p) {
    var opt = document.createElement("option");
    opt.value = p.name; opt.textContent = p.name;
    sel.appendChild(opt);
  });

  function show(name) {
    var p = D.provinces.find(function (x) { return x.name === name; }) || D.provinces[0];
    var rank = D.provinces.slice().sort(function (a, b) { return b.pop - a.pop; }).indexOf(p) + 1;
    document.getElementById("prov-name").textContent = p.name;
    document.getElementById("prov-pop").textContent = window.DN.fmtID(p.pop, 1) + " rb";
    document.getElementById("prov-share").textContent = window.DN.fmtID(p.pop / total * 100, 2) + "%";
    document.getElementById("prov-ipm").textContent = window.DN.fmtID(p.ipm, 2);
    document.getElementById("prov-density").textContent = window.DN.fmtID(p.pop * 1000 / p.area, 0) + " /km²";
    document.getElementById("prov-note").textContent =
      p.name + " — penduduk " + window.DN.fmtID(p.pop, 1) + " ribu jiwa (pertengahan 2024), " +
      "peringkat " + rank + " dari 38 provinsi menurut jumlah penduduk, " +
      "IPM " + window.DN.fmtID(p.ipm, 2) + " (2024), luas wilayah " + window.DN.fmtID(p.area, 0) +
      " km². Sumber: BPS.";
  }
  sel.value = "Jawa Barat";
  sel.addEventListener("change", function () { show(sel.value); });
  show("Jawa Barat");

  var table = document.getElementById("prov-table");
  var body = table.tBodies[0];
  D.provinces.forEach(function (p) {
    var tr = document.createElement("tr");
    tr.innerHTML = "<td>" + p.name + "</td>" +
      "<td class=\"num\">" + window.DN.fmtID(p.pop, 1) + "</td>" +
      "<td class=\"num\">" + window.DN.fmtID(p.pop / total * 100, 2) + "%</td>" +
      "<td class=\"num\">" + window.DN.fmtID(p.pop * 1000 / p.area, 0) + "</td>" +
      "<td class=\"num\">" + window.DN.fmtID(p.ipm, 2) + "</td>";
    body.appendChild(tr);
  });
  window.DN.makeSortable(table);
});
