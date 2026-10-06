# Plan de optimización de HistoryReport

**Objetivo:** cargar páginas acotadas y exportar XLSX sin acumular el historial completo.

**Diseño aprobado:** `../specs/2026-10-06-history-report-design.md`.

**Ejecución:** en esta sesión, con executing-plans y pruebas antes de implementación. Ramas locales `fix/history-report-performance` en ambos repositorios. Sin despliegue ni cambios en la base de producción.

## 1. Consulta y contrato del backend

- [x] Crear pruebas Node para filtros inválidos, fechas locales inclusivas, paginación y consulta SQL generada; ejecutarlas y observar el fallo previo.
- [x] Implementar `src/utils/historyReport.js`: `parseHistoryQuery(query)`, `buildHistoryWhere(schoolId, filters, cursor, maxId)` y selección mínima de relaciones. Usar Sequelize con nombres de atributos del modelo, sin SQL interpolado.
- [x] Sustituir `ReportService.getReportHistory(schoolId, query)` por consulta acotada y conteo; agregar iterador por cursor para exportaciones.
- [x] Pasar `req.query` desde el controlador y verificar con `node --test tests/historyReport.test.js`.

## 2. Exportación XLSX

- [x] Probar lectura de un XLSX generado con datos representativos, lotes múltiples, hoja vacía, relaciones ausentes y cancelación.
- [x] Implementar `src/utils/historyWorkbook.js` con `writeHistoryWorkbook(stream, rows, options)`: filas liberadas con commit, varias hojas al alcanzar el límite de Excel y manejo de errores.
- [x] Cambiar `generateExcelHistory` para validar filtros, iterar lotes de 1000, enviar descarga y cancelar al cerrar la conexión. Añadir ExcelJS conservando excel4node para otros reportes.
- [x] Ejecutar pruebas y comprobaciones de sintaxis sin conectar a producción.

## 3. Pantalla y despliegue

- [x] Crear pruebas React de solicitud paginada, cambio de página, búsqueda y exportación con filtros. Ejecutar antes de cambiar el componente.
- [x] Modificar `HistoryReport.jsx` con paginación, debounce, cancelación, fechas y errores. Actualizar el thunk escolar al nuevo contrato.
- [x] Agregar migración manual/idempotente del índice compuesto y documentación del despliegue API antes de frontend.
- [x] Ejecutar `npx vitest run`, `npm run build`, pruebas Node del backend y revisión de ambos diffs. Registrar límites de validación real de memoria y tiempos.
