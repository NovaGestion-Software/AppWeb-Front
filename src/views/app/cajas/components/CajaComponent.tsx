import { Card } from "@/frontend-resourses/components/Cards/CardBase";

type InfoItem = {
  label: string;
  value: string;
  icon?: string; // opcional
};

type Props = {
  title: string;
  items: InfoItem[];
  disponibilidad?: string;
};

export default function CajaInfoCard({ title, items, disponibilidad }: Props) {
  return (
    <Card className="p-4 space-y-4">
      <h1 className="font-bold text-lg">{title}</h1>

      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <span className="flex gap-1 text-gray-700">
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
            </span>
            <span className="text-gray-900">{item.value}</span>
          </li>
        ))}
      </ul>

      {disponibilidad && (
        <div className="text-blue-600 font-semibold flex justify-between pt-2 border-t mt-2">
          <span>Disponibilidad:</span>
          <span>{disponibilidad}</span>
        </div>
      )}
    </Card>
  );
}
