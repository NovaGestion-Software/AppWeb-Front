// import ViewTitle from "@/Components/ui/Labels/ViewTitle";
// import HerramientasComponent from "../informes/ventasXHora/components/HerramientasComponent";
// import FechasInforme from "../informes/_components/FechasInforme";
// import { useState } from "react";
// import ActionButton from "@/Components/ui/Buttons/ActionButton";
// import { useQuery } from "@tanstack/react-query";
// import apiPhp from "@/lib/axiosPhp";
// import { isAxiosError } from "axios";
// import TablaInforme from "../informes/_components/TablaInforme";
// import TablaExpandible from "./componentes/TablaExpandible";

// export async function obtenerRubrosDisponibles() {
//     try {
//         const url = `/apinovades/generico/obtenerSeccionesRubros.php?_i={"_e":"12","_s":"08","_m":"prod"}`
//       const { data } = await apiPhp(url);
  
//       // console.log(result);
//       return data;
//     } catch (error) {
//       if (isAxiosError(error) && error.response) {
//         throw new Error(error.response.data.error);
//       } else {
//         console.log(error);
//         throw new Error('Error desconocido al obtener  secciones de cajas');
//       }
//     }
//   }

//   interface Rubro {
//     rubro: string;
//     nrubro: string;
//   }
//   interface TablaStock {
//     seccion: string;
//     nseccion: string;
//     rubros: Rubro[];
//   }
  
// // types.ts
// export interface TableColumn<T> {
//   label: string;
//   renderCell: (item: T) => React.ReactNode; 
//   cellProps?: (item: T) => any;
// }
// export default function StockPorSeccion() {

//     const [rubrosDisponibles, setRubrosDisponibles] = useState();
    
//     const isProcessing = false

//     const handleFetchData = async () => {
//         console.log('handle fetch')
//     }
//     const handleClearData = () => {
//         console.log('handle clear')
//     }




//  const {
//     data: rubrosDis,
  
//   } = useQuery({
//     queryKey: ['rubros-seccion'],
//     queryFn: obtenerRubrosDisponibles,
//     refetchOnWindowFocus: false,
//     staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
//   });

//   console.log(rubrosDis)

//       // <TablaInforme
//       //     columnas={COLUMNS}
//       //     datosParaTabla={datos}
//       //     estilos={customTheme}
//       //     footer={footer}
//       //     datosFooter={datosFooter}
//       //     procesado={isProcessing}
//       //   />
//       const customTheme = {
//         Table: `
//           grid-template-columns: minmax(30px, 110px) minmax(40px, 300px);
//           border-radius: 12px;
//           width: 30rem;
//           height: auto;
//           scrollbar-width: thin;
//           border: 1px solid black;
//           font-variant-numeric: tabular-nums;
//           @media (min-width: 1280px) and (max-width: 1380px) {
//             height: 500px;
//           }
//         `,
      
//         Row: `
//           &:nth-of-type(odd) { background-color: #fff; }
//           &:nth-of-type(even) { background-color: #eaf5fd; }
          
//           &.row-select-single-selected { background-color: #CAE0BC !important; }
//           border-bottom: 1px solid #ccc;
//         `,
      
//         HeaderCell: `
//           background: #2973B2;
//           color: white;
//           height: 10px;
//           &:nth-of-type(n+3) {
//             text-align: center;
//           }
//         `,
      
//         Cell: `
//           padding: 8px;
//           border-right: 1px solid #ccc;
      
//           &:last-child {
//             border-right: none;
//           }
      
//           &:nth-of-type(n+3) {
//             text-align: right;
//           }
//         `,
      
//         FooterCell: `
//           position: sticky;
//           bottom: 0px;
//           padding: 8px;
//           border-right: 1px solid #ccc;
//           background-color: #fff;
//           text-align: right;
      
//           &:last-child {
//             border-right: none;
//           }
      
//           &:nth-of-type(3) {
//             border-right: 1px solid black;
//             background-color: #A5C9FF;
//             font-weight: bold;
//           }
      
