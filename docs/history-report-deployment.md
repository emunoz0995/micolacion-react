# Despliegue del historial paginado

Cambios coordinados entre `micolacion_react` y el repositorio hermano `micolacion_api`, en ramas locales `fix/history-report-performance`.

## Backend primero

1. En `micolacion_api`, instalar dependencias con `npm ci` y ejecutar `npm run test:history`.
2. En el entorno de la base de datos que se desea actualizar, ejecutar `npm run migrate:history-index`. El script comprueba si existe un índice equivalente y crea, de ser necesario, `history_school_created_id` sobre `histories(codigo_colegio, createdAt, id)`. Planificar esta operación según el tamaño de la tabla: crear un índice puede tardar y bloquear escrituras según la versión/configuración de MySQL. Este script no se ejecutó contra producción durante el desarrollo.
3. Desplegar y reiniciar la API. El endpoint `/api/reports/reportHistory/:school_id` responde ahora `{ rows, total, page, pageSize }`; requiere desplegar ambos repositorios coordinadamente porque el frontend anterior espera un array.
4. En el frontend, ejecutar `npm ci`, `npm run test:history` y `npm run build`, y publicar `dist` después de la API.

## Comportamiento

- 50 registros por página al abrir, 25/50/100 seleccionables. Búsqueda en servidor por nombre/apellido y sección. Año calendario actual de America/Guayaquil seleccionado inicialmente, editable. Fechas opcionales por día dentro del año elegido. Cambiar el año vuelve a página 1 y limpia las fechas, conservando búsqueda.
- El parámetro `year` del historial escolar y Excel se valida como año de cuatro dígitos; si se omite, ambos endpoints usan el año actual de Ecuador. La consulta limita `createdAt` desde el 1 de enero inclusivo hasta el 1 de enero siguiente exclusivo, usando el mismo índice. No requiere una migración adicional.
- El XLSX incluye los resultados del año seleccionado y los filtros, con independencia de la página. El nombre `HistorialConsumos-AAAA.xlsx` y el título de las hojas indican el año. Se consulta por lotes de 1000, usando cursor por fecha e id y un máximo de id capturado al iniciar. Nuevas inserciones posteriores no entran en esa descarga; no es un snapshot transaccional de actualizaciones/borrados concurrentes.
- ExcelJS escribe y libera filas, sin shared strings globales ni un libro entero en memoria. Un adaptador acota las colas XML y espera que drenen tanto ellas como la salida HTTP, para frenar la lectura con clientes lentos. El navegador descarga directamente, sin crear un Blob del archivo en React. Al superar el límite de filas de una hoja se agrega otra.
- ExcelJS se fija en la versión 4.4.0 porque el adaptador sustituye `_openStream` manteniendo el contrato de esta versión. Al actualizar ExcelJS, repetir las pruebas de XLSX, múltiples hojas, destino bloqueado y cancelación.
- Los otros reportes siguen usando excel4node. El historial individual por cliente conserva su contrato.

## Validación realizada

Pruebas React y Node de páginas, búsqueda, fechas, consultas SQL generadas sin conexión real, iteración con cursor, cancelación y errores. Descarga desde un servidor HTTP local y lectura posterior del XLSX, verificando cantidades, precios y múltiples hojas. Compilación Vite.

Una prueba sintética de 100.000 filas únicas, con destino Writable ralentizado (2 ms por escritura), produjo un XLSX de 6,6 MB en unos 8,4 segundos: crecimiento máximo muestreado del heap de 15,3 MB y RSS de 37,6 MB. Son mediciones locales del escritor, no tiempos ni consumo de la API/base de producción. La regresión de destino completamente bloqueado verifica que la lectura se detiene y la cancelación sigue funcionando.

Después del despliegue, medir consultas con un historial representativo y comprobar el índice con EXPLAIN. La búsqueda parcial puede recorrer muchos registros; filtros de fechas reducen ese trabajo. Revisar los timeouts del proxy si una exportación completa supera su tiempo máximo. Para volúmenes que sigan excediendo ese tiempo, el siguiente paso sería una exportación asíncrona, fuera del alcance de este cambio.

Para repetir la medición sintética sin conectar la base: en `micolacion_api`, ejecutar `node scripts/benchmark-history-workbook.js 100000`. Las pruebas se validaron con Node 24; requieren Node 18 o posterior.
