import fs from "node:fs";
import path from "node:path";
const distDir = path.join(process.cwd(), "dist");
const ignorePath = path.join(distDir, ".assetsignore");
const body = "# Pages 20k limit\n**/images/thumbnails/**\n";
if (!fs.existsSync(distDir)) { console.error("dist missing"); process.exit(1); }
fs.writeFileSync(ignorePath, body, "utf8");
console.log("wrote", ignorePath);
