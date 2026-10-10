import type { Metadata } from "next";
import PlanForm from "./PlanForm";

export const metadata: Metadata = {
  title: "Plan a Multigenerational Family Gathering | Wild & Co Gatherings",
  description: "Tell James Wild who is coming — ages, dates and the occasion — and receive a personal shortlist of resort residences and a Family Chapter plan.",
  alternates: { canonical: "/plan" },
};

export default function Plan() {
  return (
    <section className="wrap" style={{ paddingTop: 80, paddingBottom: 100, maxWidth: 900 }}>
      <p className="cp ox" style={{ margin: "0 0 14px" }}>A conversation before you go</p>
      <h1 className="cas hero-heading page-heading" style={{ margin: "0 0 18px" }}>Tell us who's coming.</h1>
      <p className="body" style={{ margin: "0 0 40px" }}>Your dates, the generations travelling and the occasion. James reads every request himself. Personal reply, no automation.</p>
      <PlanForm />
    </section>
  );
}
