// Datos de muestra del laboratorio COPE. No representan la data real de producción.

export type Canal = "whatsapp" | "correo" | "zendesk" | "telefono";

export const canalLabel: Record<Canal, string> = {
  whatsapp: "WhatsApp",
  correo: "Correo",
  zendesk: "Zendesk",
  telefono: "Teléfono",
};

export const canalColor: Record<Canal, string> = {
  whatsapp: "var(--ch-whatsapp)",
  correo: "var(--ch-correo)",
  zendesk: "var(--ch-zendesk)",
  telefono: "var(--ch-telefono)",
};

export type Prioridad = "alta" | "media" | "baja";
export type EstadoTicket = "abierto" | "en_proceso" | "espera" | "resuelto";

export interface Ticket {
  id: string;
  cliente: string;
  local: string;
  asunto: string;
  canal: Canal;
  estado: EstadoTicket;
  prioridad: Prioridad;
  sla: "cumplido" | "en_riesgo" | "incumplido";
  minutos: number;
  asesor: string;
  categoria: string;
  subcategoria: string;
  pais: string;
  ultimo: string;
  sinLeer: number;
}

const nombres = [
  "La Bodega de la Trattoria",
  "Pardos Chicken Surco",
  "Cevichería El Muelle",
  "Don Belisario Miraflores",
  "Rustica San Isidro",
  "La Lucha Sanguchería",
  "Tanta Larcomar",
  "El Hornero Barranco",
  "Segundo Muelle Jockey",
  "Panchita Miraflores",
  "Osaka Lima",
  "Maido Reservas",
  "Central Delivery",
  "Chifa Titi",
  "La Mar Cebichería",
  "Punto Azul San Miguel",
  "Fiesta Gourmet",
  "Astrid y Gastón",
  "El Charrúa Grill",
  "Barra Chalaca Callao",
];

const asuntos = [
  "No se sincroniza el menú en la carta digital",
  "Pedido duplicado en integración delivery",
  "Solicitud de cambio de horario de atención",
  "Error al emitir comprobante electrónico",
  "Reclamo por cobro duplicado",
  "Capacitación de módulo de reservas",
  "Impresora de comandas no responde",
  "Actualización de precios masiva",
  "Devolución solicitada por el comensal",
  "Acceso bloqueado al panel administrador",
];

const asesores = [
  "M. Quispe",
  "J. Ramírez",
  "L. Fernández",
  "C. Rojas",
  "P. Salazar",
  "A. Huamán",
];

const categorias = [
  ["Integraciones", "Delivery apps"],
  ["Facturación", "Comprobantes"],
  ["Carta digital", "Sincronización"],
  ["Cuenta", "Accesos"],
  ["Hardware", "Impresoras"],
  ["Quejas", "Cobro indebido"],
];

const paises = ["Perú", "Chile", "Colombia", "México", "Ecuador"];
const canales: Canal[] = ["whatsapp", "correo", "zendesk", "telefono"];
const estados: EstadoTicket[] = ["abierto", "en_proceso", "espera", "resuelto"];

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length]!;
}

export const tickets: Ticket[] = Array.from({ length: 48 }, (_, i) => {
  const [categoria, subcategoria] = pick(categorias, i * 3 + 1);
  const minutos = ((i * 37) % 480) + 4;
  return {
    id: `AT-${24810 + i}`,
    cliente: pick(nombres, i * 7),
    local: `Sede ${["Centro", "Norte", "Sur", "Este"][i % 4]}`,
    asunto: pick(asuntos, i * 5 + 2),
    canal: pick(canales, i * 3),
    estado: pick(estados, i * 5),
    prioridad: (["alta", "media", "baja", "media"] as Prioridad[])[i % 4]!,
    sla: minutos > 320 ? "incumplido" : minutos > 180 ? "en_riesgo" : "cumplido",
    minutos,
    asesor: pick(asesores, i * 2),
    categoria: categoria!,
    subcategoria: subcategoria!,
    pais: pick(paises, i * 2 + 1),
    ultimo: `${(i % 12) + 1}:${String((i * 7) % 60).padStart(2, "0")} p. m.`,
    sinLeer: i % 5 === 0 ? (i % 3) + 1 : 0,
  };
});

export interface Mensaje {
  autor: "cliente" | "asesor" | "sistema";
  nombre: string;
  hora: string;
  texto: string;
}

