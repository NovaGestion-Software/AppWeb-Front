// /Store/Store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProovedoresEsquema } from "@/schemas/Proovedores/proovedores.esquema";
import { BaseStore, createBaseStore } from "@/utils/helpers/BaseStore";

// 🧩 Slices
import { createTabsSlice, type TabsSlice } from "./Tabs/Tab.slice";
import { createEstadoSlice, type EstadoSlice } from "./Status/status.slice";
import { createIdentificacionSlice, type IdentificacionSlice } from "./Form/Slices/identificacion.slice";
import { createMetadatosSlice, type MetadatosSlice } from "./Form/Slices/metadatos.slice";
import { createDatosComercialesSlice, type DatosComercialesSlice } from "./Form/Slices/datosComerciales.slice";
import { createDatosImpositivosSlice, type DatosImpositivosSlice } from "./Form/Slices/datosImpositivos.slice";
import { createRetencionesSlice, type RetencionesSlice } from "./Form/Slices/retenciones.slice";
import { createFormaPagoSlice, type FormaPagoSlice } from "./Form/Slices/formaPago.slice";
import { createDatosFormSlice, type DatosFormSlice } from "./Form/Slices/formData.slice";
import { createFocusSlice, type FocusSlice } from "./FocusHook/focus.slice";
import { EstadoIMAC } from "./Status/types";
import { ProveedorDomainSchema } from "../Data/domain";


/** Tipado unificado del store de Proveedores */
export type Proveedores = BaseStore &
  EstadoSlice &
  TabsSlice &
  IdentificacionSlice &
  MetadatosSlice &
  DatosComercialesSlice &
  DatosImpositivosSlice &
  RetencionesSlice &
  FormaPagoSlice &
  DatosFormSlice &
  FocusSlice & {
    /** 🔁 Reset global de todos los slices */
    resetAll: () => void;
    mensajeInfo?: string;
    setMensajeInfo: (msg: string | undefined) => void;

    /** 💧 Hidrata todos los slices desde un row crudo del backend (esquema anterior) */
    hydrateAllSlicesFromRow: (row: unknown) => void;

    /** 💧 Hidrata todos los slices desde Domain (nuevo flujo) */
    hydrateAllSlicesFromDomain: (row: unknown) => void;
  };

