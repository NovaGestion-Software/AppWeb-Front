// /Proovedores/Data/_mock/search.ts
import { MOCK_DB, RegistroProveedor } from "./db";

export async function buscarPorCodigo(code: string): Promise<RegistroProveedor | null> {
  const k = code.trim();
  if (!k) return null;
  // simula latencia si querés:
  // await new Promise(r => setTimeout(r, 200));
  return MOCK_DB[k] ?? null;
}