export const conversacion: Mensaje[] = [
  {
    autor: "sistema",
    nombre: "Sistema",
    hora: "14:02",
    texto: "Atención creada desde WhatsApp Business · Cola: Integraciones",
  },
  {
    autor: "cliente",
    nombre: "Rosa Delgado",
    hora: "14:03",
    texto:
      "Buenas tardes, desde ayer los pedidos de delivery se están duplicando en el sistema. Ya nos rechazaron dos pedidos por eso.",
  },
  {
    autor: "asesor",
    nombre: "M. Quispe",
    hora: "14:05",
    texto:
      "Buenas tardes, Rosa. Lamento el inconveniente. Voy a revisar la integración del local. ¿Me confirma si ocurre en todas las sedes o solo en Sede Centro?",
  },
  {
    autor: "cliente",
    nombre: "Rosa Delgado",
    hora: "14:08",
    texto: "Solo en Sede Centro. Las otras dos sedes están trabajando normal.",
  },
  {
    autor: "sistema",
    nombre: "Sistema",
    hora: "14:09",
    texto: "Diagnóstico ejecutado: webhook duplicado detectado en el conector de delivery.",
  },
  {
    autor: "asesor",
    nombre: "M. Quispe",
    hora: "14:12",
    texto:
      "Encontramos un webhook duplicado en el conector. Voy a desactivar el registro repetido y validamos con un pedido de prueba.",
  },
];

export const serieDiaria = [
  { periodo: "Lun", whatsapp: 182, correo: 64, zendesk: 41, telefono: 22 },
  { periodo: "Mar", whatsapp: 205, correo: 71, zendesk: 38, telefono: 26 },
  { periodo: "Mié", whatsapp: 231, correo: 68, zendesk: 44, telefono: 19 },
  { periodo: "Jue", whatsapp: 198, correo: 82, zendesk: 51, telefono: 24 },
  { periodo: "Vie", whatsapp: 264, correo: 90, zendesk: 47, telefono: 31 },
  { periodo: "Sáb", whatsapp: 176, correo: 45, zendesk: 28, telefono: 15 },
  { periodo: "Dom", whatsapp: 121, correo: 33, zendesk: 21, telefono: 11 },
];

export const serieSla = [
  { periodo: "Lun", cumplido: 92, incumplido: 8, trm: 14 },
  { periodo: "Mar", cumplido: 89, incumplido: 11, trm: 16 },
  { periodo: "Mié", cumplido: 94, incumplido: 6, trm: 12 },
  { periodo: "Jue", cumplido: 87, incumplido: 13, trm: 19 },
  { periodo: "Vie", cumplido: 83, incumplido: 17, trm: 23 },
  { periodo: "Sáb", cumplido: 95, incumplido: 5, trm: 11 },
  { periodo: "Dom", cumplido: 96, incumplido: 4, trm: 9 },
];

export const asesoresPerf = [
  { asesor: "M. Quispe", atenciones: 214, trm: 11, tro: 3.2, sla: 96, csat: 4.7, reaperturas: 4 },
  { asesor: "J. Ramírez", atenciones: 198, trm: 14, tro: 4.1, sla: 93, csat: 4.5, reaperturas: 7 },
  { asesor: "L. Fernández", atenciones: 186, trm: 12, tro: 3.6, sla: 95, csat: 4.6, reaperturas: 5 },
  { asesor: "C. Rojas", atenciones: 173, trm: 18, tro: 5.4, sla: 88, csat: 4.2, reaperturas: 12 },
  { asesor: "P. Salazar", atenciones: 164, trm: 16, tro: 4.8, sla: 90, csat: 4.3, reaperturas: 9 },
  { asesor: "A. Huamán", atenciones: 151, trm: 21, tro: 6.2, sla: 84, csat: 4.0, reaperturas: 15 },
];

export const categoriasVol = [
  { categoria: "Integraciones", atenciones: 412, share: 27, trm: 16, sla: 91 },
  { categoria: "Facturación", atenciones: 318, share: 21, trm: 13, sla: 94 },
  { categoria: "Carta digital", atenciones: 254, share: 17, trm: 11, sla: 96 },
  { categoria: "Cuenta", atenciones: 201, share: 13, trm: 9, sla: 97 },
  { categoria: "Hardware", atenciones: 178, share: 12, trm: 24, sla: 82 },
  { categoria: "Quejas", atenciones: 146, share: 10, trm: 29, sla: 76 },
];

export const paisesVol = [
  { pais: "Perú", atenciones: 1042, share: 68, sla: 93, trm: 13 },
  { pais: "Chile", atenciones: 214, share: 14, sla: 89, trm: 17 },
  { pais: "Colombia", atenciones: 142, share: 9, sla: 91, trm: 15 },
  { pais: "México", atenciones: 87, share: 6, sla: 86, trm: 21 },
  { pais: "Ecuador", atenciones: 44, share: 3, sla: 94, trm: 12 },
];

export interface ClienteNodo {
  cliente: string;
  atenciones: number;
  sla: number;
  trm: number;
  categorias: {
    nombre: string;
    atenciones: number;
    share: number;
    trm: number;
    sla: number;
    subcategorias: { nombre: string; atenciones: number; share: number; trm: number; sla: number }[];
  }[];
}

