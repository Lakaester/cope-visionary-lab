import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, ChevronDown, ClipboardList, Paperclip, Send, Stethoscope, Tag, Wrench } from "lucide-react";
import { Badge, StatusIndicator, type Tone } from "@/components/cope/primitives";
import { SearchInput, SegmentedControl, ToolbarButton } from "@/components/cope/controls";
import { canalLabel, conversacion, tickets, type Ticket } from "@/lib/cope-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/atenciones")({
  head: () => ({
    meta: [
      { title: "Atenciones · COPE" },
      { name: "description", content: "Workspace de tres columnas: bandeja, conversación y panel operativo del asesor." },
      { property: "og:title", content: "Atenciones · COPE" },
      { property: "og:description", content: "Workspace de tres columnas: bandeja, conversación y panel operativo del asesor." },
    ],
  }),
  component: Atenciones,
});

const canalTone: Record<Ticket["canal"], Tone> = {
  whatsapp: "success",
  correo: "warning",
  zendesk: "info",
  telefono: "neutral",
};

const estadoLabel: Record<Ticket["estado"], string> = {
  abierto: "Abierto",
  en_proceso: "En proceso",
  espera: "En espera",
  resuelto: "Resuelto",
};

const slaTone: Record<Ticket["sla"], Tone> = {
  cumplido: "success",
  en_riesgo: "warning",
  incumplido: "danger",
};

