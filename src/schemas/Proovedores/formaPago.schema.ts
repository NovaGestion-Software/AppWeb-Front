// /schemas/Proovedores/formaPago.schema.ts
import { z } from "zod";
import { Bool01, TrimmedStr, EmptyTrimToUndef, NumCoerce } from "./primitives";

export const FormaPagoEsquema = z
  .object({
    fpago: TrimmedStr,      // "EFECTIVO"
    dias_p: NumCoerce,      // 30 | "30" -> 30
    dias_v: NumCoerce,
    dias_e: NumCoerce,
    obs: EmptyTrimToUndef,  // ""|null|undefined -> undefined
    f_pesos: Bool01,        // 0/1/"0"/"1"/boolean -> boolean
    f_dolares: Bool01,
  })
  .loose();

export type FormaPago = z.infer<typeof FormaPagoEsquema>;