export const clientes: ClienteNodo[] = [
  {
    cliente: "Pardos Chicken",
    atenciones: 148,
    sla: 92,
    trm: 14,
    categorias: [
      {
        nombre: "Integraciones",
        atenciones: 62,
        share: 42,
        trm: 17,
        sla: 89,
        subcategorias: [
          { nombre: "Delivery apps", atenciones: 34, share: 55, trm: 19, sla: 85 },
          { nombre: "POS", atenciones: 18, share: 29, trm: 15, sla: 92 },
          { nombre: "Webhooks", atenciones: 10, share: 16, trm: 13, sla: 95 },
        ],
      },
      {
        nombre: "Facturación",
        atenciones: 41,
        share: 28,
        trm: 12,
        sla: 95,
        subcategorias: [
          { nombre: "Comprobantes", atenciones: 25, share: 61, trm: 11, sla: 96 },
          { nombre: "Notas de crédito", atenciones: 16, share: 39, trm: 14, sla: 93 },
        ],
      },
      {
        nombre: "Hardware",
        atenciones: 45,
        share: 30,
        trm: 22,
        sla: 84,
        subcategorias: [
          { nombre: "Impresoras", atenciones: 29, share: 64, trm: 25, sla: 80 },
          { nombre: "Tablets", atenciones: 16, share: 36, trm: 17, sla: 90 },
        ],
      },
    ],
  },
  {
    cliente: "Tanta",
    atenciones: 96,
    sla: 95,
    trm: 11,
    categorias: [
      {
        nombre: "Carta digital",
        atenciones: 54,
        share: 56,
        trm: 10,
        sla: 97,
        subcategorias: [
          { nombre: "Sincronización", atenciones: 31, share: 57, trm: 9, sla: 98 },
          { nombre: "Precios", atenciones: 23, share: 43, trm: 12, sla: 96 },
        ],
      },
      {
        nombre: "Cuenta",
        atenciones: 42,
        share: 44,
        trm: 12,
        sla: 93,
        subcategorias: [
          { nombre: "Accesos", atenciones: 27, share: 64, trm: 11, sla: 94 },
          { nombre: "Usuarios", atenciones: 15, share: 36, trm: 14, sla: 91 },
        ],
      },
    ],
  },
  {
    cliente: "La Lucha Sanguchería",
    atenciones: 74,
    sla: 88,
    trm: 19,
    categorias: [
      {
        nombre: "Quejas",
        atenciones: 38,
        share: 51,
        trm: 27,
        sla: 78,
        subcategorias: [
          { nombre: "Cobro indebido", atenciones: 22, share: 58, trm: 31, sla: 72 },
          { nombre: "Devoluciones", atenciones: 16, share: 42, trm: 22, sla: 86 },
        ],
      },
      {
        nombre: "Integraciones",
        atenciones: 36,
        share: 49,
        trm: 14,
        sla: 94,
        subcategorias: [
          { nombre: "Delivery apps", atenciones: 21, share: 58, trm: 15, sla: 92 },
          { nombre: "POS", atenciones: 15, share: 42, trm: 12, sla: 96 },
        ],
      },
    ],
  },
  {
    cliente: "Segundo Muelle",
    atenciones: 58,
    sla: 97,
    trm: 9,
    categorias: [
      {
        nombre: "Facturación",
        atenciones: 33,
        share: 57,
        trm: 8,
        sla: 98,
        subcategorias: [
          { nombre: "Comprobantes", atenciones: 20, share: 61, trm: 7, sla: 99 },
          { nombre: "Anulaciones", atenciones: 13, share: 39, trm: 10, sla: 96 },
        ],
      },
      {
        nombre: "Cuenta",
        atenciones: 25,
        share: 43,
        trm: 11,
        sla: 96,
        subcategorias: [{ nombre: "Accesos", atenciones: 25, share: 100, trm: 11, sla: 96 }],
      },
    ],
  },
];

export const quejas = [
  { motivo: "Cobro duplicado", casos: 42, monto: 3820, resueltas: 33, sla: 79, dias: 2.4 },
  { motivo: "Pedido no entregado", casos: 31, monto: 1940, resueltas: 27, sla: 86, dias: 1.8 },
  { motivo: "Producto incorrecto", casos: 24, monto: 1120, resueltas: 21, sla: 88, dias: 1.5 },
  { motivo: "Demora en atención", casos: 19, monto: 0, resueltas: 12, sla: 63, dias: 3.1 },
  { motivo: "Falla de integración", casos: 14, monto: 640, resueltas: 13, sla: 92, dias: 1.2 },
];

export const granularidades = ["Hora", "Día", "Semana", "Mes", "Año"] as const;