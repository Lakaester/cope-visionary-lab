import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Bell,
  ChevronDown,
  Gauge,
  Headset,
  LogOut,
  Menu,
  Search,
  Settings,
  Store,
  X,
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

function useActiveNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
  return { pathname, isActive };
}

function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const { isActive } = useActiveNav();

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black-85/30 lg:hidden"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full w-[72px] shrink-0 flex-col overflow-y-auto border-r border-black-10 bg-sidebar transition-transform duration-200",
          "lg:static lg:h-auto lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-end border-b border-black-10 px-2 lg:hidden">
          <button type="button" onClick={onClose} className="rounded p-1.5 text-black-45 hover:bg-muted">
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <nav className="flex flex-1 flex-col" aria-label="Navegación principal">
          {nav.map((item) => {
            const active = isActive(item.to);
            return (
              <div key={item.to}>
                <Link
                  to={item.to}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex w-full flex-col items-center gap-1 px-1 py-3 text-center transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-black-45 hover:bg-muted hover:text-black-85",
                  )}
                >
                  <item.icon className="size-5" aria-hidden />
                  <span className="text-[10px] font-medium leading-tight">{item.label}</span>
                  {item.badge && !active && (
                    <span className="num absolute right-2 top-2 rounded-full bg-danger px-1.5 text-[9px] font-semibold text-danger-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
                <div className="mx-3 border-b border-black-10" />
              </div>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-black-10">
          <button
            type="button"
            className="flex w-full flex-col items-center gap-1 px-1 py-3 text-center text-black-45 transition-colors hover:bg-danger-soft hover:text-danger"
          >
            <LogOut className="size-5" aria-hidden />
            <span className="text-[10px] font-medium leading-tight">Salir</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { pathname } = useActiveNav();
  const current = nav.find((n) => (n.to === "/" ? pathname === "/" : pathname.startsWith(n.to)));

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center border-b border-black-10 bg-surface">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menú"
        className="flex h-full items-center px-4 text-black-45 transition-colors hover:bg-muted lg:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </button>

      <div className="flex h-full shrink-0 flex-col items-start justify-center gap-0.5 px-4">
        <span className="text-[13px] font-semibold uppercase leading-none tracking-tight text-black-85">
          Restaurant<span className="text-primary">.pe</span>
        </span>
        <span className="text-[9px] font-semibold uppercase leading-none tracking-widest text-primary">
          COPE
        </span>
      </div>

      <div className="h-6 w-px shrink-0 bg-black-10" />

      <div className="hidden min-w-0 items-center px-4 md:flex">
        <span className="truncate text-sm font-semibold text-black-85">{current?.label ?? "COPE"}</span>
      </div>

      <div className="relative ml-auto hidden w-full max-w-xs px-4 lg:block">
        <Search
          className="pointer-events-none absolute left-6 top-1/2 size-3.5 -translate-y-1/2 text-black-45"
          aria-hidden
        />
        <input
          placeholder="Buscar atención, cliente o ticket…"
          aria-label="Búsqueda global"
          className="h-9 w-full rounded border border-border bg-surface pl-7 pr-2 text-[12.5px] text-black-85 outline-none placeholder:text-black-45 focus:border-primary"
        />
      </div>

      <div className="ml-auto flex items-center gap-3 pr-2 lg:ml-0">
        <StatusIndicator
          tone="success"
          label="Operación estable"
          className="hidden text-black-45 xl:inline-flex"
        />
        <button
          type="button"
          aria-label="Notificaciones"
          className="relative grid size-8 place-items-center rounded text-black-45 transition-colors hover:bg-muted hover:text-black-85"
        >
          <Bell className="size-4" aria-hidden />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-danger" />
        </button>

        <div className="h-6 w-px shrink-0 bg-black-10" />

        <button type="button" className="flex h-14 items-center gap-3 px-2 transition-colors hover:bg-muted">
          <div className="hidden text-right leading-tight sm:block">
            <p className="text-xs text-black-45">
              Hola, <span className="font-semibold text-black-85">M. Quispe</span>
            </p>
            <span className="inline-block rounded-sm bg-black-85 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary-foreground">
              Soporte
            </span>
          </div>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
            MQ
          </span>
          <ChevronDown className="size-3.5 shrink-0 text-black-45" aria-hidden />
        </button>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
      <Header onOpenMenu={() => setMobileOpen(true)} />
      <div className="flex min-h-0 flex-1">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-3">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-black-10 bg-surface">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}