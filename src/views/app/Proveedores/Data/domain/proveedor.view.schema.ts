import { z } from "zod";
import { ProveedorDomainSchema } from "./proveedor.domain.schema";

export const ProveedorViewSchema = ProveedorDomainSchema
  .partial()              
  .catchall(z.unknown());  

export type ProveedorView = z.infer<typeof ProveedorViewSchema>;
