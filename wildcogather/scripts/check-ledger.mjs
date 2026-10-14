// npm run check:ledger — validates the persisted ecosystem registry before a release.
import { readFileSync } from "node:fs";
const ents = JSON.parse(readFileSync(new URL("../data/entities.json", import.meta.url))).entities;
const ev = JSON.parse(readFileSync(new URL("../data/evidence.json", import.meta.url))).evidence;
const errors = [];
const ids = new Set();
for (const e of ents) { if (ids.has(e.id)) errors.push(`duplicate entity id ${e.id}`); ids.add(e.id); }
for (const e of ents) {
  if (!/^JWC-[PRIOV]-\d{4}$/.test(e.id)) errors.push(`bad id format ${e.id}`);
  if (e.parentId && !ids.has(e.parentId)) errors.push(`${e.id} parent ${e.parentId} missing`);
  if (e.type === "residence" && !e.parentId) errors.push(`residence ${e.id} has no parent`);
}
const refs = new Map();
for (const e of ents) for (const r of e.collectionRefs) { const k = `${r.collection}:${r.ref}`; if (refs.has(k)) errors.push(`collection ref ${k} on ${refs.get(k)} and ${e.id}`); refs.set(k, e.id); }
const evIds = new Set();
for (const x of ev) {
  if (evIds.has(x.id)) errors.push(`duplicate evidence ${x.id}`); evIds.add(x.id);
  if (!ids.has(x.subject)) errors.push(`evidence ${x.id} subject ${x.subject} missing`);
  for (const f of ["reviewer", "role", "method", "precision", "scope", "source", "wording", "status"]) if (!x[f]) errors.push(`evidence ${x.id} missing ${f}`);
}
const houses = ents.filter((e) => e.collectionRefs.some((r) => r.collection === "gatherings" && /^G-\d{3}$/.test(r.ref)));
for (const h of houses) if (!ev.some((x) => x.subject === h.id && x.method === "House Selected")) errors.push(`${h.id} has no House Selected evidence`);
console.log(`${ents.length} entities · ${houses.length} Gatherings houses · ${ev.length} evidence records`);
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Ledger registry OK");
