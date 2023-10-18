import jsPDF from "jspdf";
import "jspdf-autotable";
import path from "path";
// SLICES 
// Resources
import micolacionLogo from '../../assets/colacion.png';

export default function GeneralReportPDF(
  client, history
) {

  var doc = new jsPDF("p", "pt");

  // Agregar encabezado de texto
  doc.setFont("helvetica", "normal");
  var yIncrementalPosition = 50;
  var lineBreak = 12;
  var doubleLineBreak = 24;
  var tripleLineBreak = 110;
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
  doc.text("Quito, " + date.getDate() + " de " + monthList[date.getMonth()] + " del " + date.getFullYear(), 430, yIncrementalPosition);
  doc.text('REPORTE MI COLACION', 215, (yIncrementalPosition += lineBreak));
  doc.text('RUC:1707748776001', 230, (yIncrementalPosition += lineBreak));
  doc.text('DIRECCION: KM 2 1/2 AV. SIMON BOLIVAR S/N (FRENTE A LA CASA DE LA SELE)', 80, (yIncrementalPosition += lineBreak));


  // Definir datos para la tabla
  var dataClient = [
    ['Cedula:', client.cedulaCliente],
    ['Nombres:', client.firstName],
    ['Apellidos:', client.lastName],
    ['Seccion:', client.cliente_seccion?.name],
    ['Servicio contratado:', client.cliente_servicio?.name],
    ['Cedula / RUC:', client.cliente_representante?.cedulaRepresentante],
    ['Nombres:', client.cliente_representante?.names],
    ['Teléfono:', client.cliente_representante?.telefon],
    ['email:', client.cliente_representante?.email]
  ];

  var head = [
    ["Datos estudiante"], ["Datos representate"]
  ]

  const formatDateToLocal = (date) => {
    const formattedDate = new Date(date).toLocaleString();
    return formattedDate;
}

  var headHistory =["Nombre","Sección","Servicios","Consumidos","Fecha"] 
  
  const tableRows = [];
  history.forEach((item, index) => {
    const rowData = [
      item.firstName + item.lastName , 
      item.history_seccion?.name,  
      item.history_servicio?.name , 
      item.history_seccion?.name,  
      formatDateToLocal(item.createdAt), 
    ];
    tableRows.push(rowData);
  });

  doc.autoTable({
    head: head.slice(0),
    startY: (yIncrementalPosition += doubleLineBreak) // Posición vertical de inicio del cuerpo de la tabla
  });

  doc.autoTable({
    body: dataClient.slice(0),
    startY: (yIncrementalPosition += doubleLineBreak)
  });

  doc.autoTable({
    head: head.slice(1),
    startY: (yIncrementalPosition += tripleLineBreak)
  });

  doc.autoTable({
    body: dataClient.slice(5),
    startY: (yIncrementalPosition += doubleLineBreak)
  });

  doc.autoTable(headHistory, tableRows, { startY: (yIncrementalPosition += 90) });


  doc.save(client.firstName + client.lastName +"_"+'GeneralReport.pdf');
}