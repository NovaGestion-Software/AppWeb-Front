export default function ItemsPedidos(props: { titulo: string; rubrosPendientesData: any[]; rubrosTraidosData: any[]; className?: string }) {
  const rubrosPendientesData = props.rubrosPendientesData;
  const rubrosTraidosData = props.rubrosTraidosData;
  const className = props.className;
  const titulo = props.titulo;

  return (
    <div className={`${className} bg-white w-auto min-w-56  overflow-auto  text-xs pb-1 top-0  m-1 rounded-lg shadow-md noneScroll`}>
      <div
        className="bg-blue-200 text-blue-900 font-semibold 
      text-center py-1 text-base"
      >
        {" "}
        {titulo}
      </div>

      <div className="p-2 ">
        {rubrosTraidosData?.length > 0 && (
          <ul className="list-disc list-inside text-nowrap overflow-hidden">
            {rubrosTraidosData.map((rubro) => (
              <li key={rubro.id} className="text-green-500 font-semibold ">
                {rubro.nombre}
              </li>
            ))}
          </ul>
        )}
        {rubrosPendientesData?.length > 0 && (
          <ul className="list-disc list-inside">
            {rubrosPendientesData.map((rubro) => (
              <li key={rubro.id} className="text-yellow-500 font-semibold">
                {rubro.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
