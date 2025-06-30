import { TableNode } from "@/frontend-resourses/components/types";

export interface tablaLocalidadType extends TableNode {
    localidad: string;
    importe: string;
    mora: string;
    cantidad: string;
    moraPorcentaje: string;
}

export interface tablaCategoriaType extends TableNode {
    categoria: string;
    importe: string;
    mora: string;
    cantidad: string;
    moraPorcentaje: string;
}


export const dataTablaLocalidad: tablaLocalidadType[] = [
  { id: 1, localidad: "Buenos Aires", importe: "150000.00", mora: "12000.00", cantidad: "45", moraPorcentaje: "8.00" },
  { id: 2, localidad: "Córdoba", importe: "98000.50", mora: "5000.00", cantidad: "30", moraPorcentaje: "5.10" },
  { id: 3, localidad: "Rosario", importe: "125000.00", mora: "15000.00", cantidad: "40", moraPorcentaje: "12.00" },
  { id: 4, localidad: "Mendoza", importe: "87000.00", mora: "3000.00", cantidad: "25", moraPorcentaje: "3.45" },
  { id: 5, localidad: "La Plata", importe: "67000.75", mora: "2000.00", cantidad: "20", moraPorcentaje: "2.98" },
  { id: 6, localidad: "Mar del Plata", importe: "54000.25", mora: "1800.00", cantidad: "18", moraPorcentaje: "3.33" },
  { id: 7, localidad: "Salta", importe: "43000.00", mora: "2100.00", cantidad: "22", moraPorcentaje: "4.88" },
  { id: 8, localidad: "San Juan", importe: "39000.00", mora: "1600.00", cantidad: "15", moraPorcentaje: "4.10" },
  { id: 9, localidad: "Neuquén", importe: "80000.00", mora: "7000.00", cantidad: "35", moraPorcentaje: "8.75" },
  { id: 10, localidad: "Tucumán", importe: "92000.00", mora: "3600.00", cantidad: "28", moraPorcentaje: "3.91" },
  { id: 11, localidad: "Resistencia", importe: "61000.00", mora: "2200.00", cantidad: "19", moraPorcentaje: "3.61" },
  { id: 12, localidad: "Santa Fe", importe: "72000.00", mora: "4100.00", cantidad: "26", moraPorcentaje: "5.69" },
  { id: 13, localidad: "Formosa", importe: "31000.00", mora: "1100.00", cantidad: "10", moraPorcentaje: "3.55" },
  { id: 14, localidad: "Posadas", importe: "48000.00", mora: "1900.00", cantidad: "16", moraPorcentaje: "3.96" },
  { id: 15, localidad: "San Luis", importe: "36000.00", mora: "800.00", cantidad: "12", moraPorcentaje: "2.22" },
];

export const dataTablaCategoria: tablaCategoriaType[] = [
  { id: 1, categoria: "Comercio", importe: "110000.00", mora: "9500.00", cantidad: "38", moraPorcentaje: "8.64" },
  { id: 2, categoria: "Servicios", importe: "98000.00", mora: "7000.00", cantidad: "32", moraPorcentaje: "7.14" },
  { id: 3, categoria: "Industria", importe: "145000.00", mora: "11500.00", cantidad: "44", moraPorcentaje: "7.93" },
  { id: 4, categoria: "Agricultura", importe: "64000.00", mora: "2800.00", cantidad: "20", moraPorcentaje: "4.38" },
  { id: 5, categoria: "Construcción", importe: "73000.00", mora: "4900.00", cantidad: "22", moraPorcentaje: "6.71" },
  { id: 6, categoria: "Finanzas", importe: "132000.00", mora: "6200.00", cantidad: "40", moraPorcentaje: "4.70" },
  { id: 7, categoria: "Salud", importe: "87000.00", mora: "5800.00", cantidad: "28", moraPorcentaje: "6.67" },
  { id: 8, categoria: "Educación", importe: "54000.00", mora: "2100.00", cantidad: "17", moraPorcentaje: "3.89" },
  { id: 9, categoria: "Tecnología", importe: "119000.00", mora: "10400.00", cantidad: "42", moraPorcentaje: "8.74" },
  { id: 10, categoria: "Transporte", importe: "91000.00", mora: "3300.00", cantidad: "26", moraPorcentaje: "3.63" },
  { id: 11, categoria: "Turismo", importe: "69000.00", mora: "1500.00", cantidad: "18", moraPorcentaje: "2.17" },
  { id: 12, categoria: "Energía", importe: "158000.00", mora: "9000.00", cantidad: "50", moraPorcentaje: "5.70" },
  { id: 13, categoria: "Seguros", importe: "49000.00", mora: "2400.00", cantidad: "15", moraPorcentaje: "4.90" },
  { id: 14, categoria: "Textil", importe: "43000.00", mora: "1700.00", cantidad: "13", moraPorcentaje: "3.95" },
  { id: 15, categoria: "Gastronomía", importe: "52000.00", mora: "3200.00", cantidad: "16", moraPorcentaje: "6.15" },
];


