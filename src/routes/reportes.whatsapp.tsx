import { createFileRoute } from "@tanstack/react-router";
import { KpiRow, TablePanel } from "@/components/cope/report";
import { ChartCard, VolumeArea, SlaTrend } from "@/components/cope/charts";
import { DataTable, MiniBar, type Column } from "@/components/cope/data-table";
import { serieDiaria, serieSla } from "@/lib/cope-data";

export const Route = createFileRoute("/reportes/whatsapp")({ component: WhatsApp });

const plantillas = [
  { nombre: "Confirmación de recepción", envios: 812, lectura: 94, respuesta: 61 },
  { nombre: "Solicitud de datos del local", envios: 546, lectura: 91, respuesta: 74 },
  { nombre: "Cierre de atención", envios: 498, lectura: 88, respuesta: 32 },
  { nombre: "Encuesta CSAT", envios: 412, lectura: 79, respuesta: 45 },
];

type Row = (typeof plantillas)[number];
const cols: Column<Row>[] = [
  { key: "n", header: "Plantilla", cell: (r) => <span className="font-medium">{r.nombre}</span> },
  { key: "e", header: "Envíos", align: "right", width: "100px", cell: (r) => r.envios },
  { key: "l", header: "Lectura", align: "right", width: "150px", cell: (r) => <MiniBar value={r.lectura} tone="success" /> },
  { key: "r", header: "Respuesta", align: "right", width: "150px", cell: (r) => <MiniBar value={r.respuesta} tone={r.respuesta >= 50 ? "success" : "warning"} /> },
];

function WhatsApp() {
  return (
    <div className="grid gap-3">
      <KpiRow
        items={[
          { label: "Conversaciones", value: "1 377", accent: "success", delta: "+8,1%", deltaTone: "success" },
          { label: "TRM WhatsApp", value: "9", unit: "min", accent: "success", hint: "Meta 10 min" },
          { label: "Fuera de ventana 24 h", value: "63", accent: "warning" },
          { label: "SLA cumplido", value: "94", unit: "%", accent: "success" },
        ]}
      />
      <div className="grid gap-3 xl:grid-cols-2">
        <ChartCard title="Volumen WhatsApp">
          <VolumeArea data={serieDiaria} dataKey="whatsapp" name="WhatsApp" color="var(--ch-whatsapp)" />
        </ChartCard>
        <ChartCard title="SLA y tiempo de respuesta">
          <SlaTrend data={serieSla} />
        </ChartCard>
      </div>
      <TablePanel title="Plantillas utilizadas">
        <DataTable columns={cols} rows={plantillas} getRowId={(r) => r.nombre} />
      </TablePanel>
    </div>
  );
}
