// // /Proovedores/Data/hydrate/hidratarDesdeRegistro.ts
// import { EstadoIMAC } from "../../Store/Status/types";
// import { useProovedoresStore } from "../../Store/Store";
// import { RegistroProveedor } from "../_mock/db";

// export function hidratarDesdeRegistro(reg: RegistroProveedor) {
//   const s = useProovedoresStore.getState();

//   // Identificación
//   s.setIdentificacionAll?.({
//     codigo: reg.codigo ?? "",
//     razonSocial: reg.nombre ?? "",
//     nombreFantasia: reg.nombreFantasia ?? "",
//   });

//   // Datos comerciales
//   s.setDatosComercialesAll?.({
//     inhabilitado: !!reg.inhabilitado,
//     fechaAlta: reg.fechaAlta ?? null,
//     telefono1: reg.telefono1 ?? "",
//     telefono2: reg.telefono2 ?? "",
//     fax1: reg.fax1 ?? "",
//     fax2: reg.fax2 ?? "",
//     domicilio: reg.domicilio ?? "",
//     entreCalles1: reg.entreCalles1 ?? reg.entreCalles ?? "",
//     entreCalles2: reg.entreCalles2 ?? "",
//     localidad: reg.localidad ?? "",
//     cp: reg.cp ?? "",
//     provincia: reg.provincia ?? "",
//     email: reg.email ?? "",
//     lat: reg.lat ?? "",
//     lng: reg.lng ?? "",
//   });

//   // Impositivos (situación fiscal + retenciones)
//   s.setDatosImpositivosAll?.({
//     situacionFiscal: {
//       condTrib: reg.condTrib ?? "",
//       tipoDoc: reg.tipoDoc ?? "CUIT",
//       cuit: reg.cuit ?? "",
//       ingBrutos: reg.ingBrutos ?? "",
//     },
//     retenciones: (reg.retenciones ?? []).map((x, i) => ({
//       id: x.id ?? `${reg.codigo}-ret-${i}`,
//       tipo: x.tipo ?? "",
//       regimen: x.regimen ?? "",
//       exento: !!x.exento,
//       certificado: x.certificado ?? "",
//       vigenciaDesde: x.vigenciaDesde ?? "",
//       vigenciaHasta: x.vigenciaHasta ?? "",
//     })),
//   });

//   // Forma de pago (si viene)
//   s.setFormaPagoAll?.({
//     categoria: reg.categoria ?? "",
//     formaHabitual: reg.formaHabitual ?? "",
//     frecuenciaVisitasDias: reg.frecuenciaVisitasDias ?? 0,
//     demoraEntregasDias: reg.demoraEntregasDias ?? 0,
//     plazoPagoDias: reg.plazoPagoDias ?? 0,
//     facturacionPesos: !!reg.facturacionPesos,
//     facturacionDolares: !!reg.facturacionDolares,
//     observaciones: reg.observaciones ?? "",
//   });

//   // Flags / estado
//   s.setCambiosPendientes?.(false);
//   s.setProcessing?.(false);
//   s.setEstado?.(EstadoIMAC.CONSULTA);
// }
