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

Dependencias necesarias


Dependencias necesarias submodulos

    npm install @table-library/react-table-library react-spinners
    npm install @tanstack/react-query
    npm install sweetalert2
    npm install dayjs
    npm install antd
    npm install tremor/react


## Componentes Utilizados submodulos.

Herramientas components
Modal Filtro
ShowAlert
GraficoConZoom
RangeDatesInput
Destacados
ListaFiltrosAplicados

## Funciones Utilizadas

ExtraerItemsDeIndice =
Funcion para extraer el indice de los datos recibidos.
Parametros: data: ventaPorHora, nivel1: "info", nivel2: "horaini"
Retorna: indiceTabla.

AgruparPorIndice =
Funcion para extraer el indice de los datos recibidos.
Parametros: 
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
Retorna: datos, totales 

crearDataParaTablaModular =
Funcion para crear datos en el formato que lo espera la tabla.
Parametros: 
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
Retorna: filasGenericas

obtenerVentasHora =
Fn fetch para obtener datos de endpoint.
Parametros: fechas.
Retorna: data => ventasPorHora

ObtenerValorMaximoConIndice =
Fn para en la tabla encontrar el elemento de mayor valor que devuelve el indice y el valor.
Parametros: 
            data: filas,
            key: "importe",
            indiceKey: "horaini" 
Retorna: maxImporteValor

ExtraerItems =
Fn que corre en un useEffect para extraer y setear items que van a usarse para filtro.
Parametros: 
            data: ventasPorHora,
            itemsKeysGroup: { nsucursal: 'nsucursal', sucursal: 'sucursal' },
            itemsSeleccionados: sucursalesSeleccionadas,
            setItemsDisponibles: setSucursalesDisponibles,
            setItemsSeleccionados: setSucursalesSeleccionadas,
Retorna: Setea sucursales disponibles y seleccionadas para filtro.



handleFetchData =
Corre peticion de datos y en caso de error setea el foco en el RangeDateInput.

handleClearData =
Setea en falso isProcessing y footer,
Limpia la store de data(ventasPorHora), y filtros (sucursalesDisponibles y sucursalesSeleccionadas)
y setea el foco en el RangeDateInput.

handleEscapeKey =
Shorcut de escape para correr handleClearData.

FormatearNumero
Fn para formatear numeros con puntos separadores de mil y comas para los centavos.
Fn que lo Utilizan: agruparPorIndice, maxImporteValor,totalImporteFormateado.


## Variables Importantes

fechas = 
Rango de fechas para el informe seleccionado.
Retorno de: RangeDatesInput.

ventasPorHora = 
Data de la peticion al backend.
Retorno de: mutationFn.

sucursalesDisponiblesStr, sucursalesSeleccionadasStr = 
Array de strings con sucursales.
Retorno de: mapeo sobre SucursalesDisponibles y SucursalesSeleccionadas.

indiceTabla = 
Rango de horarios que se utilizan para el indice de la tabla
Retorno de: ExtraerItemsDeIndice.

datos = 
Datos de importe, noperaciones y pares separados por rangos de horarios.
Retorno de: agruparPorIndice.

totales = 
La suma total de todas las operaciones, importes vendidos y pares.
Retorno de: agruparPorIndice.

filasGenericas = 
Estructura necesaria para la tabla sin tipado.
Retorno de: crearDataParaTablaModular.

filas = 
Estructura necesaria para la tabla tipado para con VentaPorHora[].
Info necesaria: filasGenericas.

maxImporteValor = 
Es un objeto con la row de la tabla que tiene el valor maximo separado por el indice, y el valor del importe maximo.
Retorno de: obtenerValorMaximoConIndice.

maxImporteFormateado = 
Es el importe encontrado en maxImporteValor pero formateado con puntos y comas de centavos.
Retorno de: formatearNumero y maxImporteValor.

totalImporteFormateado = 
Es el total de importe de todas las operaciones en tabla formateado con puntos y comas de centavos.
Retorno de: formatearNumero y totales.importe.

datosParaFooter = 
Objeto con estructura de las filas donde se rempalaza noperaciones,pares e importe con los totales de las respectivas categorias.
Info necesaria: totales.

renderSucursalesItem = 
Render para modal de filtros de sucursales.

indiceString = 
String para mostrar la fechas de los destacados.
Info necesaria: fechas.

destacadosObject = 
Objeto para setear el componente de destacados.
Info necesaria: indiceString, maxImporteFormateado y maxImporteValor.indice.

configuracionGrafico = 
Objeto para setear el componente de grafico con zoom.
Info necesaria: keys de data para mostrar en grafico.




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

---
config:
  layout: fixed
