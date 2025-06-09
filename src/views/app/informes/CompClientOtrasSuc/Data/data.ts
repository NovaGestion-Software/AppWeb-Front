import { TableNode } from "@table-library/react-table-library/types/table";

interface ComprasClientesData extends TableNode {
  cuenta: string;
  nombre: string;
  localidad: string;
  ultCSuc: string;
  opera: string;
  importe: number;
  ultCOtr: string;
  opera2: string;
  importe2: number;
}

export const comprasClientesData: Array<ComprasClientesData> = [
  {
    id: 1,
    cuenta: "C001-456789",
    nombre: "Juan Pérez",
    localidad: "Buenos Aires",
    ultCSuc: "2023-05-15",
    opera: "Depósito",
    importe: 12500.5,
    ultCOtr: "2023-06-10",
    opera2: "Transferencia",
    importe2: 7800.0,
  },
  {
    id: 2,
    cuenta: "C002-123456",
    nombre: "María González",
    localidad: "Córdoba",
    ultCSuc: "2023-06-20",
    opera: "Pago servicio",
    importe: 3200.75,
    ultCOtr: "2023-07-05",
    opera2: "Retiro",
    importe2: 1500.0,
  },
  {
    id: 3,
    cuenta: "C003-789012",
    nombre: "Carlos López",
    localidad: "Rosario",
    ultCSuc: "2023-07-12",
    opera: "Depósito",
    importe: 8900.0,
    ultCOtr: "2023-08-01",
    opera2: "Pago tarjeta",
    importe2: 4500.5,
  },
  {
    id: 4,
    cuenta: "C004-345678",
    nombre: "Ana Martínez",
    localidad: "Mendoza",
    ultCSuc: "2023-08-15",
    opera: "Transferencia",
    importe: 15600.25,
    ultCOtr: "2023-09-10",
    opera2: "Depósito",
    importe2: 6200.75,
  },
  {
    id: 5,
    cuenta: "C005-901234",
    nombre: "Luis Rodríguez",
    localidad: "Tucumán",
    ultCSuc: "2023-09-05",
    opera: "Retiro",
    importe: 5000.0,
    ultCOtr: "2023-10-12",
    opera2: "Pago servicio",
    importe2: 3200.0,
  },

];

export const comprasClientesDataFooter: Array<ComprasClientesData> = [
  {
    id: 6,
    cuenta: "5",
    nombre: "",
    localidad: "",
    ultCSuc: "",
    opera: "5",
    importe: 5000.0,
    ultCOtr: "",
    opera2: "8",
    importe2: 3200.0,
  },
];