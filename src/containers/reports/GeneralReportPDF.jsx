import jsPDF from "jspdf";
import "jspdf-autotable";

export default function GeneralReportPDF(
    company,
    cruise,
    guide,
    passengers,
    reservation
  ) {
    var doc = new jsPDF("p", "pt");
  
    doc.setFont("helvetica", "normal");
    var yIncrementalPosition = 130;
    var lineBreak = 12;
    var doubleLineBreak = 24;
    var tripleLineBreak = 36;  

  
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
  
    doc.text(
      "Quito, " +
        date.getDate() +
        " de " +
        monthList[date.getMonth()] +
        " del " +
        date.getFullYear(),
      30,
      yIncrementalPosition
    );
    doc.text("Señores", 30, (yIncrementalPosition += doubleLineBreak));
    doc.text(
      "Parque Nacional Galápagos",
      30,
      (yIncrementalPosition += lineBreak)
    );
    doc.text("Presente.-", 30, (yIncrementalPosition += lineBreak));
    doc.text(
      "De mis consideraciones:",
      30,
      (yIncrementalPosition += doubleLineBreak)
    );
  
    
    var text1 =
      "Adjunto al presente sírvase encontrar el cheque certificado del Banco del Pacífico por la cantidad de US$" +
      "priceTotal" +
      " (" +
      "priceTotalWords" +
      " dólares americanos), " +
      "correspondiente al pago de las entradas al Parque Nacional Galápagos para el crucero " +
      "charter" +
      " a bordo del " +
      "cruise.short" +
      " " +
      "cruise.yacht_name" +
      " de " +
     " cruise.start_date_format" +
      " a " +
      "cruise.end_date_format" +
      ".";
    var splitTitle = doc.splitTextToSize(text1, 520);
    doc.text(splitTitle, 30, (yIncrementalPosition += doubleLineBreak));
  
    doc.text(
      "R.U.C. - " + "asd" + ": " + "wwqe" + " / Guía: " + "ass" + ".",
      30,
      (yIncrementalPosition += 45)
    );
    doc.text(
      "A continuación detallo lista de pasajeros:",
      30,
      (yIncrementalPosition += doubleLineBreak)
    );
  
    // BODY
    doc.autoTable({
        head: [['Name', 'Email', 'Country']],
        body: [
          ['David', 'david@example.com', 'Sweden'],
          ['Castille', 'castille@example.com', 'Spain'],
          // ...
        ],
        startY: [yIncrementalPosition += doubleLineBreak],
      })
    yIncrementalPosition = doc.lastAutoTable.finalY;
    doc.text(
      "Por la amable atención a este requerimiento, anticipo mis agradeciemientos.",
      30,
      (yIncrementalPosition += doubleLineBreak)
    );
    doc.text("Atentamente,", 30, (yIncrementalPosition += doubleLineBreak));
    doc.text("Francisca Unda", 30, (yIncrementalPosition += tripleLineBreak));
    doc.text("Operaciones Quito", 30, (yIncrementalPosition += lineBreak));
    doc.text("Adj. cheque", 30, (yIncrementalPosition += doubleLineBreak));
  
    // GENERATE PDF
    doc.save("GeneralReport.pdf");
  }