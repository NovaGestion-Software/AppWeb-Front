import { TableNode } from "@/frontend-resourses/components/types";

export interface TablaIngresosType extends TableNode {
    fecha: string;
    contado: string;
    cobranzaCr: string;
    cobranzaPp: string;
    intereses: string;
    cheques: string;
    tarjMer: string;
    tarjFin: string;
    ctacteMer: string;
    ctacteFin: string;
    otros: string;
    ventTotal: string;
};

export const dataTablaIngresos: TablaIngresosType[] = [
  { 
    id: 1, 
    fecha: "2023-01-01",
    contado: "150000.00",
    cobranzaCr: "12000.00",
    cobranzaPp: "45000.00",
    intereses: "800.00",
    cheques: "25000.00",
    tarjMer: "18000.00",
    tarjFin: "12000.00",
    ctacteMer: "30000.00",
    ctacteFin: "15000.00",
    otros: "5000.00",
    ventTotal: "300800.00"
  },
  { 
    id: 2, 
    fecha: "2023-01-02",
    contado: "98000.50",
    cobranzaCr: "5000.00",
    cobranzaPp: "30000.00",
    intereses: "500.00",
    cheques: "18000.00",
    tarjMer: "15000.00",
    tarjFin: "10000.00",
    ctacteMer: "25000.00",
    ctacteFin: "12000.00",
    otros: "3000.00",
    ventTotal: "215500.50"
  },
  { 
    id: 3, 
    fecha: "2023-01-03",
    contado: "125000.00",
    cobranzaCr: "15000.00",
    cobranzaPp: "40000.00",
    intereses: "1200.00",
    cheques: "22000.00",
    tarjMer: "20000.00",
    tarjFin: "15000.00",
    ctacteMer: "35000.00",
    ctacteFin: "18000.00",
    otros: "6000.00",
    ventTotal: "297200.00"
  },
  { 
    id: 4, 
    fecha: "2023-01-04",
    contado: "87000.00",
    cobranzaCr: "3000.00",
    cobranzaPp: "25000.00",
    intereses: "300.00",
    cheques: "15000.00",
    tarjMer: "12000.00",
    tarjFin: "8000.00",
    ctacteMer: "20000.00",
    ctacteFin: "10000.00",
    otros: "2000.00",
    ventTotal: "189300.00"
  },
  { 
    id: 5, 
    fecha: "2023-01-05",
    contado: "67000.75",
    cobranzaCr: "2000.00",
    cobranzaPp: "20000.00",
    intereses: "200.00",
    cheques: "12000.00",
    tarjMer: "10000.00",
    tarjFin: "7000.00",
    ctacteMer: "15000.00",
    ctacteFin: "8000.00",
    otros: "1500.00",
    ventTotal: "146700.75"
  },
];

export const dataIngresosFooter: TablaIngresosType[] = [
{  id:1,
  fecha: String(dataTablaIngresos.length),
    contado: "30.0000",
    cobranzaCr: "30.0000",
    cobranzaPp: "30",
    intereses: "30.000",
    cheques: "30.000",
    tarjFin: "30.000",
    tarjMer: "30.000",
    ctacteMer: "30.000",
    ctacteFin: "30.000",
    otros: "30.000",
    ventTotal: "30.000",

}
]