# Informe Venta Por Hora View

Esta vista es la de un informe basado en un rango de fechas que se encarga de tomar los datos recibidos y crear un indice segun los horarios de venta de las distintas sucursales para mostrar en una tabla el total de datos de ventas basados en distintos horarios del dia.


# Características

-   Selecciona rango de fechas.
-   Procesa la respuesta y la transforma en datos para la tabla.
-   Calcula porcentaje de datos seleccionados.
-   Setea los elementos para utilizarse como filtro en modal.
-   Lista con sucursales mostrandose que se actualiza con filtros en modal.
-   Seccion de destacados (hora e importe).
-   Resalta en tabla los elementos destacados (N. Operaciones, importe y pares).
-   Grafico que muestra el pico del Numero de Operaciones.
-   Tabla con footer que muestra los totales.
-   Fn para imprimir tabla, crear un excel y borrar los datos.
-   Navegación por teclado (↑, ↓, Enter, Escape)    
-   Estilos responsivos con soporte para breakpoints (1440px, 1536px)    
-   Compatible con `ClipLoader` para mostrar estados de carga    

## Instalación

### Dependencias necesarias


### Dependencias necesarias submodulos

```
npm install @table-library/react-table-library react-spinners @tanstack/react-query sweetalert2 dayjs antd @tremor/react
```


## Componentes Utilizados submodulos.

* Herramientas components
* Modal Filtro
* ShowAlert
* GraficoConZoom
* RangeDatesInput
* Destacados
* ListaFiltrosAplicados

## Funciones Utilizadas

### ExtraerItemsDeIndice 
Funcion para extraer el indice de los datos recibidos.
#### Parametros: data: 
                    data: ventaPorHora, 
                    nivel1: "info",
                    nivel2: "horaini"
**Retorna**: indiceTabla.

### AgruparPorIndice 
Funcion para extraer el indice de los datos recibidos. 
#### Parametros: 
            data: ventaPorHora, 
            filtrosSeleccionados: sucursalesSeleccionadasStr,
            itemsDeIndice: indiceTabla,
            config:     {
                        filtroKey: 'nsucursal',
                        agrupadorKey: 'horaini',
                        innerArrayKey: 'info',
                        sumaKeys: ['importe', 'cantidad', 'pares'],
                        convertir: ['importe'],
                        };,
            convertirFn: formatearNumero
**Retorna**: datos, totales 

### crearDataParaTablaModular 
Funcion para crear datos en el formato que lo espera la tabla.
#### Parametros: 
            datosAgrupados: datos, 
            totales: totales,
            config:    {
                        agrupadorKey: 'horaini',
                        columnas: [
                          {
                            key: 'cantidad',
                            label: 'nOperaciones',
                            calcularPorcentaje: true,
                            totalKey: 'cantidad',
                          },
                          {
                            key: 'importe',
                            label: 'importe',
                            calcularPorcentaje: true,
                            totalKey: 'importe',
                            parseNumber: true,
                          },
                          {
                            key: 'pares',
                            label: 'pares',
                            calcularPorcentaje: true,
                            totalKey: 'pares',
                          },
                        ],};,
**Retorna**: filasGenericas

### obtenerVentasHora =
Fn fetch para obtener datos de endpoint.
#### Parametros: 
                fechas.
**Retorna**: data => ventasPorHora

### ObtenerValorMaximoConIndice =
Fn para en la tabla encontrar el elemento de mayor valor que devuelve el indice y el valor.
#### Parametros: 
            data: filas,
            key: "importe",
            indiceKey: "horaini" 
**Retorna**: maxImporteValor

### ExtraerItems =
Fn que corre en un useEffect para extraer y setear items que van a usarse para filtro.
#### Parametros: 
            data: ventasPorHora,
            itemsKeysGroup: { nsucursal: 'nsucursal', sucursal: 'sucursal' },
            itemsSeleccionados: sucursalesSeleccionadas,
            setItemsDisponibles: setSucursalesDisponibles,
            setItemsSeleccionados: setSucursalesSeleccionadas,
