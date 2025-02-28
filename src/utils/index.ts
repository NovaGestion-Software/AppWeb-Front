export const formatearNumero = (numero: number) => {
  // Redondeamos el número a 2 decimales
  const numeroRedondeado = Math.round(numero * 100) / 100;

  // Formateamos el número con separadores de miles y 2 decimales
  return numeroRedondeado.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
