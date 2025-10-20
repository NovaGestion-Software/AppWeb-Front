type PrintOptions = {
  title?: string;              // Título de la ventana de impresión
  pageBreakBetween?: boolean;  // Insertar salto de página entre IDs
  includeStyles?: boolean;     // Incluir <link rel="stylesheet"> y <style> del documento
};

function copyFormValues(src: HTMLElement, clone: HTMLElement) {
  // Inputs
  const srcInputs = src.querySelectorAll<HTMLInputElement>('input');
  const cloneInputs = clone.querySelectorAll<HTMLInputElement>('input');
  srcInputs.forEach((srcEl, i) => {
    const cl = cloneInputs[i];
    if (!cl) return;
    switch (srcEl.type) {
      case 'checkbox':
      case 'radio':
        cl.checked = srcEl.checked;
        break;
      case 'file':
        // No se puede copiar File por seguridad; se deja vacío
        break;
      default:
        cl.value = srcEl.value ?? '';
        break;
    }
  });

  // Textareas
  const srcTextareas = src.querySelectorAll<HTMLTextAreaElement>('textarea');
  const cloneTextareas = clone.querySelectorAll<HTMLTextAreaElement>('textarea');
  srcTextareas.forEach((srcEl, i) => {
    const cl = cloneTextareas[i];
    if (!cl) return;
    cl.value = srcEl.value ?? '';
    cl.textContent = srcEl.value ?? ''; // por si el motor usa textContent
  });

  // Selects
  const srcSelects = src.querySelectorAll<HTMLSelectElement>('select');
  const cloneSelects = clone.querySelectorAll<HTMLSelectElement>('select');
  srcSelects.forEach((srcEl, i) => {
    const cl = cloneSelects[i];
    if (!cl) return;
    cl.selectedIndex = srcEl.selectedIndex;
    // Copiar selected de cada option (multi, etc.)
    const srcOptions = srcEl.querySelectorAll('option');
    const cloneOptions = cl.querySelectorAll('option');
    srcOptions.forEach((o, idx) => {
      const co = cloneOptions[idx];
      if (co) co.selected = o.selected;
    });
  });
}

function getHeadHTML(options?: PrintOptions) {
  const pieces: string[] = [];
  pieces.push(`<meta charset="utf-8"/>`);
  pieces.push(`<meta name="viewport" content="width=device-width, initial-scale=1"/>`);
  if (options?.title) pieces.push(`<title>${options.title}</title>`);

  if (options?.includeStyles !== false) {
    // Incluir <link rel="stylesheet"> y <style> tal cual
    document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]').forEach(l => {
      // Clonamos como HTML para evitar CORS al leer reglas
      pieces.push(l.outerHTML);
    });
    document.querySelectorAll<HTMLStyleElement>('style').forEach(s => {
      pieces.push(s.outerHTML);
    });
  }

  // Estilos de impresión (forzar visibilidad de tabpanels y algunos resets)
  pieces.push(`
    <style>
      /* Asegura que los tabpanels se muestren en impresión */
      [role="tabpanel"] { display: block !important; visibility: visible !important; height: auto !important; }
      /* Evitar elementos de UI no deseados */
      button, [role="button"], .no-print { display: none !important; }
      /* Salto entre secciones */
      .page-break { page-break-after: always; }
      /* Inputs más legibles en papel */
      input, textarea, select { border: 1px solid #000 !important; }
      /* Quita scrollbars internas que a veces aparecen en clones */
      * { overflow: visible !important; }
      @page { size: auto; margin: 12mm; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    </style>
  `);

  return pieces.join('\n');
}

export function printElementsById(ids: (string | number)[], options?: PrintOptions) {
  const nodes: HTMLElement[] = [];

  ids.forEach((id) => {
    const el = document.getElementById(String(id));
    if (!el) return;

    // Clonar
    const clone = el.cloneNode(true) as HTMLElement;

    // Copiar estado de formularios
    copyFormValues(el, clone);

    nodes.push(clone);
  });

  if (!nodes.length) {
    alert("No se encontraron elementos con los IDs indicados.");
    return;
  }

  const printWindow = window.open("", "_blank", "width=900,height=1000");
  if (!printWindow) return;

  // Construir body con o sin saltos de página
  const bodyHTML = nodes
    .map((n, idx) => {
      const section = `<section>${n.outerHTML}</section>`;
      if (options?.pageBreakBetween && idx < nodes.length - 1) {
        return section + `<div class="page-break"></div>`;
      }
      return section;
    })
    .join("");

  printWindow.document.write(`
    <html>
      <head>
        ${getHeadHTML({ ...options })}
      </head>
      <body>${bodyHTML}</body>
    </html>
  `);

  printWindow.document.close();

  // Pequeño delay para cargar estilos externos antes de imprimir
  printWindow.onload = () => setTimeout(() => {
    try {
      printWindow.focus();
      printWindow.print();
    } finally {
      // Cierra la ventana al terminar (opcional)
      printWindow.close();
    }
  }, 300);
}
