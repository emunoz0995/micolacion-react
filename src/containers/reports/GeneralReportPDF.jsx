import jsPDF from "jspdf";
import "jspdf-autotable";
import path from "path";
// SLICES 
// Resources
import micolacionLogo from '../../assets/colacion.png';

export default function gpsTaxPDF() {
  
  var doc = new jsPDF("p", "pt");

  // Agregar encabezado de texto
  doc.setFont("helvetica", "normal");
  var yIncrementalPosition = 50;
  var lineBreak = 12;
  var doubleLineBreak = 24;
  var tripleLineBreak = 70;
  // HEADER
  doc.setFontSize(10);

  var date = new Date();
  var monthList = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  var reportLogo = new Image();
  reportLogo.src = path.resolve(micolacionLogo);

  doc.addImage(reportLogo, "JPEG", 30, 20, 150, 46);
  doc.text('Ejemplo de PDF con Texto y Tabla', 30, (yIncrementalPosition += doubleLineBreak));


  // Definir datos para la tabla
  var data = [
    ['Cedula', 'Pérez'],
    ['Nombres', 'Gómez'],
    ['Seccion', 'López'],
    ['Servicio contratado', 'López']
  ];

var head = [
  ["Datos estudiante"],["Datos representate"]
]

  doc.autoTable({
    head: head,
    startY: (yIncrementalPosition += doubleLineBreak) // Posición vertical de inicio del cuerpo de la tabla
});

  // Agregar la tabla al documento PDF
  doc.autoTable({
    body: data.slice(0), // Cuerpo de la tabla (sin el encabezado)
    startY: (yIncrementalPosition += doubleLineBreak) // Posición vertical de inicio de la tabla
  });

  doc.autoTable({
    head: head.slice(1),
    startY: (yIncrementalPosition += tripleLineBreak) // Posición vertical de inicio del cuerpo de la tabla
});

  // Agregar la tabla al documento PDF
  doc.autoTable({
    body: data.slice(0), // Cuerpo de la tabla (sin el encabezado)
    startY: (yIncrementalPosition += doubleLineBreak) // Posición vertical de inicio de la tabla
  });

  // Guardar o mostrar el PDF generado
  doc.save('ejemplo.pdf');
}