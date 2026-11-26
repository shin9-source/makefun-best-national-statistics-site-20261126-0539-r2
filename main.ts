/* DataNusa — main.ts: menyalin app/ + screenshots/ ke /output (atau
   $MAKEFUN_OUTPUT_DIR) secara terurut alfabetis, lalu menulis
   /output/dossier.json via buildDossier dari vendor/makefun-frontend.ts.
   Deterministik: tanpa timestamp, tanpa random — dua kali jalan = byte identik. */
import { buildDossier } from "./vendor/makefun-frontend.ts";
import { copyFileSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.cwd();
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

function copySorted(srcDir: string, dstDir: string): void {
  mkdirSync(dstDir, { recursive: true });
  const names = readdirSync(srcDir).sort();
  for (const name of names) {
    const src = join(srcDir, name);
    const dst = join(dstDir, name);
    if (statSync(src).isDirectory()) copySorted(src, dst);
    else copyFileSync(src, dst);
  }
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
copySorted(join(repoRoot, "app"), join(outDir, "app"));
copySorted(join(repoRoot, "screenshots"), join(outDir, "screenshots"));
/* buildDossier(dir, caps): caps.text_max_bytes = batas teks dossier (163.840 byte). */
writeFileSync(join(outDir, "dossier.json"), buildDossier(outDir, { text_max_bytes: 163840 }));
console.log("DataNusa: wrote " + outDir + " (app + screenshots + dossier.json)");