**Retorna**: Setea sucursales disponibles y seleccionadas para filtro.

### extraerMaxIds =
Encuentra el id de la tabla que corresponde a los valores maximos.
Es utilizada en props.
#### Parametros: 
            data: dataParaTabla,
            group: ["nOperaciones", "importe", "pares"],
        
**Retorna**: maxIds.


### handleFetchData =
Corre peticion de datos y en caso de error setea el foco en el RangeDateInput.

### handleClearData =
Setea en falso isProcessing y footer,
Limpia la store de data(ventasPorHora), y filtros (sucursalesDisponibles y sucursalesSeleccionadas)
y setea el foco en el RangeDateInput.

### handleEscapeKey =
Shorcut de escape para correr handleClearData.

### FormatearNumero
Fn para formatear numeros con puntos separadores de mil y comas para los centavos.
Fn que lo Utilizan: agruparPorIndice, maxImporteValor,totalImporteFormateado.


## Variables Importantes

**fechas** = 
Rango de fechas para el informe seleccionado.

_Retorno de_: RangeDatesInput.

**ventasPorHora** = 
Data de la peticion al backend.

_Retorno de_: mutationFn.

**sucursalesDisponiblesStr**, **sucursalesSeleccionadasStr** = 
Array de strings con sucursales.

_Retorno de_: mapeo sobre SucursalesDisponibles y SucursalesSeleccionadas.

**indiceTabla** = 
Rango de horarios que se utilizan para el indice de la tabla

_Retorno de_: ExtraerItemsDeIndice.

**datos** = 
Datos de importe, noperaciones y pares separados por rangos de horarios.

_Retorno de_: agruparPorIndice.

**totales** = 
La suma total de todas las operaciones, importes vendidos y pares.

_Retorno de_: agruparPorIndice.

**filasGenericas** = 
Estructura necesaria para la tabla sin tipado.

_Retorno de_: crearDataParaTablaModular.

**filas** = 
Estructura necesaria para la tabla tipado para con VentaPorHora[].

_Info necesaria_: filasGenericas.

**maxImporteValor** = 
Es un objeto con la row de la tabla que tiene el valor maximo separado por el indice, y el valor del importe maximo.

_Retorno de_: obtenerValorMaximoConIndice.

**maxImporteFormateado** = 
Es el importe encontrado en maxImporteValor pero formateado con puntos y comas de centavos.

_Retorno de_: formatearNumero y maxImporteValor.

**totalImporteFormateado** = 
Es el total de importe de todas las operaciones en tabla formateado con puntos y comas de centavos.

_Retorno de_: formatearNumero y totales.importe.

**datosParaFooter** = 
Objeto con estructura de las filas donde se rempalaza noperaciones,pares e importe con los totales de las respectivas categorias.

_Info necesaria_: totales.

**renderSucursalesItem** = 
Render para modal de filtros de sucursales.

**indiceString** = 
String para mostrar la fechas de los destacados.

_Info necesaria_: fechas.

**destacadosObject** = 
Objeto para setear el componente de destacados.


_Info necesaria_: indiceString, maxImporteFormateado y maxImporteValor.indice.

**configuracionGrafico** = 
Objeto para setear el componente de grafico con zoom.

_Info necesaria_: keys de data para mostrar en grafico.




## Comportamiento Adicional

- Al ingresar a la vista pone el foco en el RangeDatesInput
- Al procesar un informe pone el foco en la tabla y selecciona el primer item.
- El grafico cuenta con un boton para agrandarlo.
- Permite la navegacion
- HandleKeyDowns
	 - **ArrowDown y ArrowUp** para navegar entre items.
	 - **Enter** para ver informacion del seleccionado actualmente.
	 - **Escape**  Vacia el informe.
- Footer Dinamico

##### Ventas Por Hora Diagrama

![Diagrama de flujo](/public/img/Diagramas/VentasPorHora.png)