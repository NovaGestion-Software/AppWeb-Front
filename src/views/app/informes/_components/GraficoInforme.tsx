import { AreaChart } from '@tremor/react';
import ModalInforme from './ModalInforme';
import { useState } from 'react';
import ActionButton from '@/Components/ui/Buttons/ActionButton';
import { BsZoomIn } from 'react-icons/bs';

export default function GraficoInforme({ datosParaGraficos }: { datosParaGraficos: any }) {
  const [showModal, setShowModal] = useState(false);

  // label enteros
  const transformarDatosParaGrafico = (datosOriginales: any) => {
    // Si datosOriginales es undefined o null, usa un arreglo vacío
    // console.log('datos pasados a graficos', datosOriginales);
    const datos = datosOriginales || []; // Usa datosOriginales directamente
    return datos.map((item: any) => ({
      horas: item.hora, // Usamos la hora como etiqueta
      Operaciones: item.nOperaciones, // Usamos el número de operaciones
    }));
  };
  // label recortados
  const transformarDatosParaGrafico2 = (datosOriginales: any) => {
    // Si datosOriginales es undefined o null, usa un arreglo vacío
    // console.log('datos pasados a graficos', datosOriginales);
    const datos = datosOriginales || []; // Usa datosOriginales directamente
    return datos.map((item: any) => ({
      horas: item.hora.split('/')[0], // Tomamos solo la primera parte del label (antes de "/")
      Operaciones: item.nOperaciones, // Usamos el número de operaciones
    }));
  };

  const chartdata = transformarDatosParaGrafico(datosParaGraficos);
  const chartdata2 = transformarDatosParaGrafico2(datosParaGraficos);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleConfirm = () => {
    setShowModal(false);
  };

  return (
    <div className="h-80 p-2 bg-white rounded-lg">
      <div className="flex items-center h-full w-full">
        <AreaChart
          className="h-full w-full"
          data={chartdata}
          index="horas"
          categories={['Operaciones']}
          valueFormatter={(number: number) =>
            `${Intl.NumberFormat('us').format(number).toString()}`
          }
          onValueChange={(v) => console.log(v)}
        />
        <ActionButton icon={<BsZoomIn />} onClick={() => setShowModal(true)} color={'blue'} />
      </div>

      <ModalInforme
        show={showModal}
        title="N° Operaciones por Hora"
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        buttons={false}
      >
        <AreaChart
          className="w-[60rem]"
          data={chartdata2}
          index="horas"
          categories={['Operaciones']}
          valueFormatter={(number: number) =>
            `${Intl.NumberFormat('us').format(number).toString()}`
          }
          onValueChange={(v) => console.log(v)}
        />
      </ModalInforme>
    </div>
  );
}
