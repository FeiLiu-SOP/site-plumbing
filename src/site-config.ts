/**
 * 站点「配置中心」：从构建时环境变量读取，换类目时改 Cloudflare Pages 的 Build 变量即可。
 * 客户端/模板中使用的变量须带 PUBLIC_ 前缀（Astro/Vite 约定）。
 */

import {
  ACTIVE_COLLECTION,
  type ActiveCollectionKey,
} from "./active-collection";

const fallbackSiteUrl = "https://la-roofing-v1.pages.dev";

/** 未设置 PUBLIC_NICHE_LABEL 时，与当前 ACTIVE_COLLECTION 对齐（避免 plumbing 构建仍显示 Roofing） */
const DEFAULT_NICHE_BY_COLLECTION: Record<ActiveCollectionKey, string> = {
  roofing: "Roofing",
  plumbing: "Plumbing",
  pestcontrol: "Pest Control",
};

const rawNicheLabel = (
  import.meta.env.PUBLIC_NICHE_LABEL as string | undefined
)?.trim();

export const PUBLIC_NICHE_LABEL =
  rawNicheLabel && rawNicheLabel.length > 0
    ? rawNicheLabel
    : DEFAULT_NICHE_BY_COLLECTION[ACTIVE_COLLECTION];

/**
 * E.164 优先顺序：显式 E164 > PUBLIC_PHONE（部分环境只配一个号码）> 默认
 */
const rawPhoneE164 =
  (import.meta.env.PUBLIC_PHONE_E164 as string | undefined)?.trim() ||
  (import.meta.env.PUBLIC_PHONE as string | undefined)?.trim() ||
  "+17733028078";

export const PUBLIC_PHONE_DISPLAY =
  import.meta.env.PUBLIC_PHONE_DISPLAY ?? "+1 (773) 302-8078";

/** 与 sitemap、绝对 URL 一致；astro.config.mjs 的 site 应使用同一环境变量 */
export const PUBLIC_SITE_URL =
  import.meta.env.PUBLIC_SITE_URL ?? fallbackSiteUrl;

/**
 * 规范为 E.164（联盟/解析/JSON-LD 更稳）：仅数字时按北美 +1 处理
 */
export function normalizePhoneE164(input: string): string {
  const t = input.trim();
  if (t.startsWith("+")) {
    const digits = t.slice(1).replace(/\D/g, "");
    return `+${digits}`;
  }
  const digits = t.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return t;
}

export const PUBLIC_PHONE_E164 = normalizePhoneE164(rawPhoneE164);

export const siteConfig = {
  nicheLabel: PUBLIC_NICHE_LABEL,
  phoneE164: PUBLIC_PHONE_E164,
  phoneDisplay: PUBLIC_PHONE_DISPLAY,
  siteUrl: PUBLIC_SITE_URL,
} as const;
