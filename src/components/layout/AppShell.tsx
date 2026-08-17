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
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Store,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchInput } from "@/components/cope/controls";
import { StatusIndicator } from "@/components/cope/primitives";

type NavItem = { to: string; label: string; icon: LucideIcon; badge?: string };

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Operación",
    items: [
      { to: "/", label: "Dashboard", icon: Gauge },
      { to: "/atenciones", label: "Atenciones", icon: Headset, badge: "24" },
      { to: "/clientes", label: "Clientes", icon: Store },
    ],
  },
  {
    label: "Análisis",
    items: [{ to: "/reportes", label: "Reportes", icon: BarChart3 }],
  },
  {
    label: "Administración",
    items: [
      { to: "/conocimiento", label: "Conocimiento", icon: BookOpen },
      { to: "/configuracion", label: "Configuración", icon: Settings },
    ],
  },
];

const allItems = navGroups.flatMap((g) => g.items);

function useActiveNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
  return { pathname, isActive };
}

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-surface";

function Sidebar({
  expanded,
  mobileOpen,
  onClose,
}: {
  expanded: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}) {
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
          "fixed inset-y-0 left-0 z-50 flex h-full shrink-0 flex-col overflow-y-auto border-r border-black-10 bg-sidebar transition-[transform,width] duration-200",
          "lg:static lg:h-auto lg:translate-x-0",
          expanded ? "w-[220px]" : "w-[72px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-end border-b border-black-10 px-2 lg:hidden">
          <button
            type="button"
            onClick={onClose}
            className={cn("rounded p-1.5 text-black-45 hover:bg-muted", focusRing)}
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <nav className="flex flex-1 flex-col py-1" aria-label="Navegación principal">
          {navGroups.map((group) => (
            <div key={group.label} className="pb-1">
              {expanded ? (
                <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-black-45">
                  {group.label}
                </p>
              ) : (
                <div className="mx-3 my-1.5 border-b border-black-10" aria-hidden />
              )}
              {group.items.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    title={expanded ? undefined : item.label}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center transition-colors",
                      focusRing,
                      expanded
                        ? "mx-2 gap-2.5 rounded px-2.5 py-2 text-[12.5px] font-medium"
                        : "flex-col gap-1 px-1 py-3 text-center",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-black-45 hover:bg-muted hover:text-black-85",
                    )}
                  >
                    <item.icon className="size-[18px] shrink-0" aria-hidden />
                    <span
                      className={cn(
                        expanded
                          ? "min-w-0 flex-1 truncate"
                          : "w-full break-words px-0.5 text-[9.5px] font-medium leading-[1.15]",
                      )}
                    >
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={cn(
                          "num rounded-full px-1.5 text-[9px] font-semibold leading-[15px]",
                          active
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-danger text-danger-foreground",
                          expanded ? "shrink-0" : "absolute right-2 top-2",
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-black-10">
          <button
            type="button"
            className={cn(
              "flex w-full items-center text-black-45 transition-colors hover:bg-danger-soft hover:text-danger",
              focusRing,
              expanded ? "gap-2.5 px-4 py-2.5 text-[12.5px] font-medium" : "flex-col gap-1 px-1 py-3 text-center",
            )}
          >
            <LogOut className="size-[18px] shrink-0" aria-hidden />
            <span className={expanded ? "" : "text-[10px] font-medium leading-tight"}>Salir</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function Header({
  onOpenMenu,
  expanded,
  onToggleSidebar,
}: {
  onOpenMenu: () => void;
  expanded: boolean;
  onToggleSidebar: () => void;
}) {
  const { pathname } = useActiveNav();
  const [query, setQuery] = useState("");
  const current = allItems.find((n) => (n.to === "/" ? pathname === "/" : pathname.startsWith(n.to)));

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center border-b border-black-10 bg-surface">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menú"
        className={cn("flex h-full items-center px-4 text-black-45 transition-colors hover:bg-muted lg:hidden", focusRing)}
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

      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={expanded ? "Contraer navegación" : "Expandir navegación"}
        aria-expanded={expanded}
        className={cn(
          "hidden size-8 place-items-center rounded text-black-45 transition-colors hover:bg-muted hover:text-black-85 lg:grid",
          focusRing,
        )}
      >
        {expanded ? <PanelLeftClose className="size-4" aria-hidden /> : <PanelLeftOpen className="size-4" aria-hidden />}
      </button>

      <div className="mx-3 h-6 w-px shrink-0 bg-black-10" />

      <div className="hidden min-w-0 items-center md:flex">
        <span className="truncate text-sm font-semibold text-black-85">{current?.label ?? "COPE"}</span>
      </div>

      <div className="ml-auto hidden w-full max-w-xs px-4 lg:block">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Buscar atención, cliente o ticket…"
          className="[&_input]:h-9"
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
          className={cn(
            "relative grid size-8 place-items-center rounded text-black-45 transition-colors hover:bg-muted hover:text-black-85",
            focusRing,
          )}
        >
          <Bell className="size-4" aria-hidden />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-danger" />
        </button>

        <div className="h-6 w-px shrink-0 bg-black-10" />

        <button
          type="button"
          className={cn("flex h-14 items-center gap-3 px-2 transition-colors hover:bg-muted", focusRing)}
        >
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
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
      <Header
        onOpenMenu={() => setMobileOpen(true)}
        expanded={expanded}
        onToggleSidebar={() => setExpanded((v) => !v)}
      />
      <div className="flex min-h-0 flex-1">
        <Sidebar expanded={expanded} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-3">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-black-10 bg-surface">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
