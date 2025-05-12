export default function ItemsPedidos(props: { rubrosPendientesData: any[]; rubrosTraidosData: any[]; className?: string }) {
  const rubrosPendientesData = props.rubrosPendientesData;
  const rubrosTraidosData = props.rubrosTraidosData;
  const className = props.className;
  
  return (
    <div className={`${className} bg-white w-auto min-w-56  overflow-auto  text-xs py-1 px-2 m-1 rounded-lg shadow-md`}>
      {rubrosTraidosData?.length > 0 && (
        <ul>
          {rubrosTraidosData.map((rubro) => (
            <li key={rubro.id} className="text-green-500 font-semibold">
              {rubro.nombre}
            </li>
          ))}
        </ul>
      )}
      {rubrosPendientesData?.length > 0 && (
        <ul>
          {rubrosPendientesData.map((rubro) => (
            <li key={rubro.id} className="text-yellow-500 font-semibold">
              {rubro.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
