import { buildLedger } from "@/lib/ledger-registry";

export const revalidate = 3600;

export async function GET() {
  return Response.json(await buildLedger(), { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
