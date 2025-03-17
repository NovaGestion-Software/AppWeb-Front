import { TablaStocks, TableColumn } from "@/types";
import TablaInforme from "../../informes/_components/TablaInforme";
import { useStockPorSeccion } from "@/store/useStockPorSeccion";
import { useEffect } from "react";
import { TableNode } from "@table-library/react-table-library/types/table";

interface TableProps<T extends TableNode> {
  datosParaTabla: T[];
  idsCoincidentes?: (string | number)[]; // Prop opcional
  indiceSeleccionado?: number; // Prop opcional
}
export default function TablaStock({datosParaTabla}: TableProps<TableNode>) {
  const COLUMNS: TableColumn<TablaStocks>[] = [
    {
      label: "Codigo",
      renderCell: (item: TablaStocks) => item.codigo, // Renderiza los rubros como una lista de elementos JSX
    },
    {
      label: "Talle",
      renderCell: (item: TablaStocks) => item.talle, // Esto es válido porque `item.nseccion` es un string
    },
    {
      label: "Descripcion",
      renderCell: (item: TablaStocks) => item.descripcion, // Esto es válido porque `item.nseccion` es un string
    },
    {
      label: "Marca",
      renderCell: (item: TablaStocks) => item.marca, // Esto es válido porque `item.nseccion` es un string
    },
    {
      label: "Precio",
      renderCell: (item: TablaStocks) => item.precio, // Esto es válido porque `item.nseccion` es un string
    },
    {
      label: "Total",
      renderCell: (item: TablaStocks) => item.total, // Esto es válido porque `item.nseccion` es un string
    },
  ];
  const customTheme = {
    Table: `
      grid-template-columns: minmax(30px, 110px) minmax(40px, 300px) minmax(40px, 300px) minmax(40px, 300px) minmax(40px, 300px) minmax(40px, 300px);
      border-radius: 12px;
      width: 70rem;
      max-height: 450px; /* Reducir la altura máxima para dejar espacio al footer */
      overflow-y: auto; /* Habilitar scroll vertical */
      scrollbar-width: thin;
      border: 1px solid black;
      font-variant-numeric: tabular-nums;
      font-size: 14px; /* Tamaño de fuente por defecto */
      margin-bottom: 40px; /* Espacio para el footer */
  
      @media (min-width: 1280px) and (max-width: 1380px) {
        grid-template-columns: minmax(30px, 80px) minmax(40px, 150px) minmax(40px, 150px) minmax(40px, 150px) minmax(40px, 150px) minmax(40px, 150px);
        width: 50rem; /* Ancho reducido */
        max-height: 350px; /* Altura máxima reducida */
        font-size: 12px; /* Tamaño de fuente más pequeño */
        height: 360px; /* Altura reducida para pantallas medianas */
        margin-bottom: 10px; /* Espacio reducido para el footer */
      }
    `,
  
    Row: `
      height: 10px; /* Altura de fila por defecto */
      font-size: 14px; /* Tamaño de fuente por defecto */
      &:nth-of-type(odd) { background-color: #fff; }
      &:nth-of-type(even) { background-color: #eaf5fd; }
      
      &.row-select-single-selected { background-color: #CAE0BC !important; }
      border-bottom: 1px solid #ccc;
  
      @media (min-width: 1280px) and (max-width: 1380px) {
        height: 8px; /* Altura de fila reducida */
        font-size: 12px; /* Tamaño de fuente más pequeño */
      }
    `,
  
    HeaderCell: `
      background: #2973B2;
      color: white;
      height: 30px; /* Altura por defecto */
      font-size: 14px; /* Tamaño de fuente por defecto */
      padding: 14px; /* Padding por defecto */
      &:nth-of-type(n+3) {
        text-align: center;
      }
  
      @media (min-width: 1280px) and (max-width: 1380px) {
        height: 20px; /* Altura reducida */
        font-size: 12px; /* Tamaño de fuente más pequeño */
        padding: 8px; /* Padding reducido */
      }
    `,
  
    Cell: `
      padding: 6px; /* Padding por defecto */
      border-right: 1px solid #ccc;
      font-size: 14px; /* Tamaño de fuente por defecto */
  
      &:last-child {
        border-right: none;
      }
  
      &:nth-of-type(n+3) {
        text-align: right;
      }
  
      @media (min-width: 1280px) and (max-width: 1380px) {
        padding: 4px; /* Padding reducido */
        font-size: 12px; /* Tamaño de fuente más pequeño */
      }
    `,
  
    FooterCell: `
      position: sticky;
      bottom: 0;
      padding: 8px;
      border-top: 1px solid #ccc;
      background-color: #fff; /* Fondo sólido para ocultar el contenido de la tabla */
      text-align: right;
      font-size: 14px;
      z-index: 1; /* Asegurar que el footer esté por encima del contenido */
  
      &:last-child {
        border-right: none;
      }
  
      &:nth-of-type(1) {
        border: 1px solid black;
        background-color: #A5C9FF;
        font-weight: bold;
        border-bottom-left-radius: 8px; /* Redondeo en la esquina inferior izquierda */
      }
  
      @media (min-width: 1280px) and (max-width: 1380px) {
        padding: 4px; /* Padding reducido */
        font-size: 12px;
        height: 30px;
        bottom: 0px; /* Ajuste fino para alinear el footer */
      }
    `,
  };
  const data: TablaStocks[] = [
    { id: 1, codigo: "123", talle: "S", descripcion: "Camiseta básica", marca: "Adidas", precio: "25.99", total: "259.90" },
    { id: 2, codigo: "234", talle: "M", descripcion: "Pantalón vaquero", marca: "Nike", precio: "49.99", total: "499.90" },
    { id: 3, codigo: "345", talle: "", descripcion: "Chaqueta de cuero", marca: "Puma", precio: "120.00", total: "1200.00" },
    { id: 4, codigo: "456", talle: "XL", descripcion: "Zapatos deportivos", marca: "Reebok", precio: "89.99", total: "0" }, // Negativo
    { id: 5, codigo: "567", talle: "XXL", descripcion: "Gorra de béisbol", marca: "Under Armour", precio: "15.00", total: "150.00" },
    { id: 6, codigo: "678", talle: "S", descripcion: "Bufanda de lana", marca: "Columbia", precio: "19.99", total: "199.90" },
    { id: 7, codigo: "789", talle: "M", descripcion: "Guantes de invierno", marca: "The North Face", precio: "29.99", total: "0" }, // Negativo
    { id: 8, codigo: "890", talle: "L", descripcion: "Chaleco reflectante", marca: "Helly Hansen", precio: "35.00", total: "350.00" },
    { id: 9, codigo: "901", talle: "XL", descripcion: "Mochila escolar", marca: "Osprey", precio: "45.00", total: "450.00" },
    { id: 10, codigo: "012", talle: "XXL", descripcion: "Sudadera con capucha", marca: "Patagonia", precio: "55.00", total: "0" }, // Sin stock
    { id: 11, codigo: "123", talle: "S", descripcion: "Camisa de vestir", marca: "Tommy Hilfiger", precio: "75.00", total: "-750.00" },
    { id: 12, codigo: "234", talle: "M", descripcion: "Short deportivo", marca: "Levi's", precio: "30.00", total: "-15.00" }, // Sin stock
    { id: 13, codigo: "345", talle: "L", descripcion: "Chaqueta de invierno", marca: "Columbia", precio: "150.00", total: "1500.00" },
    { id: 14, codigo: "456", talle: "XL", descripcion: "Zapatillas casuales", marca: "Converse", precio: "65.00", total: "0" }, // Negativo
    { id: 15, codigo: "567", talle: "XXL", descripcion: "Sombrero de paja", marca: "Quiksilver", precio: "20.00", total: "200.00" },
    { id: 16, codigo: "678", talle: "S", descripcion: "Cinturón de cuero", marca: "Levi's", precio: "25.00", total: "250.00" },
    { id: 17, codigo: "789", talle: "M", descripcion: "Pantalón de jogging", marca: "Adidas", precio: "40.00", total: "-400.00" },
    { id: 18, codigo: "890", talle: "L", descripcion: "Saco de lana", marca: "Lacoste", precio: "90.00", total: "900.00" },
    { id: 19, codigo: "901", talle: "XL", descripcion: "Botas de montaña", marca: "Salomon", precio: "110.00", total: "-1100.00" },
    { id: 20, codigo: "012", talle: "XXL", descripcion: "Chalina de seda", marca: "H&M", precio: "18.00", total: "180.00" }
  ];
  
  // funcion por si el codigo viene con letras
  // const dataSinLetras = data.map((item) => ({
  //   ...item,
  //   codigo: item.codigo.replace(/\D/g, ""), // Elimina todas las letras del código
  // }));
  
  let cantidadItems = data.length;
  const datosFooter = {
    id: cantidadItems,
    talle: "",
    talle2: "",
    talle3: "",
    talle4: "",
    talle5: "",
  };
let setData = true
  const {setTablaStock, } = useStockPorSeccion();
  // console.log('tabla', tablaStock)
  useEffect(() => {
    if(setData){
      setTablaStock(data)
    }
  },[setData])
  
  const { indiceSeleccionado,
    idsCoincidentes,} = useStockPorSeccion()

  return (
    <>
      <TablaInforme
        columnas={COLUMNS}
        datosParaTabla={datosParaTabla}
        procesado={false}
        estilos={customTheme}
        footer={true}
        datosFooter={datosFooter}
        idsCoincidentes={idsCoincidentes}
        indiceSeleccionado={indiceSeleccionado}
   
      />
    </>
  );
}
