// // /Components/DevTools/BotoneraTest.tsx
// import { useEffect } from "react";
// import clsx from "clsx";
// import { useProovedoresStore } from "../../Store/Store";
// import { EstadoIMAC } from "../../Store/Status/types";

// export default function BotoneraTest() {
//   // Estado y atajos del slice de Estado
//   const estado = useProovedoresStore((s) => s.estado);
//   const toInicial = useProovedoresStore((s) => s.toInicial);
//   const toAlta = useProovedoresStore((s) => s.toAlta);
//   const toModificacion = useProovedoresStore((s) => s.toModificacion);
//   const toConsulta = useProovedoresStore((s) => s.toConsulta);

//   // Log en vivo del estado IMAC (útil mientras se prueba)
//   useEffect(() => {
//     const unsub = useProovedoresStore.subscribe((s) => {
//     });
//     return () => unsub();
//   }, []);

//   // Limpia persistencia + intenta resetear toda la store de forma defensiva
// const handleLimpiarStore = () => {
//   const api = useProovedoresStore.getState();

//   console.log("[Store] ANTES:", api);
//   api.resetAll?.();
//   // microtask para ver el estado actualizado luego del set
//   queueMicrotask(() => {
//     console.log("[Store] DESPUÉS:", useProovedoresStore.getState());
//   });
// };

//   return (
//     <div className="flex flex-row items-center gap-4 row-start-1 col-start-1 col-span-6 absolute rounded-lg border border-slate-200 bg-white px-4 h-12 shadow-sm">
//       {/* Estado actual */}
//       <div className="flex items-center gap-2 text-sm text-slate-500">
//         <span className="font-medium">Estado:</span>
//         <span
//           className={clsx(
//             "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
//             estado === EstadoIMAC.INICIAL && "bg-slate-100 text-slate-700",
//             estado === EstadoIMAC.ALTA && "bg-emerald-100 text-emerald-700",
//             estado === EstadoIMAC.MODIFICACION && "bg-amber-100 text-amber-700",
//             estado === EstadoIMAC.CONSULTA && "bg-blue-100 text-blue-700"
//           )}
//         >
//           {estado}
//         </span>
//       </div>

//       {/* Botones IMAC */}
//       <div className="flex flex-row gap-2">
//         <button type="button" onClick={toInicial} className="rounded-md border border-slate-200 bg-white/10 px-3 text-sm text-slate-600 transition hover:bg-slate-100 h-8">
//           INICIAL
//         </button>
//         <button type="button" onClick={toModificacion} className="rounded-md border border-amber-200 bg-white/10 px-3 text-sm text-amber-700 transition hover:bg-amber-100 h-8">
//           MODIFICACIÓN
//         </button>
//         <button type="button" onClick={toAlta} className="rounded-md border border-emerald-200 bg-white/10 px-3 text-sm text-emerald-700 transition hover:bg-emerald-100 h-8">
//           ALTA
//         </button>

//         <button type="button" onClick={toConsulta} className="rounded-md border border-blue-200 bg-white/10 px-3 text-sm text-blue-700 transition hover:bg-blue-100 h-8">
//           CONSULTA
//         </button>
//       </div>

//       {/* Separador */}
//       <div className="h-6 w-px bg-slate-200/70" />

//       {/* Limpiar Store */}
//       <button type="button" onClick={handleLimpiarStore} className="rounded-md border border-rose-200 bg-white/10 px-3 text-sm text-rose-700 transition hover:bg-rose-100 h-8">
//         Limpiar
//       </button>
//     </div>
//   );
// }
