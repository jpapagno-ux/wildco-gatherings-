// The canonical address of Wild & Co Gatherings. Set NEXT_PUBLIC_SITE_URL in Vercel when a custom domain is added;
// until then the verified production alias is used (never a placeholder domain).
export const SITE = (process.env.NEXT_PUBLIC_SITE_URL && /^https?:\/\//.test(process.env.NEXT_PUBLIC_SITE_URL) ? process.env.NEXT_PUBLIC_SITE_URL : "https://wildco-gatherings1.vercel.app").replace(/\/$/, "");
