// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

const fallbackSite = "https://la-roofing-v1.pages.dev";

// 必须用「对象形式」导出 config，保证 `site` 在集成阶段已存在；
// 若用 defineConfig(({ mode }) => …) 回调，在 Astro 6 下 @astrojs/sitemap 可能读不到 site，导致不生成 *.xml，
// Cloudflare 再把不存在的 /sitemap-index.xml 回退成首页 HTML。
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const fileEnv = loadEnv(mode, process.cwd(), "");
const site =
  process.env.PUBLIC_SITE_URL ??
  fileEnv.PUBLIC_SITE_URL ??
  fallbackSite;

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [sitemap()],
});
