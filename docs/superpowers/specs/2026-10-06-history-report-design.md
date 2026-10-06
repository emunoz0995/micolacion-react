# Optimización del historial de consumos

## Diagnóstico

`HistoryReport.jsx` solicita todos los registros y después filtra en el navegador. `ReportService.getReportHistory` ejecuta `History.findAll` sin límite, carga columnas y relaciones innecesarias y tiene comentado el filtro de fechas. La exportación reutiliza esa consulta y crea el libro completo con excel4node en memoria. Son riesgos comprobados en código; la causa exacta de la caída en producción requiere logs y una prueba con su volumen real.

La búsqueda de sección usa `cliente_seccion` en vez de `history_seccion`. La exportación sobrescribe el consumo con el valor constante `1`.

## Alternativas

1. Paginación en servidor y XLSX por streaming: recomendada; conserva acceso a todo el historial y evita acumular todos los registros y celdas.
2. Restringir al último mes: reduce carga, pero limita el historial disponible y no resuelve exportaciones grandes por sí sola.
3. Exportaciones asíncronas con cola: apropiadas para volúmenes extremos y timeouts del proxy; requieren almacenamiento y procesamiento adicionales fuera de este ajuste.

## Contrato y alcance propuestos

- Pantalla: 50 filas por defecto, selector de 25/50/100, navegación de páginas y total de resultados. Registros más recientes primero, con `id` como desempate.
- API de historial: paginación obligatoria por defecto; `page`, `pageSize`, `search`, `dateFrom` y `dateTo`. Respuesta `{ rows, total, page, pageSize }`. Actualizar los consumidores del endpoint escolar; conservar intacto el endpoint de historial por cliente.
- Búsqueda por nombre completo y sección, ejecutada en SQL. Debounce de 300 ms; volver a primera página al cambiar filtros o colegio. Cancelar solicitudes obsoletas para evitar resultados de filtros anteriores.
- Actualización solicitada: año calendario actual de America/Guayaquil por defecto, editable; pantalla y Excel siempre limitados a ese año. Fechas opcionales inclusivas por día dentro del año elegido. Validar fechas, año, rango y límites de página en la API.
- Seleccionar únicamente las columnas de historial, sección y servicio utilizadas. Omitir representante en este reporte.
- Excel: conservar XLSX y los encabezados del negocio. Usar ExcelJS streaming, con lotes de hasta 1000 registros, cursor estable por fecha/id y un límite superior capturado al empezar para evitar incorporar nuevos consumos a mitad de exportación. Exportar todos los resultados de los filtros, independientemente de la página actual.
- Liberar filas al escribir; no acumular shared strings. Respetar el límite de filas de Excel creando hojas adicionales cuando sea necesario. Detener consultas al desconectarse el cliente y manejar errores antes/después de enviar encabezados.
- Mantener fecha y hora, precio numérico y consumo real según las banderas del servicio. Tratar relaciones ausentes sin hacer fallar el archivo.
- Mostrar carga y errores del historial en la pantalla. Descargar mediante el navegador para no acumular el XLSX completo en un Blob del frontend.
- Preparar una migración idempotente/manual para el índice compuesto por colegio, fecha e id. No ejecutar cambios contra la base de producción; documentar aplicación y despliegue del backend antes del frontend.

## Archivos afectados

Frontend: `src/containers/reports/HistoryReport.jsx`, consumidor escolar en `src/store/slices/reports/reports.slice.jsx`, utilidades y pruebas específicas si se requieren.

Backend hermano real: `../micolacion_api`. Servicio y controlador de reportes, `src/controllers/generateExcelHistory.js`, utilidad de filtros/cursor, migración del índice, pruebas y dependencia ExcelJS con su lockfile. Mantener excel4node para los otros reportes.

## Verificación

Pruebas de validación y fechas; paginación y búsqueda; orden estable sin saltos entre lotes; filtros compartidos entre pantalla y archivo; exportación vacía, múltiples lotes, cantidades, precio, relaciones ausentes, desconexión y errores de escritura. Verificar que el archivo generado pueda leerse como XLSX y contiene las filas esperadas. Compilar frontend y revisar el diff en ambos repositorios.

No conectar pruebas a la base de producción. La verificación final de tiempos, memoria e índice necesita un entorno de pruebas con un historial representativo. Streaming reduce la acumulación en memoria, pero una exportación completa aún puede superar el timeout de un proxy; de ocurrir, evaluar la alternativa asíncrona.

## Estado

Diseño aprobado por el usuario: “Sí, implementar paginación y Excel por streaming”. Implementación realizada en ambas ramas locales; ver `docs/history-report-deployment.md` para validación y despliegue. Añadido control de colas XML/HTTP para clientes lentos, con ExcelJS fijado en 4.4.0.
