export default function SelectedTablesComponent() {
  return (
    <>
      <div className="flex gap-2">
    {/** Aca seria un mapeo de los ids disponibles para imprimir
     * el id tiene que venir relacionado a un nombre.
     */}

     <ul>
        <li>
            <span>Nombre de la Tabla 1</span>
            <input type="checkbox" id="tabla1" name="tabla1" />
        </li>
        <li>
            <span>Nombre de la Tabla 2</span>
            <input type="checkbox" id="tabla2" name="tabla2" />
        </li>
     </ul>
      </div>
    </>
  );
}