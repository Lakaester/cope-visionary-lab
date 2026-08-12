import { useEffect, useRef, useState, cloneElement, type ReactNode, type ReactElement } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./primitives";

export const axisProps = {
  tick: { fontSize: 11, fill: "var(--muted-foreground)" },
  tickLine: false,
  axisLine: { stroke: "var(--border)" },
} as const;

const tooltipStyle = {
  contentStyle: {
    borderRadius: 6,
    border: "1px solid var(--border)",
    background: "var(--surface)",
    fontSize: 12,
    boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
  },
  labelStyle: { fontSize: 11, color: "var(--muted-foreground)" },
} as const;

function AutoSize({ children }: { children: ReactElement<{ width?: number; height?: number }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="size-full">
      {size.width > 0 && size.height > 0
        ? cloneElement(children, { width: size.width, height: size.height })
        : null}
    </div>
  );
}

export function ChartCard({
  title,
  hint,
  actions,
  height = 220,
  children,
  className,
}: {
  title: string;
  hint?: string | undefined;
  actions?: ReactNode | undefined;
  height?: number | undefined;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <section className={cn("rounded-md border border-border bg-surface", className)}>
      <SectionHeader title={title} hint={hint} actions={actions} />
      <div className="px-2 py-3" style={{ height }}>
        <AutoSize>{children as ReactElement<{ width?: number; height?: number }>}</AutoSize>
      </div>
    </section>
  );
}

const legendProps = {
  wrapperStyle: { fontSize: 11, paddingTop: 4 },
  iconType: "square" as const,
  iconSize: 8,
};

export function ChannelStack({
  data,
}: {
  data: { periodo: string; whatsapp: number; correo: number; zendesk: number; telefono: number }[];
}) {
  return (
    <BarChart data={data} margin={{ top: 4, right: 8, left: -14, bottom: 0 }} barSize={22}>
      <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="2 3" />
      <XAxis dataKey="periodo" {...axisProps} />
      <YAxis {...axisProps} width={44} />
      <Tooltip cursor={{ fill: "var(--surface-2)" }} {...tooltipStyle} />
      <Legend {...legendProps} />
      <Bar dataKey="whatsapp" name="WhatsApp" stackId="c" fill="var(--ch-whatsapp)" />
      <Bar dataKey="correo" name="Correo" stackId="c" fill="var(--ch-correo)" />
      <Bar dataKey="zendesk" name="Zendesk" stackId="c" fill="var(--ch-zendesk)" />
      <Bar dataKey="telefono" name="Teléfono" stackId="c" fill="var(--ch-telefono)" radius={[2, 2, 0, 0]} />
    </BarChart>
  );
}

export function SlaTrend({ data }: { data: { periodo: string; cumplido: number; trm: number }[] }) {
  return (
    <LineChart data={data} margin={{ top: 6, right: 12, left: -14, bottom: 0 }}>
      <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="2 3" />
      <XAxis dataKey="periodo" {...axisProps} />
      <YAxis {...axisProps} width={44} domain={[60, 100]} />
      <Tooltip {...tooltipStyle} />
      <Legend {...legendProps} />
      <Line
        type="monotone"
        dataKey="cumplido"
        name="SLA cumplido (%)"
        stroke="var(--success)"
        strokeWidth={2}
        dot={{ r: 2.5 }}
      />
      <Line
        type="monotone"
        dataKey="trm"
        name="TRM (min)"
        stroke="var(--info)"
        strokeWidth={2}
        dot={{ r: 2.5 }}
      />
    </LineChart>
  );
}

export function VolumeArea({
  data,
  dataKey = "whatsapp",
  name = "Atenciones",
  color = "var(--info)",
}: {
  data: Record<string, unknown>[];
  dataKey?: string | undefined;
  name?: string | undefined;
  color?: string | undefined;
}) {
  return (
    <AreaChart data={data} margin={{ top: 6, right: 12, left: -14, bottom: 0 }}>
      <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="2 3" />
      <XAxis dataKey="periodo" {...axisProps} />
      <YAxis {...axisProps} width={44} />
      <Tooltip {...tooltipStyle} />
      <Area
        type="monotone"
        dataKey={dataKey}
        name={name}
        stroke={color}
        fill={color}
        fillOpacity={0.12}
        strokeWidth={2}
      />
    </AreaChart>
  );
}

export function HorizontalBars({
  data,
  categoryKey,
  valueKey,
  name,
  color = "var(--info)",
}: {
  data: Record<string, unknown>[];
  categoryKey: string;
  valueKey: string;
  name: string;
  color?: string | undefined;
}) {
  return (
    <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }} barSize={14}>
      <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="2 3" />
      <XAxis type="number" {...axisProps} />
      <YAxis type="category" dataKey={categoryKey} width={110} {...axisProps} />
      <Tooltip cursor={{ fill: "var(--surface-2)" }} {...tooltipStyle} />
      <Bar dataKey={valueKey} name={name} fill={color} radius={[0, 2, 2, 0]} />
    </BarChart>
  );
}

export function DistributionPie({
  data,
  nameKey,
  valueKey,
  colors,
}: {
  data: Record<string, unknown>[];
  nameKey: string;
  valueKey: string;
  colors: string[];
}) {
  return (
    <PieChart>
      <Tooltip {...tooltipStyle} />
      <Legend {...legendProps} />
      <Pie
        data={data}
        dataKey={valueKey}
        nameKey={nameKey}
        innerRadius="52%"
        outerRadius="78%"
        paddingAngle={1}
        stroke="var(--surface)"
      >
        {data.map((_, i) => (
          <Cell key={i} fill={colors[i % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}