function Atenciones() {
  const [query, setQuery] = useState("");
  const [filtro, setFiltro] = useState<"Todos" | "Míos" | "Sin asignar" | "En riesgo">("Todos");
  const [selectedId, setSelectedId] = useState(tickets[0]!.id);

  const lista = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tickets.filter((t) => {
      if (q && !`${t.id} ${t.cliente} ${t.asunto}`.toLowerCase().includes(q)) return false;
      if (filtro === "Míos") return t.asesor === "M. Quispe";
      if (filtro === "Sin asignar") return t.estado === "abierto";
      if (filtro === "En riesgo") return t.sla !== "cumplido";
      return true;
    });
  }, [query, filtro]);

  const actual = tickets.find((t) => t.id === selectedId) ?? tickets[0]!;

  return (
    <div className="flex min-h-0 flex-1">
      {/* Bandeja */}
      <section className="flex w-[320px] shrink-0 flex-col border-r border-border bg-surface">
        <div className="border-b border-border px-3 py-2">
          <div className="flex items-center justify-between pb-2">
            <h1 className="text-[13px] font-semibold">Bandeja</h1>
            <span className="num text-[11.5px] text-muted-foreground">{lista.length} atenciones</span>
          </div>
          <SearchInput value={query} onChange={setQuery} placeholder="Ticket, cliente o asunto…" />
          <div className="mt-2 flex items-center gap-1.5 overflow-x-auto pb-0.5">
            <SegmentedControl
              options={["Todos", "Míos", "Sin asignar", "En riesgo"] as const}
              value={filtro}
              onChange={setFiltro}
            />
          </div>
        </div>

        <ul className="min-h-0 flex-1 scroll-y">
          {lista.map((t) => {
            const active = t.id === selectedId;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(t.id)}
                  className={cn(
                    "flex w-full flex-col gap-1 border-b border-l-2 border-border py-2 pl-[10px] pr-3 text-left transition-colors",
                    active ? "border-l-primary bg-info-soft" : "border-l-transparent hover:bg-surface-2",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="num text-[11.5px] text-muted-foreground">{t.id}</span>
                    <Badge tone={canalTone[t.canal]}>{canalLabel[t.canal]}</Badge>
                    <span className="num ml-auto text-[11px] text-muted-foreground">{t.ultimo}</span>
                  </div>
                  <p className="truncate text-[12.5px] font-medium">{t.cliente}</p>
                  <p className="truncate text-[12px] text-muted-foreground">{t.asunto}</p>
                  <div className="flex w-full items-center gap-2 pt-0.5">
                    <StatusIndicator
                      tone={t.estado === "resuelto" ? "success" : t.estado === "espera" ? "neutral" : "info"}
                      label={estadoLabel[t.estado]}
                      className="text-[11.5px] text-muted-foreground"
                    />
                    {t.sla !== "cumplido" && (
                      <Badge tone={slaTone[t.sla]}>{t.sla === "incumplido" ? "SLA incumplido" : "SLA en riesgo"}</Badge>
                    )}
                    {t.sinLeer > 0 && (
                      <span className="num ml-auto rounded-full bg-primary px-1.5 text-[10.5px] font-semibold text-primary-foreground">
                        {t.sinLeer}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Conversación */}
      <section className="flex min-w-0 flex-1 flex-col bg-background">
        <header className="flex items-center gap-3 border-b border-border bg-surface px-4 py-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-[13.5px] font-semibold">{actual.cliente}</h2>
              <Badge tone={canalTone[actual.canal]}>{canalLabel[actual.canal]}</Badge>
              <Badge tone={slaTone[actual.sla]}>
                SLA {actual.sla === "cumplido" ? "cumplido" : actual.sla === "en_riesgo" ? "en riesgo" : "incumplido"}
              </Badge>
            </div>
            <p className="truncate text-[12px] text-muted-foreground">
              <span className="num">{actual.id}</span> · {actual.local} · {actual.pais} · {actual.categoria} / {actual.subcategoria}
            </p>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <ToolbarButton>Transferir</ToolbarButton>
            <ToolbarButton>Escalar</ToolbarButton>
            <ToolbarButton active>Resolver</ToolbarButton>
          </div>
        </header>

        <div className="min-h-0 flex-1 scroll-y px-4 py-4">
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            {conversacion.map((m, i) =>
              m.autor === "sistema" ? (
                <p key={i} className="mx-auto text-[11.5px] text-muted-foreground">
                  {m.hora} · {m.texto}
                </p>
              ) : (
                <article
                  key={i}
                  className={cn(
                    "max-w-[78%] rounded-md border px-3 py-2",
                    m.autor === "asesor" ? "self-end border-primary/20 bg-info-soft" : "self-start border-border bg-surface",
                  )}
                >
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="text-[11.5px] font-semibold">{m.nombre}</span>
                    <span className="num text-[11px] text-muted-foreground">{m.hora}</span>
                  </div>
                  <p className="text-[13px] leading-relaxed">{m.texto}</p>
                </article>
              ),
            )}
          </div>
        </div>

        <footer className="border-t border-border bg-surface px-4 py-2">
          <div className="mx-auto max-w-3xl">
            <div className="mb-1.5 flex items-center gap-1.5">
              <SegmentedControl options={["Responder", "Nota interna"] as const} value="Responder" onChange={() => {}} />
              <ToolbarButton title="Respuestas rápidas">Respuestas rápidas</ToolbarButton>
              <ToolbarButton title="Adjuntar">
                <Paperclip className="size-3.5" aria-hidden />
              </ToolbarButton>
            </div>
            <div className="rounded-md border border-input bg-surface focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring/20">
              <textarea
                rows={3}
                placeholder="Escribe tu respuesta al cliente…"
                className="w-full resize-none bg-transparent px-3 py-2 text-[13px] outline-none placeholder:text-muted-foreground"
              />
              <div className="flex items-center gap-2 border-t border-border px-2 py-1.5">
                <span className="text-[11.5px] text-muted-foreground">Plantilla: Diagnóstico de integración</span>
                <button
                  type="button"
                  className="ml-auto inline-flex h-7 items-center gap-1.5 rounded bg-primary px-2.5 text-[12px] font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="size-3.5" aria-hidden /> Enviar
                </button>
              </div>
            </div>
          </div>
        </footer>
      </section>

      {/* Panel operativo */}
      <aside className="flex w-[336px] shrink-0 flex-col border-l border-border bg-surface">
        <div className="border-b border-border px-3 py-2">
          <h2 className="text-[12px] font-semibold uppercase tracking-wide">Panel operativo</h2>
        </div>
        <div className="min-h-0 flex-1 scroll-y">
          <PanelBlock title="Información del cliente" icon={ClipboardList} defaultOpen>
            <dl className="grid grid-cols-[112px_1fr] gap-x-2 gap-y-1.5 text-[12.5px]">
              <Dt>Cliente</Dt>
              <Dd>{actual.cliente}</Dd>
              <Dt>Sede</Dt>
              <Dd>{actual.local}</Dd>
              <Dt>País</Dt>
              <Dd>{actual.pais}</Dd>
              <Dt>Plan</Dt>
              <Dd>Restaurant Pro</Dd>
              <Dt>Contacto</Dt>
              <Dd>Rosa Delgado</Dd>
              <Dt>Antigüedad</Dt>
              <Dd>3 años 2 meses</Dd>
            </dl>
          </PanelBlock>

          <PanelBlock title="Historial" icon={Activity}>
            <ul className="space-y-1.5 text-[12.5px]">
              {tickets.slice(1, 5).map((t) => (
                <li key={t.id} className="flex items-center gap-2">
                  <span className="num text-[11.5px] text-muted-foreground">{t.id}</span>
                  <span className="min-w-0 flex-1 truncate">{t.asunto}</span>
                  <Badge tone={slaTone[t.sla]}>{t.minutos}m</Badge>
                </li>
              ))}
            </ul>
          </PanelBlock>

          <PanelBlock title="Diagnóstico" icon={Stethoscope} defaultOpen>
            <ul className="space-y-1.5 text-[12.5px]">
              <li><StatusIndicator tone="danger" label="Webhook duplicado en conector delivery" /></li>
              <li><StatusIndicator tone="success" label="Sincronización de carta operativa" /></li>
              <li><StatusIndicator tone="warning" label="Última conciliación hace 26 h" /></li>
            </ul>
          </PanelBlock>

          <PanelBlock title="Herramientas" icon={Wrench}>
            <div className="flex flex-wrap gap-1.5">
              <ToolbarButton>Reenviar webhook</ToolbarButton>
              <ToolbarButton>Forzar sincronización</ToolbarButton>
              <ToolbarButton>Ver logs</ToolbarButton>
              <ToolbarButton>Reset de sesión</ToolbarButton>
            </div>
          </PanelBlock>

          <PanelBlock title="Guías" icon={ClipboardList}>
            <ul className="space-y-1 text-[12.5px] text-primary">
              <li><button type="button" className="hover:underline">Duplicidad de pedidos en delivery</button></li>
              <li><button type="button" className="hover:underline">Validación de conector POS</button></li>
              <li><button type="button" className="hover:underline">Protocolo de escalamiento nivel 2</button></li>
            </ul>
          </PanelBlock>

          <PanelBlock title="Categorización" icon={Tag} defaultOpen>
            <div className="grid gap-1.5 text-[12.5px]">
              <Field label="Categoría" value={actual.categoria} />
              <Field label="Subcategoría" value={actual.subcategoria} />
              <Field label="Motivo" value="Falla técnica" />
            </div>
          </PanelBlock>

          <PanelBlock title="Actividades" icon={Activity}>
            <ol className="space-y-1.5 border-l border-border pl-3 text-[12.5px]">
              <li className="relative"><Dot />14:09 · Diagnóstico ejecutado</li>
              <li className="relative"><Dot />14:05 · Asignado a M. Quispe</li>
              <li className="relative"><Dot />14:02 · Atención creada</li>
            </ol>
          </PanelBlock>

          <PanelBlock title="Resultado" icon={ClipboardList} defaultOpen>
            <div className="grid gap-1.5">
              <Field label="Tipificación" value="Resuelto en primer contacto" />
              <Field label="Requiere seguimiento" value="No" />
              <textarea
                rows={3}
                placeholder="Resumen del cierre…"
                className="w-full resize-none rounded border border-input bg-surface px-2 py-1.5 text-[12.5px] outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring/20"
              />
              <button
                type="button"
                className="inline-flex h-7 items-center justify-center rounded bg-primary px-2.5 text-[12px] font-medium text-primary-foreground hover:bg-primary/90"
              >
                Cerrar atención
              </button>
            </div>
          </PanelBlock>
        </div>
      </aside>
    </div>
  );
}

function Dot() {
  return <span className="absolute -left-[15px] top-1.5 size-1.5 rounded-full bg-border" aria-hidden />;
}

function Dt({ children }: { children: React.ReactNode }) {
  return <dt className="text-muted-foreground">{children}</dt>;
}

function Dd({ children }: { children: React.ReactNode }) {
  return <dd className="truncate font-medium">{children}</dd>;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded border border-border bg-surface-2 px-2 py-1.5">
      <span className="text-[12px] text-muted-foreground">{label}</span>
      <span className="text-[12.5px] font-medium">{value}</span>
    </div>
  );
}

function PanelBlock({
  title,
  icon: Icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultOpen?: boolean | undefined;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-surface-2"
        aria-expanded={open}
      >
        <Icon className="size-3.5 text-muted-foreground" />
        <span className="text-[12px] font-semibold uppercase tracking-wide">{title}</span>
        <ChevronDown className={cn("ml-auto size-3.5 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="px-3 pb-3">{children}</div>}
    </section>
  );
}
