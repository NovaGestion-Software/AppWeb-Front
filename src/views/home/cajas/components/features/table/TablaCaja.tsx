import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableFooterCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import { Dispatch, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerCajasSecciones } from '@/services/AppService';
import SkeletonTablaCaja from './SkTable';

type CajaSeccion = {
  seccion: string;
  nseccion: string;
  venta: string; // Usamos string porque los valores pueden contener números con decimales.
};

type CajasSeccionResponse = CajaSeccion[];

type TablaCajaProps = {
  handleRefetch: boolean;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
};

export default function TablaCaja({ handleRefetch, setHandleRefetch }: TablaCajaProps) {
  const {
    data: cajasSeccion,
    refetch,
    isFetching,
  } = useQuery<CajasSeccionResponse>({
    queryKey: ['cajas-seccion'],
    queryFn: obtenerCajasSecciones,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  });

  useEffect(() => {
    if (handleRefetch) {
      refetch();
      setHandleRefetch(false);
    }
  }, [handleRefetch, refetch]);

  const calculateTotalAndPercentages = (data: CajasSeccionResponse) => {
    // Filtrar ventas excluyendo los items con secciones "00000D", "00000I", "00000T" y "0000GE"
    const filteredData = data?.filter(
      (item) => !['00000D', '00000I', '00000T', '0000GE'].includes(item.seccion)
    );

    // Convertir todas las ventas a números, con validación
    const ventasNumeros = data?.map((item) => {
      const ventaStr = item.venta.replace('$', '').trim();
      const ventaNum = parseFloat(ventaStr);
      return isNaN(ventaNum) ? 0 : ventaNum;
    });

    // Convertir las ventas de los datos filtrados
    const ventasNumerosFiltrados = filteredData?.map((item) => {
      const ventaStr = item.venta.replace('$', '').trim();
      const ventaNum = parseFloat(ventaStr);
      return isNaN(ventaNum) ? 0 : ventaNum;
    });

    // Sumar todas las ventas válidas
    const totalVentas = ventasNumeros?.reduce((acc, venta) => acc + venta, 0);

    // Sumar las ventas de los datos filtrados
    const totalVentasFiltradas = ventasNumerosFiltrados?.reduce((acc, venta) => acc + venta, 0);

    // Si el total es 0, evitar división por 0
    if (totalVentas === 0) {
      return {
        totalVentas: '$0',
        totalVentasNetas: '$0',
        result: data?.map((item) => ({
          ...item,
          porcentaje: '0%',
          porcentajeNeto: '0%',
          venta: '$0',
        })),
      };
    }

    // Formatear el total de ventas y total de ventas netas con separadores de miles
    const totalVentasFormatted = totalVentas?.toLocaleString('es-ES');
    const totalVentasFiltradasFormatted = totalVentasFiltradas?.toLocaleString('es-ES');

    // Calcular el porcentaje de cada venta respecto al total y al total neto
    const result = data?.map((item, index) => {
      const porcentaje = ((ventasNumeros[index] / totalVentas) * 100).toFixed(2) + '%';
      const porcentajeNeto = !['00000D', '00000I', '00000T', '0000GE'].includes(item.seccion)
        ? ((ventasNumeros[index] / totalVentasFiltradas) * 100).toFixed(2) + '%'
        : '0%';

      return {
        ...item,
        venta: `${ventasNumeros[index].toLocaleString('es-ES')}`, // Formatear cada venta
        porcentaje,
        porcentajeNeto,
      };
    });

    return {
      totalVentas: `$${totalVentasFormatted}`,
      totalVentasNetas: `$${totalVentasFiltradasFormatted}`,
      result,
    };
  };

  // Ejemplo de uso
  const { totalVentas, totalVentasNetas, result } = calculateTotalAndPercentages(
    cajasSeccion || []
  );

  return (
    <div className="w-1/2 p-5 pb-1">
      {isFetching ? (
        <SkeletonTablaCaja />
      ) : (
        <Card className="flex flex-col gap-2 bg-white h-[52rem] w-full shadow-md rounded-md">
          <h3 className="text-3xl font-bold ">Venta por Seccion</h3>
          <Table className="mt-5 overflow-auto max-h-[43rem] border-2 border-gray-100 scrollbar-thin">
            <TableHead>
              <TableRow className="sticky top-0 bg-white z-10">
                <TableHeaderCell>
                  <p className="flex flex-col font-semibold gap-1">Seccion</p>
                </TableHeaderCell>

                <TableHeaderCell>
                  <p className="flex flex-col font-semibold gap-1 text-center">Importe $</p>
                </TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">%</p>
                </TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">Neto</p>
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((item: any, index: any) => (
                <TableRow key={index} className="odd:bg-gray-200  even:bg-white  ">
                  <TableCell className="border-gray-300 border-2 ">{item.nseccion}</TableCell>
                  <TableCell className="border-gray-300 border-2 text-end">{item.venta}</TableCell>
                  <TableCell className="border-gray-300 border-2 text-end">
                    {item.porcentaje}
                  </TableCell>
                  <TableCell className="border-gray-300 border-2 text-end">
                    {item.porcentajeNeto}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFoot className=" border-2 border-gray-300 rounded-md sticky bottom-0 bg-white z-10 ">
              <TableFooterCell>Total</TableFooterCell>
              <TableFooterCell className="border border-gray-300 bg-slate-100 font-extrabold text-blue-600 text-right">
                {totalVentas}
              </TableFooterCell>
              <TableFooterCell className="border border-gray-300 bg-slate-100 font-extrabold text-blue-600"></TableFooterCell>
              <TableFooterCell className="border border-gray-300 bg-slate-100 font-extrabold text-blue-600 text-end">
                {totalVentasNetas}
              </TableFooterCell>
            </TableFoot>
          </Table>
        </Card>
      )}
    </div>
  );
}