//           &:nth-of-type(5) {
//             border-right: 1px solid black;
//             background-color: #A5C9FF;
//             font-weight: bold;
//           }
      
//           &:nth-of-type(7) {
//             border-right: 1px solid black;
//             background-color: #A5C9FF;
//             font-weight: bold;
//           }
//         `,
//       };
    
//       const res ={"status":"success","data":[{"seccion":"010000","nseccion":"HOMBRE","rubros":[{"rubro":"000001","nrubro":"ACCESORIOS HOMBRE"},{"rubro":"000010","nrubro":"BOTIN FUTBOL 5 ADULTO"},{"rubro":"000030","nrubro":"PANTUFLAS HOMBRE (INVIERNO)"},{"rubro":"000038","nrubro":"SANDALIAS CALSICA\/SPORT HOMBRE"},{"rubro":"000082","nrubro":"CHINELAS HOMBRE"},{"rubro":"000086","nrubro":"PANTUFLAS HOMBRE (VERANO)"},{"rubro":"000090","nrubro":"GOMONES HOMBRE (INVIERNO)"},{"rubro":"000096","nrubro":"BOTIN F11 ADULTO"},{"rubro":"020501","nrubro":"PANCHA MEDIA HOMBRE"},{"rubro":"000006","nrubro":"BOTAS HOMBRE"},{"rubro":"000013","nrubro":"URBANO HOMBRE"},{"rubro":"000022","nrubro":"DEPORTIVAS HOMBRE"},{"rubro":"000026","nrubro":"OJOTAS HOMBRE"},{"rubro":"000042","nrubro":"TIEMPO LIBRE HOMBRE"},{"rubro":"000046","nrubro":"ZAPATOS HOMBRE"},{"rubro":"000062","nrubro":"GOMONES HOMBRE"},{"rubro":"000078","nrubro":"TREKKING HOMBRE"},{"rubro":"010106","nrubro":"BOTINES TRABAJO"}]},{"seccion":"060000","nseccion":"ALPARGATAS","rubros":[{"rubro":"000005","nrubro":"ALPARGATAS"}]},{"seccion":"030000","nseccion":"NI\u00d1O","rubros":[{"rubro":"000011","nrubro":"BOTIN FUTBOL 5 NI\u00d1O"},{"rubro":"000018","nrubro":"GUILLERMINAS NI\u00d1O"},{"rubro":"000032","nrubro":"PANTUFLAS NI\u00d1O (INVIERNO)"},{"rubro":"000035","nrubro":"SANDALIAS MODA NENA"},{"rubro":"000040","nrubro":"SANDALIAS CLASICA\/SPORT NI\u00d1O"},{"rubro":"000084","nrubro":"CHINELAS NI\u00d1O"},{"rubro":"000092","nrubro":"GOMONES NI\u00d1O (INVIERNO)"},{"rubro":"000097","nrubro":"BOTIN F11 NI\u00d1O"},{"rubro":"000101","nrubro":"SANDALIAS PLAYA NI\u00d1O"},{"rubro":"000003","nrubro":"ACCESORIOS NI\u00d1O"},{"rubro":"000008","nrubro":"BOTAS NI\u00d1O"},{"rubro":"000015","nrubro":"URBANO NI\u00d1O"},{"rubro":"000024","nrubro":"DEPORTIVAS NI\u00d1O"},{"rubro":"000028","nrubro":"OJOTAS NI\u00d1O"},{"rubro":"000044","nrubro":"TIEMPO LIBRE NI\u00d1O"},{"rubro":"000048","nrubro":"ZAPATOS NI\u00d1O"},{"rubro":"000064","nrubro":"GOMONES NI\u00d1O"},{"rubro":"000080","nrubro":"TREKKING NI\u00d1O"},{"rubro":"000020","nrubro":"COLEGIAL NI\u00d1O (ZAPATO)"},{"rubro":"000095","nrubro":"COLEGIAL (ZAPATILLA)"}]},{"seccion":"050000","nseccion":"BEBE","rubros":[{"rubro":"000012","nrubro":"BOTIN FUTBOL 5 BEBE"},{"rubro":"000019","nrubro":"GUILLERMINAS BEBE"},{"rubro":"000033","nrubro":"PANTUFLAS BEBE (INVIERNO)"},{"rubro":"000036","nrubro":"SANDALIAS MODA BEBE"},{"rubro":"000041","nrubro":"SANDALIAS CLASICA\/SPORT BEBE"},{"rubro":"000102","nrubro":"SANDALIAS PLAYA BEBE"},{"rubro":"020503","nrubro":"PANCHA MEDIA BEBE"},{"rubro":"000009","nrubro":"BOTAS BEBE"},{"rubro":"000016","nrubro":"URBANO BEBE"},{"rubro":"000025","nrubro":"DEPORTIVAS BEBE"},{"rubro":"000029","nrubro":"OJOTAS BEBE"},{"rubro":"000045","nrubro":"TIEMPO LIBRE BEBE"},{"rubro":"000049","nrubro":"ZAPATOS BEBE"},{"rubro":"000065","nrubro":"GOMONES BEBE"}]},{"seccion":"020000","nseccion":"DAMA","rubros":[{"rubro":"000017","nrubro":"BOTIN FUTBOL 5 DAMA"},{"rubro":"000031","nrubro":"PANTUFLAS DAMA (INVIERNO)"},{"rubro":"000034","nrubro":"SANDALIAS MODA DAMA"},{"rubro":"000037","nrubro":"CHINELON MODA"},{"rubro":"000039","nrubro":"SANDALIAS CLASICA\/SPORT DAMA"},{"rubro":"000052","nrubro":"SANDALIAS FIESTA DAMA"},{"rubro":"000083","nrubro":"CHINELAS DAMA"},{"rubro":"000087","nrubro":"PANTUFLAS DAMA (VERANO)"},{"rubro":"000091","nrubro":"GOMONES DAMA (INVIERNO)"},{"rubro":"000100","nrubro":"SANDALIAS PLAYA DAMA"},{"rubro":"020500","nrubro":"PANCHA MEDIA DAMA"},{"rubro":"000002","nrubro":"ACCESORIOS DAMA"},{"rubro":"000007","nrubro":"BOTAS DAMA"},{"rubro":"000014","nrubro":"URBANO DAMA"},{"rubro":"000023","nrubro":"DEPORTIVAS DAMA"},{"rubro":"000027","nrubro":"OJOTAS DAMA"},{"rubro":"000043","nrubro":"TIEMPO LIBRE DAMA"},{"rubro":"000047","nrubro":"ZAPATOS DAMA"},{"rubro":"000053","nrubro":"ZAPATILLA SE\u00d1ORA"},{"rubro":"000063","nrubro":"GOMONES DAMA"},{"rubro":"000079","nrubro":"TREKKING DAMA"}]},{"seccion":"000001","nseccion":"ARTICULOS DEPORTIVOS","rubros":[{"rubro":"000056","nrubro":"MOCHILAS"},{"rubro":"000058","nrubro":"BOLSOS"},{"rubro":"000094","nrubro":"PELOTAS VARIAS"},{"rubro":"080801","nrubro":"PICO INFLADOR"},{"rubro":"000057","nrubro":"PELOTA FUTBOL"},{"rubro":"000059","nrubro":"ARTICULOS DEPORTIVOS VARIOS"},{"rubro":"000066","nrubro":"PALO HOCKEY"},{"rubro":"000067","nrubro":"CANILLERAS"},{"rubro":"000068","nrubro":"ROLLERS Y PATINES"},{"rubro":"000069","nrubro":"SKATE Y PATINETAS"},{"rubro":"000070","nrubro":"GUANTES BOXEO"},{"rubro":"000076","nrubro":"CAMISETA DE FUTBOL"}]},{"seccion":"080000","nseccion":"INDUMENTARIA","rubros":[{"rubro":"000061","nrubro":"CAMPERAS"},{"rubro":"000077","nrubro":"MEDIAS Y SOQUETES"},{"rubro":"080904","nrubro":"BOLSO VIAJE"}]},{"seccion":"070000","nseccion":"ACCESORIOS CALZADOS","rubros":[{"rubro":"020909","nrubro":"ENVIO A DOMICILIO"},{"rubro":"070101","nrubro":"ACCESORIOS VARIOS"},{"rubro":"000073","nrubro":"PLANTILLAS"},{"rubro":"000074","nrubro":"CORDONES"},{"rubro":"000075","nrubro":"CUIDADO DEL CALZADO"}]},{"seccion":"080001","nseccion":"LIQUIDACION","rubros":[{"rubro":"000060","nrubro":"LIQUIDACION"},{"rubro":"000071","nrubro":"LIQUIDACION VERANO"},{"rubro":"000072","nrubro":"LIQUIDACION INVIERNO"}]}],"code":200,"message":"SeccionesRubros"}
//       const data1: TablaStock[] = [
//         {
//           id: 1,
//           nseccion: "001",
//           rubros: [
//             { key: "zapatos", value: "32 unidades" },
//             { key: "ojotas", value: "20 unidades" },
//           ],
//         },
//         {
//           id: 2,
//           nseccion: "002",
//           rubros: [
//             { key: "camisas", value: "15 unidades" },
//             { key: "pantalones", value: "25 unidades" },
//           ],
//         },
//         {
//           id: 3,
//           nseccion: "002",
//           rubros: [
//             { key: "camisas", value: "15 unidades" },
//             { key: "pantalones", value: "25 unidades" },
//           ],
//         },
//         {
//           id:4,
//           nseccion: "002",
//           rubros: [
//             { key: "camisas", value: "15 unidades" },
//             { key: "pantalones", value: "25 unidades" },
//           ],
//         },
//         {
//           id: 5,
//           nseccion: "002",
//           rubros: [
//             { key: "camisas", value: "15 unidades" },
//             { key: "pantalones", value: "25 unidades" },
//           ],
//         },
//         {
//           id: 6,
//           nseccion: "002",
//           rubros: [
//             { key: "camisas", value: "15 unidades" },
//             { key: "pantalones", value: "25 unidades" },
//           ],
//         },
//         {
//           id: 7,
//           nseccion: "002",
//           rubros: [
//             { key: "camisas", value: "15 unidades" },
//             { key: "pantalones", value: "25 unidades" },
//           ],
//         },
//       ];
//       const data = res.data
//       const COLUMNS: TableColumn<TablaStock>[] = [
//         {
//           label: 'Seccion',
//           renderCell: (item: TablaStock) => item.nseccion, // Esto es válido porque `item.nseccion` es un string
//         },
//         {
//           label: 'Codigo',
//           renderCell: (item: TablaStock) => item.seccion, // Renderiza los rubros como una lista de elementos JSX
//         },
//       ];
//   return (
//     <div className="w-full h-full px-4 pt-0 overflow-hidden">
//       <ViewTitle title={"Stock Por Seccion"} />
//       <div className="grid grid-cols-12 grid-rows-1 gap-4 mt-6 rounded p-2  h-16 items-center ">
//         {/**ingresar fechas y Botones de procesado */}
//         <div className="col-start-2 col-span-6 2xl:col-span-6 2xl:col-start-2 ">
//         <ActionButton onClick={handleFetchData} text="Procesar" />
//         </div>

//         {/**modales y funcionabilidades */}
//         <div className="col-span-5 col-start-8 2xl:col-span-4 2xl:col-start-8  ">
//           <HerramientasComponent
//             data={data}
//             isProcessing={isProcessing}
//             datosParaFooter={data}
//           />
//         </div>
//       </div>

//       <div className="flex items-center justify-center">
//         <TablaExpandible columnas={COLUMNS} datosParaTabla={data} estilos={customTheme} procesado={false} />
//       </div>
//     </div>
//   );
// }
