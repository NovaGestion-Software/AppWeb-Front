
export const formatPrice = (price: string | number): string => {
    const numberPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(numberPrice);
  };
  
  export const simplePriceFormat = (price: string): string => {
    return `$${parseFloat(price).toFixed(2).replace('.', ',')}`;
  };