/* DataNusa — semua angka situs ini. Sumber: BPS (Badan Pusat Statistik) dan Bank Dunia.
   Satuan tertulis di tiap kelompok. Angka provinsi: proyeksi penduduk interim BPS
   pertengahan 2024 (ribu jiwa) dan IPM BPS 2024. Luas wilayah: km persegi (BPS).
   Angka dibulatkan; jumlah provinsi dapat berbeda tipis dari total nasional 281,6 jt. */
window.DATANUSA = {
  meta: {
    country: "Indonesia",
    sourceMain: "BPS",
    updated: "November 2026"
  },
  kpi: {
    population: { value: "281,6 jt", label: "Penduduk", period: "Pertengahan 2024", source: "BPS" },
    gdp: { value: "Rp22.139 T", label: "PDB nominal", period: "2024", source: "BPS" },
    growth: { value: "5,03%", label: "Pertumbuhan ekonomi", period: "2024 (y-on-y)", source: "BPS" },
    inflation: { value: "1,57%", label: "Inflasi", period: "Desember 2024 (y-on-y)", source: "BPS" },
    unemployment: { value: "4,91%", label: "Pengangguran (TPT)", period: "Agustus 2024", source: "BPS" },
    poverty: { value: "9,03%", label: "Kemiskinan", period: "Maret 2024 — 24,85 jt jiwa", source: "BPS" }
  },
  /* Pertumbuhan PDB, persen y-on-y, 2015-2024 (BPS). 2020 negatif: -2,07. */
  gdpGrowth: {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03],
    source: "BPS"
  },
  /* Penduduk pertengahan tahun, juta jiwa (BPS; 2020 = Sensus Penduduk). */
  populationTrend: {
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [237.6, 241.0, 244.5, 247.9, 251.3, 255.2, 258.7, 262.0, 265.0, 267.7, 270.2, 272.5, 275.8, 278.7, 281.6],
    source: "BPS"
  },
  /* Inflasi Desember y-on-y, persen (BPS). */
  inflationTrend: {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57],
    source: "BPS"
  },
  /* Tingkat Pengangguran Terbuka, persen (BPS, Agustus tiap tahun). */
  unemploymentTrend: {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [6.18, 5.61, 5.50, 5.34, 5.23, 7.07, 6.49, 5.86, 5.32, 4.91],
    source: "BPS"
  },
  /* Tingkat kemiskinan, persen (BPS, Maret tiap tahun; 2015 = September 2015). */
  povertyTrend: {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [11.22, 10.86, 10.64, 9.82, 9.41, 9.78, 10.14, 9.57, 9.36, 9.03],
    source: "BPS"
  },
  /* Indeks Pembangunan Manusia (BPS; 2022 memakai vintage terbaru BPS). */
  hdiTrend: {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [69.55, 70.18, 70.81, 71.39, 71.92, 71.94, 72.29, 73.77, 74.39, 75.02],
    source: "BPS"
  },
  /* Struktur PDB 2024 menurut lapangan usaha, persen (BPS). */
  gdpSectors: [
    { name: "Industri pengolahan", value: 18.98 },
    { name: "Perdagangan", value: 13.07 },
    { name: "Pertanian, kehutanan, perikanan", value: 12.61 },
    { name: "Konstruksi", value: 10.09 },
    { name: "Pertambangan dan penggalian", value: 9.15 },
    { name: "Lapangan usaha lainnya", value: 36.10 }
  ],
  /* Struktur umur, persen (SUPAS 2025, BPS). */
  ageStructure: [
    { name: "0–14 tahun", value: 23.44 },
    { name: "15–64 tahun", value: 68.94 },
    { name: "65+ tahun", value: 7.62 }
  ],
  trade2024: {
    export: { value: "US$264,70 M", change: "+2,29% vs 2023" },
    import: { value: "US$233,66 M", change: "+5,31% vs 2023" },
    surplus: { value: "US$31,04 M", note: "Surplus tahun kelima berturut-turut" },
    source: "BPS"
  },
  social2024: {
    hdi: { value: "75,02", label: "IPM 2024" },
    lifeExpectancy: { value: "74,15 thn", label: "Umur harapan hidup 2024" },
    meanSchooling: { value: "8,85 thn", label: "Rata-rata lama sekolah 2024" },
    expectedSchooling: { value: "13,21 thn", label: "Harapan lama sekolah 2024" },
    literacy: { value: "96,53%", label: "Melek huruf (Susenas Maret 2023)" },
    source: "BPS"
  },
  releases: [
    { date: "5 November 2025", title: "Pertumbuhan ekonomi Triwulan III-2025: 5,04% (y-on-y)", source: "BPS" },
    { date: "3 November 2025", title: "Inflasi Oktober 2025: 2,86% (y-on-y)", source: "BPS" },
    { date: "5 November 2025", title: "Tingkat Pengangguran Terbuka Agustus 2025: 4,85%", source: "BPS" },
    { date: "25 November 2024", title: "Indeks Pembangunan Manusia 2024: 75,02", source: "BPS" },
    { date: "1 Juli 2024", title: "Tingkat kemiskinan Maret 2024: 9,03% (24,85 juta jiwa)", source: "BPS" }
  ],
  /* 38 provinsi. pop = ribu jiwa, pertengahan 2024 (BPS). ipm = IPM 2024 (BPS).
     area = luas wilayah km2 (BPS). Kepadatan dihitung: pop*1000/area. */
  provinces: [
    { name: "Aceh", pop: 5554.8, ipm: 74.45, area: 56835 },
    { name: "Sumatera Utara", pop: 15588.5, ipm: 75.45, area: 72981 },
    { name: "Sumatera Barat", pop: 5757.2, ipm: 75.45, area: 42013 },
    { name: "Riau", pop: 6887.3, ipm: 75.42, area: 87024 },
    { name: "Jambi", pop: 3678.7, ipm: 74.18, area: 50058 },
    { name: "Sumatera Selatan", pop: 8837.4, ipm: 73.55, area: 91592 },
    { name: "Bengkulu", pop: 2115.0, ipm: 74.48, area: 19919 },
    { name: "Lampung", pop: 9417.5, ipm: 72.12, area: 34624 },
    { name: "Kepulauan Bangka Belitung", pop: 1519.4, ipm: 73.89, area: 16424 },
    { name: "Kepulauan Riau", pop: 2234.8, ipm: 79.76, area: 8202 },
    { name: "DKI Jakarta", pop: 10684.9, ipm: 84.15, area: 664 },
    { name: "Jawa Barat", pop: 50345.2, ipm: 74.92, area: 37045 },
    { name: "Jawa Tengah", pop: 37892.3, ipm: 73.55, area: 34338 },
    { name: "DI Yogyakarta", pop: 3759.5, ipm: 82.36, area: 3171 },
    { name: "Jawa Timur", pop: 41814.5, ipm: 75.38, area: 48038 },
    { name: "Banten", pop: 12431.4, ipm: 78.62, area: 9353 },
    { name: "Bali", pop: 4361.1, ipm: 78.74, area: 5780 },
    { name: "Nusa Tenggara Barat", pop: 5726.7, ipm: 73.06, area: 20153 },
    { name: "Nusa Tenggara Timur", pop: 5656.4, ipm: 66.87, area: 47931 },
    { name: "Kalimantan Barat", pop: 5798.1, ipm: 71.38, area: 147307 },
    { name: "Kalimantan Tengah", pop: 2809.8, ipm: 74.28, area: 153564 },
    { name: "Kalimantan Selatan", pop: 4293.3, ipm: 75.19, area: 38744 },
    { name: "Kalimantan Timur", pop: 3931.1, ipm: 79.13, area: 127268 },
    { name: "Kalimantan Utara", pop: 737.6, ipm: 75.52, area: 75467 },
    { name: "Sulawesi Utara", pop: 2742.8, ipm: 76.46, area: 13892 },
    { name: "Sulawesi Tengah", pop: 3138.9, ipm: 73.14, area: 61841 },
    { name: "Sulawesi Selatan", pop: 9463.4, ipm: 74.54, area: 46717 },
    { name: "Sulawesi Tenggara", pop: 2823.1, ipm: 73.52, area: 38068 },
    { name: "Gorontalo", pop: 1247.5, ipm: 71.13, area: 11257 },
    { name: "Sulawesi Barat", pop: 1580.3, ipm: 70.34, area: 16787 },
    { name: "Maluku", pop: 1988.5, ipm: 72.73, area: 46914 },
    { name: "Maluku Utara", pop: 1433.1, ipm: 71.47, area: 31983 },
    { name: "Papua Barat", pop: 559.2, ipm: 71.46, area: 64516 },
    { name: "Papua Barat Daya", pop: 618.0, ipm: 70.75, area: 39123 },
    { name: "Papua", pop: 1101.7, ipm: 61.94, area: 82680 },
    { name: "Papua Selatan", pop: 542.1, ipm: 68.49, area: 117849 },
    { name: "Papua Tengah", pop: 1385.1, ipm: 61.25, area: 61073 },
    { name: "Papua Pegunungan", pop: 1467.7, ipm: 54.43, area: 51213 }
  ]
};
