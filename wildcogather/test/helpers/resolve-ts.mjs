// Test-only module hooks: lets node --test import the app's TypeScript the way Next resolves it —
// "@/…" from the app root, extensionless relative imports (.ts / .tsx) and JSON data files.
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = new URL("../../", import.meta.url);

export async function resolve(specifier, context, next) {
  let spec = specifier.startsWith("@/") ? new URL(specifier.slice(2), ROOT).href : specifier;
  if ((spec.startsWith(".") || spec.startsWith("file:")) && !/\.(?:[cm]?[jt]sx?|json)$/.test(spec)) {
    const base = new URL(spec, context.parentURL);
    for (const ext of [".ts", ".tsx", "/index.ts"]) {
      const p = fileURLToPath(base) + ext;
      if (existsSync(p)) { spec = pathToFileURL(p).href; break; }
    }
  }
  return next(spec, context);
}

export async function load(url, context, next) {
  if (url.endsWith(".json")) {
    const { readFileSync } = await import("node:fs");
    return { format: "module", source: `export default ${readFileSync(fileURLToPath(url), "utf8")};`, shortCircuit: true };
  }
  return next(url, context);
}
