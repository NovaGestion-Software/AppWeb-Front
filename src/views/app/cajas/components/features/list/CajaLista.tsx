import CajaInfoCard from "../../CajaComponent";

export default function CajaLista() {
  const data = {
    title: "Sucursal: 0001 - Mendoza 386",
    items: [
      { icon: "💀", label: "Apertura:", value: "06:32" },
      { icon: "💀", label: "Cierre:", value: "06:32" },
      { icon: "💀", label: "Ult. Cobro:", value: "-" },
      { icon: "💀", label: "Ult. Cobro:", value: "-" },
      { icon: "💀", label: "Ult. Cobro:", value: "-" },
      { icon: "💀", label: "Ult. Cobro:", value: "-" },
    ],
    disponibilidad: "$600",
  };
  return (
    <div>
      <CajaInfoCard {...data} />
    </div>
  );
}
