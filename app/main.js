/* DataNusa — utilitas bersama: sorot nav aktif, tabel yang bisa diurutkan + difilter. */
(function () {
  function highlightNav() {
    var page = location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll("nav.main a");
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href");
      if (href === page) links[i].classList.add("active");
      else links[i].classList.remove("active");
    }
  }

  /* Membuat tabel bisa diurutkan dengan klik header (kolom angka vs teks). */
  function makeSortable(table) {
    var heads = table.querySelectorAll("th.sortable");
    for (var h = 0; h < heads.length; h++) {
      heads[h].setAttribute("title", "Klik untuk mengurutkan");
      (function (th) {
        th.addEventListener("click", function () {
          var col = parseInt(th.getAttribute("data-col"), 10);
          var numeric = th.getAttribute("data-type") === "num";
          var dir = th.getAttribute("data-dir") === "asc" ? -1 : 1;
          for (var j = 0; j < heads.length; j++) heads[j].removeAttribute("data-dir");
          th.setAttribute("data-dir", dir === 1 ? "asc" : "desc");
          var body = table.tBodies[0];
          var rows = Array.prototype.slice.call(body.rows);
          rows.sort(function (a, b) {
            var av = a.cells[col].textContent.trim();
            var bv = b.cells[col].textContent.trim();
            if (numeric) {
              av = parseFloat(av.replace(/\./g, "").replace(",", "."));
              bv = parseFloat(bv.replace(/\./g, "").replace(",", "."));
              return (av - bv) * dir;
            }
            return av.localeCompare(bv, "id") * dir;
          });
          for (var k = 0; k < rows.length; k++) body.appendChild(rows[k]);
          var arrow = dir === 1 ? " ▲" : " ▼";
          th.textContent = th.textContent.replace(/ [▲▼]$/, "") + arrow;
        });
      })(heads[h]);
    }
  }

  /* Filter baris tabel berdasarkan teks pencarian. */
  function bindFilter(input, table) {
    if (!input || !table) return;
    input.addEventListener("input", function () {
      var q = input.value.toLowerCase();
      var rows = table.tBodies[0].rows;
      var shown = 0;
      for (var i = 0; i < rows.length; i++) {
        var hit = rows[i].textContent.toLowerCase().indexOf(q) !== -1;
        rows[i].style.display = hit ? "" : "none";
        if (hit) shown++;
      }
      var note = document.getElementById("filter-count");
      if (note) note.textContent = shown + " dari " + rows.length + " provinsi ditampilkan.";
    });
  }

  function fmtID(n, dec) {
    return n.toLocaleString("id-ID", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
  }

  window.DN = { highlightNav: highlightNav, makeSortable: makeSortable, bindFilter: bindFilter, fmtID: fmtID };
  document.addEventListener("DOMContentLoaded", highlightNav);
})();
