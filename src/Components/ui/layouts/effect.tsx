import React from "react";

// Agrega esta función helper
export const useTextOverflow = (ref: React.RefObject<HTMLElement>) => {
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  React.useEffect(() => {
    if (ref.current) {
      setIsOverflowing(
        ref.current.scrollWidth > ref.current.offsetWidth
      );
    }
  }, [ref]);

  return isOverflowing;
};