import type { ReactNode } from "react";
import { KpiCard, SectionHeader, type Tone } from "./primitives";

export function KpiRow({
  items,
}: {
  items: { label: string; value: string; unit?: string; delta?: string; deltaTone?: Tone; accent?: Tone; hint?: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((k) => (
        <KpiCard
          key={k.label}
          label={k.label}
          value={k.value}
          unit={k.unit}
          delta={k.delta}
          deltaTone={k.deltaTone ?? "neutral"}
          accent={k.accent ?? "neutral"}
          hint={k.hint}
        />
      ))}
    </div>
  );
}

export function TablePanel({
  title,
  hint,
  actions,
  children,
}: {
  title: string;
  hint?: string | undefined;
  actions?: ReactNode | undefined;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-black-5 bg-white">
      <SectionHeader title={title} hint={hint} actions={actions} />
      {children}
    </section>
  );
}
