import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Bell,
  ChevronLeft,
  Gauge,
  Headset,
  Search,
  Settings,
  Store,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusIndicator } from "@/components/cope/primitives";

const nav: { to: string; label: string; icon: LucideIcon; badge?: string }[] = [
  { to: "/", label: "Dashboard", icon: Gauge },
  { to: "/atenciones", label: "Atenciones", icon: Headset, badge: "24" },
  { to: "/clientes", label: "Clientes", icon: Store },
  { to: "/reportes", label: "Reportes", icon: BarChart3 },
  { to: "/conocimiento", label: "Conocimiento", icon: BookOpen },
  { to: "/configuracion", label: "Configuración", icon: Settings },
];

function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-150",
        collapsed ? "w-14" : "w-56",
      )}
    >
      <div className="flex h-12 items-center gap-2 border-b border-sidebar-border px-3">
        <span className="grid size-6 shrink-0 place-items-center rounded bg-sidebar-primary text-[11px] font-bold text-sidebar-primary-foreground">
          C
        </span>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-sidebar-accent-foreground">COPE</p>
            <p className="truncate text-[10.5px] text-sidebar-foreground/70">Restaurant.pe</p>
          </div>
        )}
      </div>

      <nav className="flex-1 scroll-y px-2 py-2">
        {!collapsed && (
          <p className="px-2 pb-1 pt-1 text-[10.5px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Operación
          </p>
        )}
        <ul className="space-y-0.5">
          {nav.map((item) => {
            const active = isActive(item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group flex h-8 items-center gap-2.5 rounded px-2 text-[12.5px] font-medium transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/85 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="size-4 shrink-0" aria-hidden />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span className="num ml-auto rounded bg-sidebar-primary/25 px-1.5 py-0.5 text-[10.5px] text-sidebar-accent-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border px-2 py-2">
        <button
          type="button"
          onClick={onToggle}
          className="flex h-7 w-full items-center gap-2 rounded px-2 text-[12px] text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        >
          <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} aria-hidden />
          {!collapsed && "Contraer"}
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-surface px-4">
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          placeholder="Buscar atención, cliente o ticket…"
          className="h-7 w-full rounded border border-input bg-surface-2 pl-7 pr-2 text-[12.5px] outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-ring/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <StatusIndicator tone="success" label="Operación estable" className="hidden text-muted-foreground md:inline-flex" />
        <span className="hidden text-[12px] text-muted-foreground lg:inline">Turno tarde · 14:00–22:00</span>
        <button
          type="button"
          aria-label="Notificaciones"
          className="relative grid size-7 place-items-center rounded border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Bell className="size-3.5" aria-hidden />
          <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-danger" />
        </button>
        <div className="flex items-center gap-2 border-l border-border pl-3">
          <span className="grid size-7 place-items-center rounded-full bg-info-soft text-[11px] font-semibold text-primary">
            MQ
          </span>
          <div className="hidden leading-tight sm:block">
            <p className="text-[12px] font-medium">M. Quispe</p>
            <p className="text-[11px] text-muted-foreground">Soporte Especializado</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}