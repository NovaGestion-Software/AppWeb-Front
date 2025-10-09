import { CajasSeccionItemNum } from "../../_shared/types/types";

export function filterByExcludedSections(
  data: CajasSeccionItemNum[],
  excluded: readonly string[],
): CajasSeccionItemNum[] {
  const set = new Set(excluded);
  return data.filter((x) => !set.has(x.seccion));
}
