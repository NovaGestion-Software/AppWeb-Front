export function printElementsById(ids: (string | number)[]) {
  const tablas = ids
    .map((id) => document.getElementById(`${id}`)?.cloneNode(true) as HTMLElement)
    .filter(Boolean);

  if (!tablas.length) {
    alert("No se encontraron las tablas seleccionadas");
    return;
  }

  const printWindow = window.open("", "_blank", "width=800,height=900");
  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head><title>Impresión</title></head>
      <body>${tablas.map((t) => t.outerHTML).join("<hr/>")}</body>
    </html>
  `);
  printWindow.document.close();

  printWindow.onload = () => setTimeout(() => printWindow.print(), 300);
}
