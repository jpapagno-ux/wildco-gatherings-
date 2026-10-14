"use client";
import { useJourney } from "@/components/JourneyProvider";
import type { IggiContext } from "@/components/IggiPanel";

export default function AskIggiButton({ label = "Ask Iggi", className = "btn btn-o", ctx }: { label?: string; className?: string; ctx?: IggiContext }) {
  const { openIggi } = useJourney();
  return <button type="button" className={className} onClick={() => openIggi(ctx)}>{label}</button>;
}
