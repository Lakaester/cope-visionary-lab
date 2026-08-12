import { createFileRoute } from "@tanstack/react-router";
import { KpiRow, TablePanel } from "@/components/cope/report";
import { ChartCard, HorizontalBars } from "@/components/cope/charts";
import { DataTable, MiniBar, type Column } from "@/components/cope/data-table";
import { clientes } from "@/lib/cope-data";

export const Route = createFileRoute("/reportes/clientes")({ component: ClientesReporte });

type Row = (typeof clientes)[number];
const cols: Column<Row>[] = [
  { key: "c", header: "Cliente", cell: (r) => <span className="font-medium">{r.cliente}</span> },
  { key: "a", header: "Atenciones", align: "right", width: "110px", cell: (r) => r.atenciones },
  { key: "cat", header: "Categorías", align: "right", width: "110px", cell: (r) => r.categorias.length },
  { key: "t", header: "TRM", align: "right", width: "90px", cell: (r) => `${r.trm} min` },
  { key: "sla", header: "SLA", align: "right", width: "150px", cell: (r) => <MiniBar value={r.sla} tone={r.sla >= 90 ? "success" : "warning"} /> },
];

function ClientesReporte() {
  return (
    <div className="grid gap-3">
      <KpiRow
        items={[
          { label: "Clientes atendidos", value: "312", accent: "info" },
          { label: "Concentración top 10", value: "38", unit: "%", accent: "neutral" },
          { label: "Clientes con SLA bajo", value: "17", accent: "danger", hint: "< 85% cumplimiento" },
          { label: "Reincidencia", value: "21", unit: "%", accent: "warning", hint: "Mismo motivo en 30 días" },
        ]}
      />
      <ChartCard title="Clientes con mayor volumen">
        <HorizontalBars data={clientes.map((c) => ({ cliente: c.cliente, atenciones: c.atenciones }))} categoryKey="cliente" valueKey="atenciones" name="Atenciones" />
      </ChartCard>
      <TablePanel title="Detalle por cliente" hint="Explorador completo en el módulo Clientes">
        <DataTable columns={cols} rows={clientes} getRowId={(r) => r.cliente} />
      </TablePanel>
    </div>
  );
}
