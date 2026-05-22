/**
 * Per-slug Rockwell roofing SERP overrides (CTR tests). Keys = entry slug without .md.
 */
export type RoofingSerpOverride = {
  pageTitle: string;
  pageH1: string;
  metaDescription: string;
};

const ROOFING_TITLE_MAX = 55;
const ROOFING_META_MAX = 155;

function clipMetaDescription(text: string, max = ROOFING_META_MAX): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd().replace(/[,;\s]+$/, "")}…`;
}

function assertRoofingTitleFits(title: string, context: string): string {
  if (title.length > ROOFING_TITLE_MAX) {
    throw new Error(
      `[roofing-serp-overrides] Title exceeds ${ROOFING_TITLE_MAX} chars (${title.length}). ctx=${context}`,
    );
  }
  return title;
}

const RAW: Record<string, Omit<RoofingSerpOverride, "metaDescription"> & { metaDescription: string }> = {
  "roofing-carlsbad-ca-92008": {
    pageTitle: "Emergency Roofing Carlsbad: No-Scam Quotes | FixitGrid",
    pageH1: "Emergency Roofing in Carlsbad, CA",
    metaDescription:
      "Local Carlsbad emergency roofing. Stop overpaying. Verify your scope before the work starts. Fast dispatch.",
  },
};

export function getRoofingSerpOverride(slug: string): RoofingSerpOverride | null {
  const row = RAW[slug];
  if (!row) return null;
  const metaDescription = clipMetaDescription(row.metaDescription, ROOFING_META_MAX);
  const pageTitle = assertRoofingTitleFits(row.pageTitle, `override:${slug}`);
  return { pageTitle, pageH1: row.pageH1, metaDescription };
}
