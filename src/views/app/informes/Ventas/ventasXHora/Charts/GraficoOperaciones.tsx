import GraficoConZoom from "@/frontend-resourses/components/Charts/GraficoConZoom";

export default function GraficoOperaciones({ filas }: any) {
  // configuracion grafico
  const configuracionGrafico = [
    { label: "horaini", key: "horaini" },
    { label: "nOperaciones", key: "nOperaciones" },
  ];

  return (
    <GraficoConZoom
      datosParaGraficos={filas}
      index="horaini"
      className=" w-[29rem] v1440:w-[32rem] v1536:w-[36rem]  h-72"
      widthGraficoModal="w-[64rem] h-[28rem]"
      categorias={["nOperaciones"]}
      tituloModal="N° Operaciones por Hora"
      keysMap={configuracionGrafico}
    />
  );
}
