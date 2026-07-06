/**
 * Per-slug Realtors plumbing-v2 SERP overrides (GSC query-aligned CTR tests).
 */
export type PlumbingV2SerpOverride = {
  pageTitle: string;
  pageH1: string;
  metaDescription: string;
};

const PLUMBING_V2_TITLE_MAX = 55;
const PLUMBING_V2_META_MAX = 155;

function clipMetaDescription(text: string, max = PLUMBING_V2_META_MAX): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd().replace(/[,;\s]+$/, "")}…`;
}

function assertTitleFits(title: string, context: string): string {
  if (title.length > PLUMBING_V2_TITLE_MAX) {
    throw new Error(
      `[plumbing-v2-serp-overrides] Title exceeds ${PLUMBING_V2_TITLE_MAX} chars (${title.length}). ctx=${context}`,
    );
  }
  return title;
}

const RAW: Record<string, PlumbingV2SerpOverride> = {
  "plumbing-v2-silver-springs-shores-east-fl-32179": {
    pageTitle: "Plumber Silver Springs Shores East | FixitGrid",
    pageH1: "Plumber in Silver Springs Shores East, FL — ZIP 32179",
    metaDescription:
      "Licensed plumber in Silver Springs Shores East, FL 32179. Emergency leaks, drains and repairs. Same-day local plumbing service.",
  },
};

export function getPlumbingV2SerpOverride(slug: string): PlumbingV2SerpOverride | null {
  const row = RAW[slug];
  if (!row) return null;
  return {
    pageTitle: assertTitleFits(row.pageTitle, `override:${slug}`),
    pageH1: row.pageH1,
    metaDescription: clipMetaDescription(row.metaDescription),
  };
}
