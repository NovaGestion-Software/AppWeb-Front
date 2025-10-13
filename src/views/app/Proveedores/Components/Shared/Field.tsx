import { PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";

/** Mapas seguros para Tailwind en spans/starts. */
const COL_SPAN: Record<1|2|3|4|5|6|7|8|9|10|11|12, string> = {
  1:"col-span-1",  2:"col-span-2",  3:"col-span-3",  4:"col-span-4",
  5:"col-span-5",  6:"col-span-6",  7:"col-span-7",  8:"col-span-8",
  9:"col-span-9", 10:"col-span-10",11:"col-span-11",12:"col-span-12",
};

const COL_START: Record<1|2|3|4|5|6|7|8|9|10|11|12, string> = {
  1:"col-start-1",  2:"col-start-2",  3:"col-start-3",  4:"col-start-4",
  5:"col-start-5",  6:"col-start-6",  7:"col-start-7",  8:"col-start-8",
  9:"col-start-9", 10:"col-start-10",11:"col-start-11",12:"col-start-12",
};

const ROW_SPAN: Record<1|2|3|4|5|6|7|8|9|10|11|12, string> = {
  1:"row-span-1",  2:"row-span-2",  3:"row-span-3",  4:"row-span-4",
  5:"row-span-5",  6:"row-span-6",  7:"row-span-7",  8:"row-span-8",
  9:"row-span-9", 10:"row-span-10",11:"row-span-11",12:"row-span-12",
};

const ROW_START: Record<1|2|3|4|5|6|7|8|9|10|11|12, string> = {
  1:"row-start-1",  2:"row-start-2",  3:"row-start-3",  4:"row-start-4",
  5:"row-start-5",  6:"row-start-6",  7:"row-start-7",  8:"row-start-8",
  9:"row-start-9", 10:"row-start-10",11:"row-start-11",12:"row-start-12",
};

type FieldProps = {
  label?: string;
  help?: ReactNode;
  /** Span en columnas (default 12). */
  colSpan?: 1|2|3|4|5|6|7|8|9|10|11|12;
  /** Columna de inicio (opcional). */
  colStart?: 1|2|3|4|5|6|7|8|9|10|11|12;
  /** Span en filas (opcional). */
  rowSpan?: 1|2|3|4|5|6|7|8|9|10|11|12;
  /** Fila de inicio (opcional). */
  rowStart?: 1|2|3|4|5|6|7|8|9|10|11|12;
  required?: boolean;
  className?: string;
};

/** Wrapper label+control+help para homogeneizar estilos del formulario. */
export default function Field({
  label,
  help,
  colSpan = 12,
  colStart,
  rowSpan,
  rowStart,
  required = false,
  className,
  children,
}: PropsWithChildren<FieldProps>) {
  return (
    <div
      className={clsx(
        COL_SPAN[colSpan],
        colStart ? COL_START[colStart] : null,
        rowSpan ? ROW_SPAN[rowSpan] : null,
        rowStart ? ROW_START[rowStart] : null,
        className
      )}
    >
      <label className="mb-1 block text-xs font-medium text-neutral-950">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {help && <p className="mt-1 text-[11px] text-neutral-500">{help}</p>}
    </div>
  );
}
