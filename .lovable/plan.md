# FASE 1 — Auditoría del frontend COPE

## 0. Hallazgo crítico previo (leer primero)

Este repositorio **no contiene la aplicación real de COPE**. No existe `frontend/src/`, ni backend, ni Prisma, ni autenticación, ni React Query en uso real. Lo que existe es el **laboratorio visual UX/UI** que se construyó en las iteraciones anteriores de este mismo proyecto: 7.300 líneas, TanStack Start + Tailwind v4 + shadcn, con datos mock en `src/lib/cope-data.ts`.

Consecuencia directa:
- No puedo auditar módulos que aquí no existen (Login, Control de Facturación, Q/D operativo, Usuarios, Roles, Equipos, Permisos, LocalBI, Historia del Cliente, Integraciones, Zendesk, Historial de facturación).
- No puedo "no inventar datos" y a la vez auditar pantallas conectadas: aquí **todo el dato es mock por diseño**.

Para auditar el COPE real necesito que el código real esté en este proyecto (subida del repo o conexión del repositorio de origen). Mientras tanto, la auditoría siguiente aplica al laboratorio existente, que sí es la base visual que luego se traslada al producto.

## 1. Arquitectura actual

```text
src/
  routes/           16 rutas (file-based, TanStack Router)
  components/cope/  primitives, controls, data-table, charts, report
  components/layout/AppShell.tsx  (header 56px + sidebar 72px + main)
  components/ui/    48 componentes shadcn (mayoría sin usar)
  lib/cope-data.ts  373 líneas de datos mock
  styles.css        tokens OKLCH + Montserrat, radius 4px
```

Mapa de rutas: `/`, `/atenciones`, `/clientes`, `/conocimiento`, `/configuracion`, `/reportes` (layout con tabs) + 10 subrutas (`index`, operacion, asesores, categorias, clientes, pais, whatsapp, zendesk, tendencias, quejas).

Sin auth, sin permisos, sin React Query real (el provider existe pero ninguna vista consulta), sin drawers/modales, sin formularios validados, sin paginación, sin ordenamiento.

## 2. Problemas críticos

1. **Ausencia total de capa de datos**: todo importa constantes del módulo mock. No hay loading, error, ni reintento reales; `LoadingState`/`ErrorState` existen pero no se renderizan nunca.
2. **Sin autenticación ni permisos**: el sidebar muestra 6 ítems fijos; no hay filtrado por permiso, ni 401/403 visual, ni Login.
3. **Módulos faltantes respecto al alcance declarado** (ver punto 0): 12 de los 19 módulos no existen aquí.
4. **DataTable sin capacidades operativas**: no ordena, no pagina, no selecciona múltiple, no tiene scroll horizontal controlado ni columnas fijas. Insuficiente para operación intensiva.
5. **Sin sistema de feedback**: `sonner` está instalado pero `<Toaster />` no está montado en `__root.tsx`; no hay confirmaciones para acciones destructivas.

## 3. Problemas importantes

6. Sidebar de 72px con etiquetas de 9,5px: baja legibilidad y sin agrupación por dominio; no escala a 19 módulos.
7. Header: buscador global decorativo (sin handler), notificaciones y menú de usuario sin acción; el botón "Salir" no hace logout.
8. Filtros de Reportes (`onChange={() => {}}`) no filtran nada: son maqueta pura sobre 10 pestañas.
9. Sin breadcrumbs reales: `PageHeader` recibe un array de strings sin enlaces.
10. Accesibilidad: focus visible inconsistente en botones custom, tablas sin `caption`/`scope` completo en filas clicables (fila `onClick` sin rol ni teclado).
11. Responsive: el workspace de Atenciones fija 320px + columnas rígidas; por debajo de ~1280px las tres columnas se comprimen sin degradación definida. La vista actual del usuario (679px) muestra el layout inutilizable.
12. Duplicación: `Badge`, `Card`, `Table`, `Skeleton` existen en `components/ui` y otra vez en `components/cope`. Dos sistemas conviviendo.

## 4. Componentes a reutilizar (base sólida)

`PageHeader`, `SectionHeader`, `Panel`, `KpiCard`, `Badge`/`StatusIndicator` (tonos semánticos), `FilterBar`, `SegmentedControl`, `SelectFilter`, `ToolbarButton`, `ChartCard` + wrappers Recharts, `EmptyState`/`ErrorState`/`LoadingState`/`SkeletonRows`.

## 5. Componentes a refactorizar

- `DataTable` → tabla operativa: `sortable`, `pagination`, `stickyHeader`, `rowActions` (acción principal + menú), selección, densidad, estado de carga integrado.
- `AppShell` → sidebar expandible (72px ↔ 240px) con grupos, header con búsqueda funcional y menú de usuario real.
- `cope-data.ts` → sustituir por una capa `src/lib/api/*` con React Query, para que el laboratorio se conecte al COPE real sin reescribir vistas.
- Unificar `components/cope` sobre primitivas shadcn (una sola fuente de verdad).

## 6. Design System propuesto (consolidación, no cambio de marca)

Mantener OKLCH azul institucional, Montserrat, radius 4px, sin sombras ni gradientes. Añadir:
- escala de spacing y densidad documentada (compacta / cómoda);
- estados de foco unificados (`ring` 2px `--ring`);
- catálogo de badges por dominio: canal, estado, SLA, Q/D;
- patrón Drawer (detalle/edición/historial) y Modal (confirmación/destructivo);
- ruta interna `/configuracion` con sección "Sistema visual" que documente tokens y componentes.

## 7. Navegación propuesta

Sidebar en 3 grupos: **Operación** (Dashboard, Atenciones, Clientes, Q&D, Control de Facturación) · **Análisis** (Reportería, LocalBI) · **Administración** (Conocimiento, Integraciones, Configuración). Ítems filtrados por permiso cuando exista la capa de auth. Breadcrumbs enlazados en `PageHeader`.

## 8. Mejora por módulo (resumen)

| Módulo | Acción principal |
| --- | --- |
| Atenciones | Conservar 3 columnas con scroll independiente; añadir atajos, panel Q/D contextual, degradación a 2 columnas <1280px |
| Clientes | Convertir el explorador en ficha 360° con secciones colapsables en lugar de cards |
| Reportes | Conectar filtros a un estado compartido (URL search params) en las 10 pestañas |
| Dashboard | Reordenar por "qué requiere atención" antes que por volumen |
| Configuración | Arquitectura de secciones (Acceso / Operación / Integraciones / Reportería / Notificaciones / Auditoría) |
| Conocimiento | Formulario por secciones con validación |

## 9. Archivos que modificaría en Fase 2–3

`src/styles.css`, `src/components/layout/AppShell.tsx`, `src/components/cope/{primitives,controls,data-table,charts}.tsx`, `src/routes/__root.tsx` (montar Toaster), y luego rutas por módulo. Sin tocar `routeTree.gen.ts`, `server.ts`, `start.ts`, `router.tsx`.

## 10. Riesgos de regresión

- Refactor de `DataTable`: 8 rutas la consumen; cambio de API rompe columnas.
- Unificar `cope`/`ui`: riesgo de deriva visual si se hace sin inventario previo.
- Sidebar expandible: puede alterar el ancho útil del workspace de Atenciones.
- Filtros con URL params: cambia las URLs de Reportes (rutas se conservan).

## Decisión que necesito

**A)** Traer el repositorio real de COPE a este proyecto y volver a ejecutar la Fase 1 sobre el código verdadero, o
**B)** Continuar evolucionando este laboratorio visual (Fases 2–6) como referencia para luego trasladarlo al producto.
