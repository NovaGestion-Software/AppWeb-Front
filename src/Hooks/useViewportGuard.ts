import { useEffect, useState } from "react";

export function useViewportGuard(minWidth = 600) {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${minWidth - 1}px)`);

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsBlocked(e.matches);
    };

    handleResize(mediaQuery);
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [minWidth]);

  return isBlocked;
}
