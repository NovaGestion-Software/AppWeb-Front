// src/utils/mergeMenus.ts

import { MenuItem } from "@/Components/ui/SideBar/Menus";

// 🔁 Merge recursivo de submenús
function mergeSubmenus(base: MenuItem[], dev: MenuItem[]): MenuItem[] {
  const merged: MenuItem[] = [...base];

  for (const devItem of dev) {
    const existingIndex = merged.findIndex((item) => item.title === devItem.title);

    if (existingIndex !== -1) {
      const existingItem = merged[existingIndex];

      merged[existingIndex] = {
        ...existingItem,
        orden: existingItem.orden ?? devItem.orden, // usa el existente si está
        submenus: mergeSubmenus(
          existingItem.submenus || [],
          devItem.submenus || []
        ),
      };
    } else {
      merged.push(devItem);
    }
  }

  // 🧠 Ordenamos por `orden` si existe
  return merged.sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));
}


export function getMergedMenu(base: MenuItem[], dev: MenuItem[], isDev: boolean): MenuItem[] {
  return isDev ? mergeSubmenus(base, dev) : base;
}