export interface tablaRangoType extends TableNode {
    rango: string;
    importe: string;
    mora: string;
    cantidad: string;
    moraPorcentaje: string;
}


export const dataTablaRango: tablaRangoType[] = [
  { id: 1, rango: "0-10k", importe: "8500.00", mora: "400.00", cantidad: "5", moraPorcentaje: "4.70" },
  { id: 2, rango: "10k-25k", importe: "24000.00", mora: "1800.00", cantidad: "12", moraPorcentaje: "7.50" },
  { id: 3, rango: "25k-50k", importe: "49000.00", mora: "3100.00", cantidad: "20", moraPorcentaje: "6.33" },
  { id: 4, rango: "50k-75k", importe: "66000.00", mora: "3700.00", cantidad: "24", moraPorcentaje: "5.61" },
  { id: 5, rango: "75k-100k", importe: "94000.00", mora: "5200.00", cantidad: "28", moraPorcentaje: "5.53" },
  { id: 6, rango: "100k-150k", importe: "128000.00", mora: "8000.00", cantidad: "36", moraPorcentaje: "6.25" },
  { id: 7, rango: "150k-200k", importe: "178000.00", mora: "11300.00", cantidad: "42", moraPorcentaje: "6.35" },
  { id: 8, rango: "200k-250k", importe: "232000.00", mora: "9200.00", cantidad: "50", moraPorcentaje: "3.97" },
  { id: 9, rango: "250k-300k", importe: "270000.00", mora: "10800.00", cantidad: "56", moraPorcentaje: "4.00" },
  { id: 10, rango: "300k-400k", importe: "350000.00", mora: "18000.00", cantidad: "62", moraPorcentaje: "5.14" },
  { id: 11, rango: "400k-500k", importe: "460000.00", mora: "21000.00", cantidad: "68", moraPorcentaje: "4.57" },
  { id: 12, rango: "500k-600k", importe: "590000.00", mora: "26000.00", cantidad: "72", moraPorcentaje: "4.41" },
  { id: 13, rango: "600k-700k", importe: "660000.00", mora: "30000.00", cantidad: "78", moraPorcentaje: "4.55" },
  { id: 14, rango: "700k-800k", importe: "720000.00", mora: "32000.00", cantidad: "82", moraPorcentaje: "4.44" },
  { id: 15, rango: "800k+", importe: "850000.00", mora: "39000.00", cantidad: "90", moraPorcentaje: "4.59" },
];


export interface tablaActividadType extends TableNode {
    actividad: string;
    importe: string;
    mora: string;
    cantidad: string;
    moraPorcentaje: string;
}


export const dataTablaActividad: tablaActividadType[] = [
  { id: 1, actividad: "Panadería", importe: "48000.00", mora: "2400.00", cantidad: "14", moraPorcentaje: "5.00" },
  { id: 2, actividad: "Carpintería", importe: "54000.00", mora: "2700.00", cantidad: "16", moraPorcentaje: "5.00" },
  { id: 3, actividad: "Ferretería", importe: "61000.00", mora: "3200.00", cantidad: "18", moraPorcentaje: "5.25" },
  { id: 4, actividad: "Restaurante", importe: "98000.00", mora: "6300.00", cantidad: "28", moraPorcentaje: "6.43" },
  { id: 5, actividad: "Consultoría", importe: "88000.00", mora: "4000.00", cantidad: "24", moraPorcentaje: "4.55" },
  { id: 6, actividad: "Gomería", importe: "45000.00", mora: "2100.00", cantidad: "15", moraPorcentaje: "4.67" },
  { id: 7, actividad: "Peluquería", importe: "32000.00", mora: "800.00", cantidad: "10", moraPorcentaje: "2.50" },
  { id: 8, actividad: "Veterinaria", importe: "56000.00", mora: "2500.00", cantidad: "17", moraPorcentaje: "4.46" },
  { id: 9, actividad: "Electricidad", importe: "104000.00", mora: "6700.00", cantidad: "35", moraPorcentaje: "6.44" },
  { id: 10, actividad: "Diseño gráfico", importe: "72000.00", mora: "3200.00", cantidad: "22", moraPorcentaje: "4.44" },
  { id: 11, actividad: "Programación", importe: "132000.00", mora: "8800.00", cantidad: "40", moraPorcentaje: "6.67" },
  { id: 12, actividad: "Cerrajería", importe: "49000.00", mora: "1900.00", cantidad: "16", moraPorcentaje: "3.88" },
  { id: 13, actividad: "Flete", importe: "67000.00", mora: "3300.00", cantidad: "20", moraPorcentaje: "4.93" },
  { id: 14, actividad: "Estudio Jurídico", importe: "158000.00", mora: "9500.00", cantidad: "45", moraPorcentaje: "6.01" },
  { id: 15, actividad: "Kiosco", importe: "39000.00", mora: "1800.00", cantidad: "12", moraPorcentaje: "4.62" },
];

