// The canonical address of Wild & Co Gatherings. Set NEXT_PUBLIC_SITE_URL in Vercel when a custom domain is added;
// until then the verified production alias is used (never a placeholder domain).
const SITE_ENV = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
export const SITE = (/^https?:\/\//.test(SITE_ENV) ? SITE_ENV : "https://wildco-gatherings1.vercel.app").replace(/\/$/, "");
