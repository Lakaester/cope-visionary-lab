import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  Gauge,
  Headset,
  LogOut,
  Menu,
  Settings,
  Store,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: LucideIcon; badge?: string };

const navItems: NavItem[] = [
  { to: "/atenciones", label: "Atenciones", icon: Headset, badge: "24" },
  { to: "/clientes", label: "Clientes", icon: Store },
  { to: "/reportes", label: "Reportes", icon: BarChart3 },
  { to: "/", label: "Dashboard", icon: Gauge },
  { to: "/conocimiento", label: "Conocimiento", icon: BookOpen },
  { to: "/configuracion", label: "Configuración", icon: Settings },
];

function useActiveNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
  return { pathname, isActive };
}

const focusRing = "outline-none focus-visible:bg-light";

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
          "fixed inset-y-0 left-0 z-50 flex h-full w-[72px] shrink-0 flex-col overflow-y-auto border-r border-black-10 bg-white transition-transform duration-200",
          "lg:static lg:h-auto lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-end border-b border-black-10 px-2 lg:hidden">
          <button
            type="button"
            onClick={onClose}
            className={cn("rounded p-1.5 text-black-45 hover:bg-light", focusRing)}
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <nav className="flex flex-1 flex-col py-1" aria-label="Navegación principal">
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <div key={item.to}>
                <Link
                  to={item.to}
                  onClick={onClose}
                  title={item.label}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex w-full flex-col items-center gap-1 px-1 py-3 text-center transition-colors",
                    focusRing,
                    active ? "bg-primary text-white" : "text-black-45 hover:bg-light hover:text-black-85",
                  )}
                >
                  <item.icon className="size-5 shrink-0" aria-hidden />
                  <span className="w-full break-words px-0.5 text-[10px] font-medium leading-tight">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      className={cn(
                        "num absolute right-1.5 top-1.5 rounded-full px-1.5 text-[9px] font-medium leading-[15px]",
                        active ? "bg-white/20 text-white" : "bg-danger-5 text-danger",
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
                <div className="mx-3 border-b border-black-10" aria-hidden />
              </div>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-black-10">
          <button
            type="button"
            className={cn(
              "flex w-full flex-col items-center gap-1 px-1 py-3 text-center text-black-45 transition-colors hover:bg-danger-5 hover:text-danger",
              focusRing,
            )}
          >
            <LogOut className="size-5 shrink-0" aria-hidden />
            <span className="text-[10px] font-medium leading-tight">Salir</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { pathname } = useActiveNav();
  const current = navItems.find((n) => (n.to === "/" ? pathname === "/" : pathname.startsWith(n.to)));

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center border-b border-black-10 bg-white">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menú"
        className={cn("flex h-full items-center px-4 text-black-45 transition-colors hover:bg-light lg:hidden", focusRing)}
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

      <div className="flex min-w-0 flex-1 items-center px-4">
        <span className="truncate text-sm font-semibold text-black-85">{current?.label ?? "COPE"}</span>
      </div>

      <div className="h-6 w-px shrink-0 bg-black-10" />

      <button
        type="button"
        className={cn("flex h-full items-center gap-3 px-4 transition-colors hover:bg-light", focusRing)}
      >
        <div className="hidden text-right leading-tight sm:block">
          <p className="text-xs text-black-45">
            Hola, <span className="font-semibold text-black-85">M. Quispe</span>
          </p>
          <span className="inline-block rounded-sm bg-black-85 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
            Soporte
          </span>
        </div>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-semibold text-white">
          MQ
        </span>
        <ChevronDown className="size-3.5 shrink-0 text-black-45" aria-hidden />
      </button>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-light text-black-85">
      <Header onOpenMenu={() => setMobileOpen(true)} />
      <div className="flex min-h-0 flex-1">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-4">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg bg-white">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
