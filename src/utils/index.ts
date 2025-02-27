export const formatearNumero = (numero: number) => {
  // Redondeamos el número y eliminamos los decimales
  const numeroRedondeado = Math.round(numero);

  // Formateamos el número con separadores de miles
  return numeroRedondeado.toLocaleString('es-AR');
};
