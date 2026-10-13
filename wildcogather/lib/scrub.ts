// Removes internal review notes before anything reaches the page, whatever the source
// (sample data or Airtable): [confirm …], [To confirm …], [Draft — J.W. to approve],
// [J.W. to write …], [… to confirm]. Empty strings left behind are dropped from lists.
const NOTE = /\s*\[(?:(?:Draft|confirm|Confirm|To confirm|J\.W\.)[^\]\[\n]*|[^\]\[\n]*to confirm)\]/g;

export function scrub<T>(value: T): T {
  if (typeof value === "string") return value.replace(NOTE, "").trim() as unknown as T;
  if (Array.isArray(value)) {
    const out = value.map((v) => scrub(v));
    return (out.every((v) => typeof v === "string") ? out.filter((v) => v !== "") : out) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = scrub(v);
    return out as T;
  }
  return value;
}
