import fs from "node:fs";
import path from "node:path";
const distDir = path.join(process.cwd(), "dist");
if (!fs.existsSync(distDir)) { console.error("dist missing"); process.exit(1); }
for (const name of ["thumbnails", "thumbnails-legacy-v1"]) {
  for (const base of [distDir, ...fs.readdirSync(distDir).map((s) => path.join(distDir, s))]) {
    const p = path.join(base, "images", name);
    if (fs.existsSync(p)) { fs.rmSync(p, { recursive: true, force: true }); console.log("removed", p); }
  }
}
console.log("[prune-images] done");
