# COPE Refine

Quiero crear un laboratorio de rediseño UX/UI para una plataforma interna existente llamada COPE.

IMPORTANTE:

COPE YA EXISTE.

Este proyecto NO debe intentar reemplazar ni reconstruir el backend de COPE.

Este proyecto será utilizado exclusivamente para explorar y desarrollar mejoras de UX/UI que posteriormente serán implementadas en el proyecto real mediante un IDE.

==================================================

¿QUÉ ES COPE?

==================================================

COPE significa Centro de Operaciones y Performance.

Es una plataforma interna de Restaurant.pe para el equipo de Soporte Especializado.

Tiene dos grandes objetivos:

1. Operar las atenciones de soporte.

2. Analizar el desempeño y la operación mediante reportería.

La plataforma debe sentirse como una herramienta empresarial interna utilizada diariamente por asesores, supervisores, analistas y jefaturas.

No debe parecer una plantilla genérica de dashboard.

==================================================

MÓDULOS

==================================================

La navegación principal actual es:

- Dashboard

- Atenciones

- Clientes

- Reportes

- Conocimiento

- Configuración

Dentro de Reportes existen:

- Resumen

- Operación

- Asesores

- Categorías

- Clientes

- País

- WhatsApp

- Zendesk

- Tendencias

- Quejas y Devoluciones

==================================================

IDENTIDAD VISUAL

==================================================

Restaurant.pe utiliza una identidad visual principalmente basada en:

- azul institucional

- blanco

- grises neutros

- azul para acciones principales

- verde para estados positivos

- naranja para correo, advertencias o información secundaria

- rojo únicamente para errores, incumplimientos o situaciones críticas

La interfaz debe ser SOBRIA.

NO utilizar:

- gradientes excesivos

- glassmorphism

- colores neón

- tarjetas gigantes

- sombras fuertes

- exceso de bordes

- exceso de colores

- diseños tipo startup

- ilustraciones innecesarias

La prioridad es:

1. claridad

2. legibilidad

3. densidad de información

4. consistencia

5. velocidad de uso

6. jerarquía visual

7. accesibilidad

==================================================

PRINCIPIO DE DISEÑO

==================================================

COPE es una herramienta operacional.

Los usuarios pueden pasar muchas horas dentro de la plataforma.

Por lo tanto:

- reducir fatiga visual

- reducir espacios desperdiciados

- mantener información visible

- evitar movimientos innecesarios

- mantener filtros accesibles

- mantener acciones importantes cerca del contexto

- utilizar estados visuales consistentes

==================================================

ATENCIONES

==================================================

La pantalla Atenciones es uno de los módulos principales.

Debe utilizar un workspace de tres columnas:

┌──────────────┬──────────────────────────┬──────────────────┐

│ BANDEJA      │ CONVERSACIÓN             │ PANEL OPERATIVO  │

│              │                          │                  │

│ Buscar       │ Cliente                  │ Información      │

│ Filtros      │ Canal                    │ del cliente      │

│              │                          │                  │

│ Tickets      │ Mensajes                 │ Historial        │

│ Tickets      │                          │ Diagnóstico       │

│ Tickets      │ Responder                │ Herramientas     │

│ Tickets      │                          │ Guías            │

│              │                          │ Categorización   │

│              │                          │ Actividades      │

│              │                          │ Resultado         │

└──────────────┴──────────────────────────┴──────────────────┘

Cada columna debe tener su propio scroll independiente.

La bandeja debe soportar una gran cantidad de tickets.

El buscador y filtros deben permanecer fijos.

La conversación debe tener su propio scroll.

El panel operativo debe tener su propio scroll.

==================================================

REPORTES

==================================================

Los reportes contienen:

- KPIs

- tablas

- gráficos

- filtros

- comparaciones

- tendencias

- drill-down

El diseño debe evitar que cada pestaña parezca una aplicación diferente.

Todos los reportes deben compartir:

- mismos filtros

- misma tipografía

- mismos espacios

- mismos headers

- mismas tarjetas

- misma jerarquía

- misma semántica de colores

==================================================

COLORES SEMÁNTICOS

==================================================

Los colores deben representar significado y no decoración.

Ejemplo:

WhatsApp → verde sobrio

Correo → naranja sobrio

SLA cumplido → verde

SLA incumplido → rojo

Advertencia → naranja

Información → azul

Neutro → gris

No cambiar arbitrariamente el color de un canal dependiendo del gráfico.

==================================================

GRÁFICOS

==================================================

Los gráficos deben ser:

- limpios

- sobrios

- fáciles de interpretar

- con etiquetas legibles

- sin exceso de líneas

- sin efectos decorativos

Priorizar:

- comparación

- tendencia

- volumen

- porcentaje

- distribución

Los gráficos deben mantener consistencia visual entre todas las pestañas.

==================================================

TABLAS

==================================================

Las tablas deben ser densas pero cómodas de leer.

Utilizar:

- headers claros

- alineación numérica

- filas compactas

- hover discreto

- selección clara

- sticky headers cuando corresponda

- scroll interno

- estados visuales

==================================================

CLIENTES

==================================================

La sección Clientes utiliza un explorador:

CLIENTE → CATEGORÍA → SUBCATEGORÍA

Debe ser evidente visualmente qué elemento está seleccionado.

El panel de detalle debe diferenciar claramente:

- volumen

- porcentaje

- tiempos

- SLA

==================================================

PAÍS

==================================================

La sección País debe permitir analizar:

- volumen por país

- evolución

- SLA

- canales

- categorías

Los gráficos deben permitir cambiar granularidad temporal:

- Hora

- Día

- Semana

- Mes

- Año

El selector temporal debe ser compacto y consistente.

==================================================

EXPERIENCIA GENERAL

==================================================

Diseñar componentes reutilizables para:

- PageHeader

- SectionHeader

- KPI Card

- FilterBar

- DataTable

- ChartCard

- EmptyState

- ErrorState

- LoadingState

- Tabs

- Badge

- StatusIndicator

- ScrollContainer

- SidePanel

==================================================

OBJETIVO DEL LABORATORIO

==================================================

NO quiero que construyas una aplicación ficticia desconectada del contexto.

Quiero que desarrolles un sistema visual que pueda servir como referencia para rediseñar el frontend real de COPE.

Primero analiza la arquitectura visual propuesta.

Después crea:

1. Design system

2. Layout principal

3. Sidebar

4. Topbar

5. Dashboard

6. Workspace de Atenciones

7. Reportes

8. Tablas

9. Filtros

10. Estados de carga/error/vacío

Prioriza calidad UX sobre cantidad de funcionalidades.

No inventes funcionalidades de negocio que no hayan sido descritas.

Cuando una decisión no esté definida, prioriza consistencia y simplicidad.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cope-visionary-lab.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/34a4c1e2-9599-44b1-84ab-aab3146d79c1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
