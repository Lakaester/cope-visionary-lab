import { createFileRoute } from "@tanstack/react-router";
import { KpiRow, TablePanel } from "@/components/cope/report";
import { ChartCard, ChannelStack, VolumeArea } from "@/components/cope/charts";
import { DataTable, MiniBar, type Column } from "@/components/cope/data-table";
import { Badge } from "@/components/cope/primitives";
import { canalLabel, serieDiaria, tickets, type Ticket } from "@/lib/cope-data";

export const Route = createFileRoute("/reportes/operacion")({ component: Operacion });

const cols: Column<Ticket>[] = [
  { key: "id", header: "Ticket", width: "92px", cell: (r) => <span className="num">{r.id}</span> },
  { key: "cliente", header: "Cliente", cell: (r) => <span className="font-medium">{r.cliente}</span> },
  { key: "canal", header: "Canal", width: "104px", cell: (r) => <Badge tone={r.canal === "whatsapp" ? "success" : r.canal === "correo" ? "warning" : "info"}>{canalLabel[r.canal]}</Badge> },
  { key: "cat", header: "Categoría", width: "140px", cell: (r) => r.categoria },
  { key: "asesor", header: "Asesor", width: "116px", cell: (r) => r.asesor },
  { key: "min", header: "Duración", align: "right", width: "96px", cell: (r) => `${r.minutos} min` },
  { key: "sla", header: "SLA", align: "right", width: "116px", cell: (r) => <Badge tone={r.sla === "cumplido" ? "success" : r.sla === "en_riesgo" ? "warning" : "danger"}>{r.sla === "cumplido" ? "Cumplido" : r.sla === "en_riesgo" ? "En riesgo" : "Incumplido"}</Badge> },
];

function Operacion() {
  return (
    <div className="grid gap-3">
      <KpiRow
        items={[
          { label: "Atenciones cerradas", value: "1 402", accent: "info", delta: "+4,1%", deltaTone: "info" },
          { label: "Backlog", value: "127", accent: "warning", delta: "24 en riesgo", deltaTone: "warning" },
          { label: "TMO", value: "18", unit: "min", accent: "neutral" },
          { label: "Resolución 1er contacto", value: "72", unit: "%", accent: "success", delta: "+2,6 pp", deltaTone: "success" },
        ]}
      />
      <div className="grid gap-3 xl:grid-cols-2">
        <ChartCard title="Carga por canal" hint="Últimos 7 días">
          <ChannelStack data={serieDiaria} />
        </ChartCard>
        <ChartCard title="Evolución de atenciones WhatsApp">
          <VolumeArea data={serieDiaria} dataKey="whatsapp" name="WhatsApp" color="var(--ch-whatsapp)" />
        </ChartCard>
      </div>
      <TablePanel title="Detalle operativo" hint={`${tickets.length} registros`}>
        <DataTable columns={cols} rows={tickets.slice(0, 24)} getRowId={(r) => r.id} maxHeight="380px" />
      </TablePanel>
      <TablePanel title="Cumplimiento por cola">
        <div className="grid gap-2 p-3 sm:grid-cols-2 xl:grid-cols-3">
          {["Integraciones", "Facturación", "Carta digital", "Cuenta", "Hardware", "Quejas"].map((c, i) => (
            <div key={c} className="flex items-center gap-3 rounded border border-border px-3 py-2 text-[12.5px]">
              <span className="min-w-0 flex-1 truncate font-medium">{c}</span>
              <MiniBar value={[91, 94, 96, 97, 82, 76][i]!} tone={[91, 94, 96, 97, 82, 76][i]! >= 90 ? "success" : [91, 94, 96, 97, 82, 76][i]! >= 80 ? "warning" : "danger"} />
            </div>
          ))}
        </div>
      </TablePanel>
    </div>
  );
}