---
flowchart TD
    A["RangeDatesInput"] -- Fechas --> B("ObtenerVentasPorHora")
    B -- "data.data" --> n2["ventasPorHora"]
    n2 --> n3@{ label: "<div style=\"color:\"><span style=\"color:\">extraerItemsDeIndice</span></div>" } & n7["AgruparPorIndice"] & n10["extraerItems"]
    n3 --> n4@{ label: "<div style=\"color:\"><span style=\"color:\">indiceTabla</span></div>" }
    n6["nivel1: info, nivel2: horaini"] --> n3
    n4 --> n7
    n10 --> n13["SucursalesDisponibles<br>SucursalesSeleccionadas"]
    n13 --> n16["SucursalesSelecciondasStr"] & n35["SucursalesDisponiblesStr"]
    n16 --> n7 & n34["FiltroModal.tsx"]
    n17@{ label: "<span style=\"padding-left:\">const config: ConfigKeys = {</span><span style=\"padding-left:\"> <br>filtroKey: 'nsucursal',</span><span style=\"padding-left:\"> <br>agrupadorKey: 'horaini',</span><span style=\"padding-left:\"> <br>innerArrayKey: 'info',</span><span style=\"padding-left:\"> <br>sumaKeys: ['importe', 'cantidad', 'pares'],</span><span style=\"padding-left:\"> <br>convertir: ['importe'],</span><span style=\"padding-left:\"> }</span>" } --> n7
    n7 --> n19["Datos"] & n20["Totales"]
    n19 --> n21["crearDataParaTablaModular"]
    n20 --> n21 & n33["DatosFooter"]
    n23@{ label: "<div style=\"color:\"><div><span style=\"color:\">const</span><span style=\"color:\"> </span><span style=\"color:\">configTabla</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">ConfigTabla</span><span style=\"color:\"> </span><span style=\"color:\">=</span><span style=\"color:\"> {</span></div><div><span style=\"color:\">  </span><span style=\"color:\">agrupadorKey</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">'horaini'</span><span style=\"color:\">,</span></div><div><span style=\"color:\">  </span><span style=\"color:\">columnas</span><span style=\"color:\">:</span>{</div><div><span style=\"color:\">    </span><span style=\"color:\">key</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">'cantidad'</span><span style=\"color:\">,</span></div><div><span style=\"color:\">    </span><span style=\"color:\">label</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">'nOperaciones'</span><span style=\"color:\">,</span></div><div><span style=\"color:\">    </span><span style=\"color:\">calcularPorcentaje</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">true</span><span style=\"color:\">,</span></div><div><span style=\"color:\">    </span><span style=\"color:\">totalKey</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">'cantidad'</span><span style=\"color:\">,</span>},</div><div><span style=\"color:\">   {</span>key: 'importe',</div><div><span style=\"color:\">    </span><span style=\"color:\">label</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">'importe'</span><span style=\"color:\">,</span></div><div><span style=\"color:\">    </span><span style=\"color:\">calcularPorcentaje</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">true</span><span style=\"color:\">,</span></div><div><span style=\"color:\">    </span><span style=\"color:\">totalKey</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">'importe'</span><span style=\"color:\">,</span></div><div><span style=\"color:\">    </span><span style=\"color:\">parseNumber</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">true</span><span style=\"color:\">,</span>},</div><div><span style=\"color:\">   {</span>key: 'pares',</div><div><span style=\"color:\">    </span><span style=\"color:\">label</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">'pares'</span><span style=\"color:\">,</span></div><div><span style=\"color:\">    </span><span style=\"color:\">calcularPorcentaje</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">true</span><span style=\"color:\">,</span></div><div><span style=\"color:\">    </span><span style=\"color:\">totalKey</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">'pares'</span><span style=\"color:\">,</span>},],};</div></div>" } --> n21
    n25["filasGenericas"] -- Tipado: VentasPorHora[] --> n26["filas"]
    n21 --> n25
    n26 --> n27["TablaVentaPorHora.tsx"] & n29@{ label: "<div style=\"color:\"><span style=\"color:\">obtenerValorMaximoConIndice</span></div>" } & n36["GraficoConZoom.tsx"]
    n30["key: importe,<br>indiceKey: horaini"] --> n29
    n31["Destacados"] --> n32["DestacadosObject"]
    n32 --> n28["Destacados.tsx"]
    n29 --> n31
    n33 --> n27 & n39["HerramientasComponent.tsx"]
    n35 --> n34
    n37@{ label: "<div style=\"color:\"><span style=\"color:\">datosParaGraficos</span><span style=\"color:\">=</span><span style=\"color:\">{</span><span style=\"color:\">filas</span><span style=\"color:\">}<br></span><span style=\"color:\"> </span><span style=\"color:\">index</span><span style=\"color:\">=</span><span style=\"color:\">horaini</span><span style=\"color:\"> <br></span><span style=\"color:\">widthGraficoModal</span><span style=\"color:\">=</span><span style=\"color:\">w-[60rem]</span><span style=\"color:\"> <br></span><span style=\"color:\">categorias</span><span style=\"color:\">=</span><span style=\"color:\">{</span><span style=\"color:\">[</span><span style=\"color:\">'nOperaciones'</span><span style=\"color:\">]</span><span style=\"color:\">}</span><span style=\"color:\"> <br></span><span style=\"color:\">tituloModal</span><span style=\"color:\">=</span><span style=\"color:\">N° Operaciones por Hora</span><span style=\"color:\"> <br></span><span style=\"color:\">keysMap</span><span style=\"color:\">=</span><span style=\"color:\">{</span><span style=\"color:\">configuracionGrafico</span><span style=\"color:\">}</span></div>" } --> n36
    n38@{ label: "<div style=\"color:\"><div><span style=\"color:\"> </span><span style=\"color:\">const</span><span style=\"color:\"> </span><span style=\"color:\">configuracionGrafico</span><span style=\"color:\"> </span><span style=\"color:\">=</span><span style=\"color:\"> [</span></div><div><span style=\"color:\">  { </span><span style=\"color:\">label</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">'horaini'</span><span style=\"color:\">, </span><span style=\"color:\">key</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">'horaini'</span><span style=\"color:\"> },</span></div><div><span style=\"color:\">  { </span><span style=\"color:\">label</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">'nOperaciones'</span><span style=\"color:\">, </span><span style=\"color:\">key</span><span style=\"color:\">:</span><span style=\"color:\"> </span><span style=\"color:\">'nOperaciones'</span><span style=\"color:\"> },</span></div><div><span style=\"color:\"> ];</span></div><br></div>" } --> n37
    n27 -- filas --> n41@{ label: "<div style=\"color:\"><span style=\"color:\">extraerMaxIds</span></div>" }
    n42@{ label: "<span style=\"color:\"> </span><span style=\"font-family:\">const</span><span style=\"color:\"> </span><span style=\"font-family:\">seleccionados</span><span style=\"font-family:\">:</span><span style=\"color:\"> </span><span style=\"font-family:\">GrupoCustom</span><span style=\"color:\">[] </span><span style=\"font-family:\">=</span><span style=\"color:\"> [</span><span style=\"font-family:\">nOperaciones</span><span style=\"color:\">, </span><span style=\"font-family:\">importe</span><span style=\"color:\">, </span><span style=\"font-family:\">pares</span><span style=\"color:\">]</span>" } --> n41
    n41 -- props --> n40["TablaDefault.tsx"]
    n18["Text Block"]
    n3@{ shape: text}
    n7@{ shape: text}
    n10@{ shape: text}
    n4@{ shape: text}
    n13@{ shape: text}
    n16@{ shape: text}
    n35@{ shape: text}
    n34@{ shape: text}
    n17@{ shape: text}
    n19@{ shape: text}
    n20@{ shape: text}
    n21@{ shape: text}
    n33@{ shape: text}
    n23@{ shape: text}
    n25@{ shape: text}
    n26@{ shape: text}
    n27@{ shape: text}
    n29@{ shape: text}
    n36@{ shape: text}
    n30@{ shape: text}
    n31@{ shape: text}
    n32@{ shape: text}
    n28@{ shape: text}
    n39@{ shape: text}
    n37@{ shape: text}
    n38@{ shape: text}
    n41@{ shape: text}
    n42@{ shape: text}
    n40@{ shape: text}
    n18@{ shape: text}
    style B stroke:#FF6D00
    style n3 stroke:#FF6D00,stroke-width:2px,stroke-dasharray: 0
    style n7 stroke-width:2px,stroke-dasharray: 0,stroke:#FF6D00
    style n10 stroke-width:2px,stroke-dasharray: 0,stroke:#FF6D00
    style n4 stroke-width:2px,stroke-dasharray: 2
    style n6 stroke-width:2px,stroke-dasharray: 2
    style n13 stroke-width:2px,stroke-dasharray: 0
    style n16 stroke-width:2px,stroke-dasharray: 2
    style n35 stroke-width:2px,stroke-dasharray: 2
    style n34 stroke-width:4px,stroke-dasharray: 0,stroke:#2962FF
    style n17 stroke-width:2px,stroke-dasharray: 2,color:#00C853
    style n19 stroke-width:2px,stroke-dasharray: 0
    style n20 stroke-width:2px,stroke-dasharray: 0
    style n21 stroke-width:2px,stroke-dasharray: 0,stroke:#FF6D00
    style n33 stroke-width:2px,stroke-dasharray: 2
    style n23 stroke-width:2px,stroke-dasharray: 2
    style n25 stroke-width:2px,stroke-dasharray: 0
    style n26 stroke-width:2px,stroke-dasharray: 0
    style n27 stroke-width:4px,stroke-dasharray: 0,stroke:#2962FF
    style n29 stroke-width:2px,stroke-dasharray: 0,stroke:#FF6D00
    style n36 stroke-width:4px,stroke-dasharray: 0,stroke:#2962FF
    style n30 stroke-width:2px,stroke-dasharray: 2
    style n31 stroke-width:2px,stroke-dasharray: 0
    style n32 stroke-width:2px,stroke-dasharray: 2
    style n28 stroke-width:4px,stroke-dasharray: 0,stroke:#2962FF
    style n39 stroke-width:4px,stroke-dasharray: 0,stroke:#2962FF
    style n37 stroke-width:2px,stroke-dasharray: 2
    style n38 stroke-width:2px,stroke-dasharray: 2
    style n41 stroke-width:2px,stroke-dasharray: 0,stroke:#FF6D00
    style n42 stroke-width:2px,stroke-dasharray: 2
    style n40 stroke-width:4px,stroke-dasharray: 0,stroke:#2962FF
