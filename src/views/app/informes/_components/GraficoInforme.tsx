import { AreaChart } from '@tremor/react';

function GraficoInforme({ datosParaGraficos }: { datosParaGraficos: any }) {
  const transformarDatosParaGrafico = (datosOriginales: any) => {
    // Si datosOriginales es undefined o null, usa un arreglo vacío
    // console.log("datos pasados a graficos", datosOriginales);
    const datos = datosOriginales || []; // Usa datosOriginales directamente
    return datos.map((item: any) => ({
      horas: item.hora, // Usamos la hora como etiqueta
      Operaciones: item.nOperaciones, // Usamos el número de operaciones
    }));
  };

  const chartdata = transformarDatosParaGrafico(datosParaGraficos);
  // console.log("chart data", chartdata);

  return (
    <div className="p-2 bg-white rounded-lg w-fit h-fit">
      <AreaChart
        className="h-64 w-[28rem] 2xl:w-[36rem]"
        data={chartdata}
        index="horas"
        categories={['Operaciones']}
        valueFormatter={(number: number) => `${Intl.NumberFormat('us').format(number).toString()}`}
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
}

export default GraficoInforme;
