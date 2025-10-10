// /Proovedores/Data/_mock/db.ts
export type CondTrib = "RI" | "MONO" | "EXE" | "CF" | "NR" ;
export type TipoDoc = "CUIT" | "CUIL" | "DNI";

export interface RegistroProveedor {
  // Identificación
  codigo: string;
  nombre: string;                // → razonSocial en la store
  nombreFantasia?: string;

  // Datos comerciales
  inhabilitado?: boolean;
  fechaAlta?: string | null;
  telefono1?: string;
  telefono2?: string;
  fax1?: string;
  domicilio: string;
  entreCalles?: string;          // si viene un solo string
  entreCalles1?: string;         // si viene separado
  entreCalles2?: string;
  localidad: string;
  provincia: string;             // "BA" | "CABA" | "SF" | "CB" ...
  cp: string;
  email?: string;
  lat?: string;
  lng?: string;

  // Impositivos
  condTrib: CondTrib | string;
  tipoDoc?: TipoDoc | string;
  cuit: string;
  ingBrutos: string;
  retenciones: Array<{
    id?: string;
    tipo?: string;
    regimen?: string;
    exento?: boolean;
    certificado?: string;
    vigenciaDesde?: string;
    vigenciaHasta?: string;
  }>;

  // Forma de pago (opcional)
  categoria?: "A" | "B" | "C" | "" | string;
  formaHabitual?: string;
  frecuenciaVisitasDias?: number;
  demoraEntregasDias?: number;
  plazoPagoDias?: number;
  facturacionPesos?: boolean;
  facturacionDolares?: boolean;
  observaciones?: string;
}

export const MOCK_DB: Record<string, RegistroProveedor> = {
  "20304050": {
    codigo: "20304050",
    nombre: "Tecno Gamma",
    nombreFantasia: "TGamma",
    domicilio: "San Martín 50",
    entreCalles: "Sarmiento y Belgrano",
    localidad: "Córdoba",
    provincia: "CB",
    cp: "5000",
    email: "contacto@gamma.com",
    telefono1: "351-444-0000",
    lat: "-31.4201",
    lng: "-64.1888",
    condTrib: "CF",
    tipoDoc: "CUIT",
    cuit: "20-30405060-7",
    ingBrutos: "",
    retenciones: [
      {
        id: "r-iva-1",
        tipo: "IVA",
        regimen: "R-123",
        exento: false,
        certificado: "",
        vigenciaDesde: "2025-01-01",
        vigenciaHasta: "2025-12-31",
      },
    ],
    categoria: "A",
    formaHabitual: "TRANSFERENCIA",
    frecuenciaVisitasDias: 30,
    demoraEntregasDias: 3,
    plazoPagoDias: 15,
    facturacionPesos: true,
    facturacionDolares: false,
    observaciones: "Entrega en depósito lateral",
  },

  "P-0001": {
    codigo: "P-0001",
    nombre: "Proveedor Alfa S.A.",
    nombreFantasia: "Alfa Insumos",
    domicilio: "Av. Siempre Viva 123",
    entreCalles1: "Perú",
    entreCalles2: "México",
    localidad: "CABA",
    provincia: "CABA",
    cp: "1000",
    email: "ventas@alfa.com",
    telefono1: "11-5555-1111",
    telefono2: "11-5555-2222",
    fax1: "11-5555-3333",
    inhabilitado: false,
    fechaAlta: "2024-03-10",
    condTrib: "RI",
    tipoDoc: "CUIT",
    cuit: "30-12345678-9",
    ingBrutos: "901-123456-7",
    retenciones: [
      {
        id: "r-iva-2",
        tipo: "IVA",
        regimen: "R-555",
        exento: false,
        certificado: "",
        vigenciaDesde: "2025-02-01",
        vigenciaHasta: "2025-12-31",
      },
      {
        id: "r-gcias-1",
        tipo: "GCIAS",
        regimen: "G-201",
        exento: true,
        certificado: "CE-7890",
        vigenciaDesde: "2025-01-15",
        vigenciaHasta: "2025-06-30",
      },
    ],
    categoria: "B",
    formaHabitual: "CHEQUE",
    frecuenciaVisitasDias: 14,
    demoraEntregasDias: 2,
    plazoPagoDias: 7,
    facturacionPesos: true,
    facturacionDolares: true,
    observaciones: "",
  },

  "P-0002": {
    codigo: "P-0002",
    nombre: "Insumos Beta SRL",
    domicilio: "Belgrano 450",
    localidad: "Rosario",
    provincia: "SF",
    cp: "2000",
    condTrib: "MONO",
    tipoDoc: "CUIT",
    cuit: "27-22222222-2",
    ingBrutos: "903-222222-2",
    retenciones: [],
    formaHabitual: "EFECTIVO",
    frecuenciaVisitasDias: 0,
    demoraEntregasDias: 0,
    plazoPagoDias: 0,
    facturacionPesos: true,
    facturacionDolares: false,
  },

  // EXTRA 1
  "30506070": {
    codigo: "30506070",
    nombre: "Servicios Delta S.A.",
    nombreFantasia: "Delta",
    domicilio: "Bv. Illia 980",
    localidad: "Córdoba",
    provincia: "CB",
    cp: "5000",
    email: "admin@delta.com",
    condTrib: "RI",
    tipoDoc: "CUIT",
    cuit: "30-50607080-9",
    ingBrutos: "905-506070-1",
    retenciones: [
      {
        id: "r-iva-3",
        tipo: "IVA",
        regimen: "R-321",
        exento: false,
        certificado: "",
        vigenciaDesde: "2025-03-01",
        vigenciaHasta: "2025-12-31",
      },
    ],
    categoria: "C",
    formaHabitual: "TRANSFERENCIA",
    plazoPagoDias: 10,
    facturacionPesos: true,
    facturacionDolares: false,
  },

  // EXTRA 2
  "P-0003": {
    codigo: "P-0003",
    nombre: "Logística Epsilon SRL",
    domicilio: "Ruta 9 Km 15",
    localidad: "Zárate",
    provincia: "BA",
    cp: "2800",
    condTrib: "NR",
    tipoDoc: "CUIT",
    cuit: "30-66666666-6",
    ingBrutos: "",
    retenciones: [
      {
        id: "r-iibb-1",
        tipo: "IIBB",
        regimen: "I-100",
        exento: false,
        certificado: "",
        vigenciaDesde: "2025-01-01",
        vigenciaHasta: "2025-12-31",
      },
    ],
    formaHabitual: "TRANSFERENCIA",
    facturacionPesos: true,
    facturacionDolares: false,
  },

  // EXTRA 3
  "P-0004": {
    codigo: "P-0004",
    nombre: "Electro Zeta",
    nombreFantasia: "ZetaElectro",
    domicilio: "Mitre 1200",
    localidad: "Mendoza",
    provincia: "MZ",
    cp: "5500",
    email: "ventas@zeta.com",
    condTrib: "EXE",
    tipoDoc: "CUIT",
    cuit: "30-77777777-7",
    ingBrutos: "",
    retenciones: [
      {
        id: "r-iva-4",
        tipo: "IVA",
        regimen: "R-999",
        exento: true,
        certificado: "EX-2025-0001",
        vigenciaDesde: "2025-01-01",
        vigenciaHasta: "2025-12-31",
      },
    ],
    categoria: "A",
    formaHabitual: "TARJETA",
    plazoPagoDias: 30,
    facturacionPesos: true,
    facturacionDolares: true,
  },
};
