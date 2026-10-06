# Filtro anual del historial

Solicitud del usuario: agregar filtro por año y limitar tanto la pantalla inicial como el Excel al año seleccionado.

Diseño: año calendario actual de America/Guayaquil por defecto en frontend y backend; año editable, validado entre 1000 y 9998. Fechas opcionales contenidas en ese año. Cambiar año limpia fechas y vuelve a página 1, conservando búsqueda. SQL utiliza límites sobre createdAt, compatibles con el índice existente. Excel comparte filtro, indica año en nombre y título, y conserva streaming.

- [x] Pruebas React: año inicial, cambio con reset, año incluido en descarga.
- [x] Pruebas Node: año predeterminado, límites anuales inclusivos/exclusivos, bisiesto, fechas incompatibles y validación de año.
- [x] Implementar filtro anual compartido, control visible y exportación anual en ambos repositorios.
- [x] Verificar pruebas, compilación y documentación; sin despliegue ni cambios en producción.
