/**
 * Result<T>: contrato de retorno uniforme para repos/servicios.
 * - ok: true  => data válida
 * - ok: false => error normalizado (AppError)
 */

import type { AppError } from "./errors";

export type Result<T> = { ok: true; data: T } | { ok: false; error: AppError };

/** Factory: éxito */
export const ok = <T>(data: T): Result<T> => ({ ok: true, data });

/** Factory: error */
export const err = <T = never>(error: AppError): Result<T> => ({ ok: false, error });

/**
 * Utilidad: desempaqueta o lanza una excepción con detalle para flujos sync/async controlados.
 * Úsalo con cuidado en capas internas; en UI preferí manejar el Result explícitamente.
 */
export function unwrap<T>(res: Result<T>): T {
  if (res.ok) return res.data;
  const e = res.error;
  const detail = e.detail ? ` | detail=${e.detail}` : "";
  const http = e.httpStatus ? ` | http=${e.httpStatus}` : "";
  throw new Error(`[${e.ns ?? "GLOBAL"}:${e.code}] ${e.message}${http}${detail}`);
}
