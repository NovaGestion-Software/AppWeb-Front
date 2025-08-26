export const EXCLUDED_SECTIONS_FOR_NET = ['00000D', '00000I', '00000T', '0000GE'] as const;
export type ExcludedSection = typeof EXCLUDED_SECTIONS_FOR_NET[number];
