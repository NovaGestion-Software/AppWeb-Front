import { useRef, useState, useCallback } from "react";

type IdKey = number | string;

/**
 * Hook para carousels horizontales **controlados por scroll**.
 *
 * Permite registrar múltiples contenedores (identificados por `id`) y provee helpers
 * para desplazarse a izquierda/derecha, ir a un índice específico y mantener
 * el índice activo (ítem más cercano al borde izquierdo del contenedor).
 *
 * - Ignora elementos `button` dentro del contenedor al calcular índices (útil para flechas overlay).
 * - El desplazamiento usa `behavior: "smooth"`.
 *
 * @example
 * ```tsx
 * const { setRef, handleScroll, scrollLeft, scrollRight, activeIndex, scrollToIndex } = useHorizontalCarousel();
 *
 * <div className="relative">
 *   <button onClick={() => scrollLeft("productos")}>◀</button>
 *   <div
 *     ref={setRef("productos")}
 *     onScroll={() => handleScroll("productos")}
 *     className="overflow-x-auto whitespace-nowrap scroll-smooth"
 *   >
 *     {items.map((it, i) => (
 *       <div key={it.id} className="inline-block w-64">{it.content}</div>
 *     ))}
 *   </div>
 *   <button onClick={() => scrollRight("productos")}>▶</button>
 *   <p>Índice activo: {activeIndex["productos"] ?? 0}</p>
 *   <button onClick={() => scrollToIndex("productos", 3)}>Ir al 4°</button>
 * </div>
 * ```
 *
 * @returns Objeto con manejadores y estado:
 * - `setRef(id)`: callback ref para el contenedor del carousel.
 * - `activeIndex`: mapa `{ [id]: number }` con el índice activo por contenedor.
 * - `handleScroll(id)`: handler para `onScroll`, actualiza `activeIndex`.
 * - `scrollLeft(id)`: desplaza 350px a la izquierda.
 * - `scrollRight(id)`: desplaza 350px a la derecha.
 * - `scrollToIndex(id, index)`: desplaza hasta que el ítem `index` quede a la vista.
 */
export function useHorizontalCarousel() {
  const containerRefs = useRef<Record<IdKey, HTMLDivElement | null>>({});
  const [activeIndex, setActiveIndex] = useState<Record<IdKey, number>>({});

  /**
   * Genera un callback ref para registrar el contenedor del carousel con una clave `id`.
   * @param id - Identificador único del carousel.
   */
  const setRef = useCallback(
    (id: IdKey) => (el: HTMLDivElement | null) => {
      containerRefs.current[id] = el;
    },
    []
  );

  /**
   * Desplaza el contenedor identificado por `id` una cantidad `delta` en el eje X.
   * @param id - Identificador del carousel.
   * @param delta - Cantidad en píxeles (positiva a la derecha, negativa a la izquierda).
   */
  const scrollBy = useCallback((id: IdKey, delta: number) => {
    const el = containerRefs.current[id];
    el?.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  /**
   * Desplaza 350px a la izquierda.
   * @param id - Identificador del carousel.
   */
  const scrollLeft = useCallback((id: IdKey) => scrollBy(id, -350), [scrollBy]);

  /**
   * Desplaza 350px a la derecha.
   * @param id - Identificador del carousel.
   */
  const scrollRight = useCallback((id: IdKey) => scrollBy(id, 350), [scrollBy]);

  /**
   * Handler para `onScroll` que determina el índice del ítem visible más cercano
   * al borde izquierdo del contenedor (excluye nodos `button`).
   * @param id - Identificador del carousel.
   */
  const handleScroll = useCallback((id: IdKey) => {
    const container = containerRefs.current[id];
    if (!container) return;

    const children = Array.from(container.children).filter(
      (c) => !(c as HTMLElement).tagName.toLowerCase().includes("button")
    );

    let closest = 0;
    let min = Infinity;
    const crect = container.getBoundingClientRect();

    children.forEach((child, i) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const dist = Math.abs(rect.left - crect.left);
      if (dist < min) {
        min = dist;
        closest = i;
      }
    });

    setActiveIndex((prev) => ({ ...prev, [id]: closest }));
  }, []);

  /**
   * Desplaza el carousel hasta que el ítem `index` quede alineado a la vista.
   * @param id - Identificador del carousel.
   * @param index - Índice del ítem destino (0-based).
   */
  const scrollToIndex = useCallback((id: IdKey, index: number) => {
    const container = containerRefs.current[id];
    if (!container) return;

    const children = Array.from(container.children).filter(
      (c) => !(c as HTMLElement).tagName.toLowerCase().includes("button")
    );

    const item = children[index] as HTMLElement | undefined;
    if (item) {
      container.scrollTo({
        left: item.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
    }
  }, []);

  return {
    setRef,
    activeIndex,
    handleScroll,
    scrollLeft,
    scrollRight,
    scrollToIndex,
  };
}
