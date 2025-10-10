import { PropsWithChildren } from "react";
import clsx from "clsx";

/** Mapas seguros para Tailwind (evita clases dinámicas que se purgan). */
const COLS: Record<1|2|3|4|5|6|7|8|9|10|11|12, string> = {
  1:"grid-cols-1",  2:"grid-cols-2",  3:"grid-cols-3",  4:"grid-cols-4",
  5:"grid-cols-5",  6:"grid-cols-6",  7:"grid-cols-7",  8:"grid-cols-8",
  9:"grid-cols-9", 10:"grid-cols-10",11:"grid-cols-11",12:"grid-cols-12",
};

const ROWS: Record<1|2|3|4|5|6|7|8|9|10|11|12, string> = {
  1:"grid-rows-1",  2:"grid-rows-2",  3:"grid-rows-3",  4:"grid-rows-4",
  5:"grid-rows-5",  6:"grid-rows-6",  7:"grid-rows-7",  8:"grid-rows-8",
  9:"grid-rows-9", 10:"grid-rows-10",11:"grid-rows-11",12:"grid-rows-12",
};

type FieldRowProps = {
  /** Cantidad de columnas del grid (por defecto 12). */
  cols?: 1|2|3|4|5|6|7|8|9|10|11|12;
  /** Cantidad de filas del grid (opcional). */
  rows?: 1|2|3|4|5|6|7|8|9|10|11|12;
  className?: string;
};

/** Fila responsiva de campos. Controla el grid sin acoplarse a un tipo de input. */
export default function FieldRow({
  children,
  cols = 12,
  rows, // nuevo
  className,
}: PropsWithChildren<FieldRowProps>) {
  return (
    <div
      className={clsx(
        "mb-3 grid gap-2",
        COLS[cols],
        rows ? ROWS[rows] : null,
        className
      )}
    >
      {children}
    </div>
  );
}