/** 🧠 Store principal de Proveedores */
export const useProveedoresStore = create<Proveedores>()(
  persist(
    (set, get, store) => ({
      ...createBaseStore(set as any, get as any),

      // Slices de UI/estado
      ...createTabsSlice(set, get, store),
      ...createEstadoSlice(set, get, store),

      // Slices de datos (ordenados)
      ...createIdentificacionSlice(set, get, store),
      ...createMetadatosSlice(set, get, store),
      ...createDatosComercialesSlice(set, get, store),
      ...createDatosImpositivosSlice(set, get, store),
      ...createRetencionesSlice(set, get, store),
      ...createFormaPagoSlice(set, get, store),
      ...createFocusSlice(set, get, store),

      // Orquestador de formulario (snapshots/hydrate)
      ...createDatosFormSlice(set, get, store),

      mensajeInfo: undefined,
      setMensajeInfo: (msg) => set({ mensajeInfo: msg }),

      /** 💧 Hidrata todos los slices desde un row del backend (flujo ANTERIOR, crudo) */
      hydrateAllSlicesFromRow: (row: unknown) => {
        const r = ProovedoresEsquema.safeParse(row);
        if (!r.success) {
          console.error("❌ Zod parse error (proveedor):", r.error.issues);
          return;
        }

        const p = r.data;
        const s = useProveedoresStore.getState();

        // 1️⃣ Identificación — solo ID + nombres
        s.resetIdentificacion?.();
        s.setIdentificacionAll?.({
          idprovee: p.idprovee,
          nombre: p.nombre,
          nfantasia: p.nfantasia,
        });

        // 2️⃣ Datos Comerciales — domicilio / contacto / geo / provincia
        s.resetDatosComerciales?.();
        s.setDatosComercialesAll?.({
          domicilio1: p.domicilio1,
          domicilio2: p.domicilio2,
          localidad: p.localidad,
          cpostal: p.cpostal,
          calle1: p.calle1,
          calle2: p.calle2,
          latitud: p.latitud,
          longitud: p.longitud,
          email: p.email,
          codarea: p.codarea,
          codarea1: p.codarea1,
          codarea2: p.codarea2,
          telefono: p.telefono,
          telefono1: p.telefono1 ?? p.telefono,
          telefono2: p.telefono2,
          idcodprov: p.idcodprov,
        });

        // 3️⃣ Datos Impositivos — situación fiscal
        s.resetDatosImpositivos?.();
        s.setDatosImpositivosAll?.({
          idctrib: p.idctrib,
          idtdoc: p.idtdoc,
          cuit: p.cuit,
          ibruto: (p.ibruto ?? "").trim(),
        });

        // 4️⃣ Forma de Pago — flags 0/1 → boolean
        s.resetFormaPago?.();
        s.setFormaPagoAll?.({
          fpago: p.fpago ?? "",
          dias_p: p.dias_p ?? 0,
          dias_v: p.dias_v ?? 0,
          dias_e: p.dias_e ?? 0,
          obs: p.obs && String(p.obs).trim() !== "" ? String(p.obs).trim() : undefined,
          f_pesos: !!p.f_pesos,
          f_dolares: !!p.f_dolares,
        });

        // 5️⃣ Retenciones — flat BE
        s.resetRetenciones?.();
        s.setRetencionesAll?.({
          // IB
          idregbru: !!p.idregbru,
          exretbru: !!p.exretbru,
          nexretbru: p.nexretbru,
          fecbru: p.fecbru,
          vtobru: p.vtobru,
          // GAN
          idreggan: !!p.idreggan,
          exretgan: !!p.exretgan,
          nexretgan: p.nexretgan,
          fecgan: p.fecgan,
          vtogan: p.vtogan,
          // IVA
          idregiva: !!p.idregiva,
          exretiva: !!p.exretiva,
          nexretiva: p.nexretiva,
          feciva: p.feciva,
          vtoiva: p.vtoiva,
        });

        // 6️⃣ Metadatos — auditoría + flags de sistema
        s.resetMetadatos?.();
        s.setMetadatosAll?.({
          idnodo: p.idnodo,
          usuario_a: p.usuario_a,
          usuario_m: p.usuario_m,
          usuario_b: p.usuario_b,
          f_alta: p.f_alta,
          f_modi: p.f_modi,
          f_baja: p.f_baja,
          icambio: p.icambio,
          ncambio: p.ncambio,
          inha: !!p.inha, // ← inha pasa a Metadatos (conversión desde 0/1)
        });

        // 💾 Snapshots (modo consulta)
        set({
          // datosIniciales: p,
          datosActuales: null,
        });
      },

      /** 💧 Hidrata todos los slices desde Domain (flujo NUEVO, ya normalizado) */
      hydrateAllSlicesFromDomain: (row: unknown) => {
        const r = ProveedorDomainSchema.safeParse(row);
        if (!r.success) {
          console.error("❌ Zod parse error (proveedor domain):", r.error.issues);
          return;
        }

        const p = r.data;
        const s = useProveedoresStore.getState();

        // 1️⃣ Identificación
        s.resetIdentificacion?.();
        s.setIdentificacionAll?.({
          idprovee: p.idprovee,
          nombre: p.nombre,
          nfantasia: p.nfantasia,
        });

        // 2️⃣ Datos Comerciales
        s.resetDatosComerciales?.();
        s.setDatosComercialesAll?.({
          domicilio1: p.domicilio1,
          domicilio2: p.domicilio2,
          localidad: p.localidad,
          cpostal: p.cpostal,
          calle1: p.calle1,
          calle2: p.calle2,
          latitud: p.latitud,
          longitud: p.longitud,
          email: p.email,
          codarea: p.codarea,
          codarea1: p.codarea1,
          codarea2: p.codarea2,
          telefono: p.telefono,
          telefono1: p.telefono1 ?? p.telefono,
          telefono2: p.telefono2,
          idcodprov: p.idcodprov,
        });

        // 3️⃣ Datos Impositivos
        s.resetDatosImpositivos?.();
        s.setDatosImpositivosAll?.({
          idctrib: p.idctrib,
          idtdoc: p.idtdoc,
          cuit: p.cuit,
          ibruto: (p.ibruto ?? "").trim(),
        });

        // 4️⃣ Forma de Pago — ya boolean en Domain
        s.resetFormaPago?.();
        s.setFormaPagoAll?.({
          fpago: p.fpago ?? "",
          dias_p: p.dias_p ?? 0,
          dias_v: p.dias_v ?? 0,
          dias_e: p.dias_e ?? 0,
          obs: p.obs && String(p.obs).trim() !== "" ? String(p.obs).trim() : undefined,
          f_pesos: p.f_pesos,
          f_dolares: p.f_dolares,
        });

        // 5️⃣ Retenciones — booleans + fechas ISO-like | undefined
        s.resetRetenciones?.();
        s.setRetencionesAll?.({
          idregbru: p.idregbru,
          exretbru: p.exretbru,
          nexretbru: p.nexretbru,
          fecbru: p.fecbru,
          vtobru: p.vtobru,

          idreggan: p.idreggan,
          exretgan: p.exretgan,
          nexretgan: p.nexretgan,
          fecgan: p.fecgan,
          vtogan: p.vtogan,

          idregiva: p.idregiva,
          exretiva: p.exretiva,
          nexretiva: p.nexretiva,
          feciva: p.feciva,
          vtoiva: p.vtoiva,
        });

        // 6️⃣ Metadatos — inha ya boolean
        s.resetMetadatos?.();
        s.setMetadatosAll?.({
          idnodo: p.idnodo,
          usuario_a: p.usuario_a,
          usuario_m: p.usuario_m,
          usuario_b: p.usuario_b,
          f_alta: p.f_alta,
          f_modi: p.f_modi,
          f_baja: p.f_baja,
          icambio: p.icambio,
          ncambio: p.ncambio,
          inha: p.inha,
        });

        // 💾 Snapshots (modo consulta)
        set({
          datosIniciales: p,
          datosActuales: null,
        });
      },

      /** ♻️ Reset global encadenado */
      resetAll: () => {
        // Estado IMAC/flags
        get().setEstado(EstadoIMAC.INICIAL);
        get().setCambiosPendientes?.(false);
        get().setProcessing?.(false);

        // Datos por sección
        get().resetIdentificacion?.();
        get().resetMetadatos?.();
        get().resetDatosComerciales?.();
        get().resetDatosImpositivos?.();
        get().resetRetenciones?.();
        get().resetFormaPago?.();

        // Form data (snapshots)
        get().resetDatosForm?.();

        // Tabs por defecto
        set({ activeTabIndex: 0, activeTabId: "comerciales" });
      },
    }),
    {
      name: "proveedores-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
