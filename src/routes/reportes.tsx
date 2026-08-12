import { useState } from "react";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { PageHeader, ScrollContainer } from "@/components/cope/primitives";
import { FilterBar, SegmentedControl, SelectFilter, ToolbarButton } from "@/components/cope/controls";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reportes")({
  head: () => ({
    meta: [
      { title: "Reportes · COPE" },
      { name: "description", content: "Reportería unificada de operación, asesores, canales y SLA en COPE." },
      { property: "og:title", content: "Reportes · COPE" },
      { property: "og:description", content: "Reportería unificada de operación, asesores, canales y SLA en COPE." },
    ],
  }),
  component: ReportesLayout,
});

const tabs = [
  { to: "/reportes", label: "Resumen", exact: true },
  { to: "/reportes/operacion", label: "Operación" },
  { to: "/reportes/asesores", label: "Asesores" },
  { to: "/reportes/categorias", label: "Categorías" },
  { to: "/reportes/clientes", label: "Clientes" },
  { to: "/reportes/pais", label: "País" },
  { to: "/reportes/whatsapp", label: "WhatsApp" },
  { to: "/reportes/zendesk", label: "Zendesk" },
  { to: "/reportes/tendencias", label: "Tendencias" },
  { to: "/reportes/quejas", label: "Quejas y Devoluciones" },
] as const;

function ReportesLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [rango, setRango] = useState<"7 días" | "30 días" | "Trimestre">("30 días");

  return (
    <>
      <PageHeader
        title="Reportes"
        description="Misma estructura, filtros y semántica de color en todas las pestañas"
        breadcrumb={["COPE", "Reportes"]}
        actions={
          <ToolbarButton>
            <Download className="size-3.5" aria-hidden /> Exportar
          </ToolbarButton>
        }
      >
        <nav className="-mb-px flex gap-0.5 overflow-x-auto" aria-label="Secciones de reportes">
          {tabs.map((t) => {
            const active = t.to === "/reportes" ? pathname === "/reportes" : pathname.startsWith(t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                className={cn(
                  "whitespace-nowrap border-b-2 px-3 py-2 text-[12.5px] font-medium transition-colors",
                  active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                )}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </PageHeader>

      <FilterBar right={<span className="text-[11.5px] text-muted-foreground">Datos de muestra</span>}>
        <SegmentedControl options={["7 días", "30 días", "Trimestre"] as const} value={rango} onChange={setRango} />
        <SelectFilter label="País" value="Todos" onChange={() => {}} options={["Todos", "Perú", "Chile", "Colombia", "México", "Ecuador"]} />
        <SelectFilter label="Canal" value="Todos" onChange={() => {}} options={["Todos", "WhatsApp", "Correo", "Zendesk", "Teléfono"]} />
        <SelectFilter label="Categoría" value="Todas" onChange={() => {}} options={["Todas", "Integraciones", "Facturación", "Carta digital", "Cuenta", "Hardware", "Quejas"]} />
        <SelectFilter label="Asesor" value="Todos" onChange={() => {}} options={["Todos", "M. Quispe", "J. Ramírez", "L. Fernández", "C. Rojas"]} />
      </FilterBar>

      <ScrollContainer className="px-5 py-4">
        <Outlet />
      </ScrollContainer>
    </>
  );
}
