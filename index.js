const express = require("express");
const PDFDocument = require("pdfkit");

const app = express();
const port = 3001;

const unicode =
  "သီဟိုဠ်မှ ဉာဏ်ကြီးရှင်သည် အာယုဝဍ္ဎနဆေးညွှန်းစာကို ဇလွန်ဈေးဘေး ဗာဒံပင်ထက် အဓိဋ္ဌာန်လျက် ဂဃနဏဖတ်ခဲ့သည်။";

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "Ok", message: "pdf generate end point is /generate-pdf" });
});

app.get("/generate-pdf", (req, res) => {
  // Set the content type to PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=example.pdf");

  // Create a new PDF document
  const doc = new PDFDocument();
  const font = doc.font("fonts/mmrCensus.ttf");

  // Pipe the PDF directly to the HTTP response
  doc.pipe(res);

  //add myanmar unicode  font
  // doc
  //   .font('fonts/mmrCensus.ttf')
  //   .fontSize(25)
  //   .text(unicode, 100, 100);

  doc.image("./images/pureLogo.jpg", -10, 20, {
    width: 150,
  });
  font.fontSize(20).text("let's Bring Back Your Youth &", 200, 65);
  font.fontSize(20).text("Maintain Your Perfection with Us..!", 200, 90);
  font.fontSize(42).text("INVOICE", 20, 150);
  font.fontSize(12).text("CUSTOMER NAME: kwi", 20, 210);
  // function createTable(doc, data, columnWidths) {

  //   // Set initial y-coordinate
  //   let y = 250;

  //   data.forEach((row, rowIndex) => {
  //     // Set initial x-coordinate
  //     let x = 20;

  //     row.forEach((cell, columnIndex) => {
  //       // Position text at (x, y)
  //       doc.rect(x, y, columnWidths[columnIndex], 15);
  //       doc.text(cell, x + 5, y + 5);

  //       // Move x-coordinate for the next cell
  //       x += columnWidths[columnIndex];
  //     });

  //     // Move y-coordinate for the next row
  //     y += 35; // You can adjust this value based on the desired spacing between rows
  //   });
  // }

  // Example data for the table
  function createTable(doc, data, columnWidths) {
    // Set initial y-coordinate
    let y = 250;

    // Set initial x-coordinate for the table
    let x = 20;

    // Set background color for the header row
    doc
      .rect(
        x,
        y - 6,
        columnWidths.reduce((sum, width) => sum + width, 0),
        20
      )
      .fill("#FABF35");

    // Set font properties for the header row
    doc.font("Helvetica-Bold").fontSize(10).fill("#2CA776");

    // Draw header row
    data[0].forEach((headerCell, columnIndex) => {
      doc.text(headerCell, x + 2, y);
      x += columnWidths[columnIndex];
    });

    // Reset x-coordinate and y-coordinate for the data rows
    x = 50;
    y += 20;

    // Set font properties for the data rows
    doc.font("Helvetica").fontSize(10).fill("#333333");

    data.slice(1).forEach((row) => {
      row.forEach((cell, columnIndex) => {
        doc.text(cell, x - 25, y);
        x += columnWidths[columnIndex];
      });

      // Reset x-coordinate for the next row
      x = 50;

      // Move y-coordinate for the next row
      y += 20;
    });
  }
  

  const tableData = [
    ["No.", "TREATMENT", "PRICE", "DIS", "QTY", "TOTAL"],
    ["1", "laser", "1,750,000.00", "2,5000,000.00", "5", "1,500,000.00"],
    ["2", "laser", "1,750,000.00", "2,5000,000.00", "5", "1,500,000.00"],
    ["3", "laser", "1,750,000.00", "2,5000,000.00", "5", "1,500,000.00"],
    ["4", "laser", "1,750,000.00", "2,5000,000.00", "5", "1,500,000.00"],
    ["5", "laser", "1,750,000.00", "2,5000,000.00", "5", "1,500,000.00"],
    ["6", "laser", "1,750,000.00", "2,5000,000.00", "5", "1,500,000.00"],
    ["7", "laser", "1,750,000.00", "2,5000,000.00", "5", "1,500,000.00"],
    ["8", "laser", "1,750,000.00", "2,5000,000.00", "5", "1,500,000.00"],
    ["9", "laser", "1,750,000.00", "2,5000,000.00", "5", "1,500,000.00"],
    ["10", "laser", "1,750,000.00", "2,5000,000.00", "5", "1,500,000.00"],
    ["", "", "SUB TOTAL", "", "", "6,150,000.00"],
    ["", "", "DISCOUNT", "", "", "1,150,000.00"],
    ["", "", "NET TOTAL", "", "", "4,400,000.00"],
  ];
  font.fontSize(12).text("THANKS YOU FOR YOUR PURCHASE!", 200, 660);
  font
    .fontSize(12)
    .text("Address:NO 2/12 ThiriMarlar St,75Miles,Pyay Road,", 165, 680);
  font.fontSize(12).text("Mayangon Tsp,Yangon", 230, 700);
  // Example column widths
  const columnWidths = [40, 90, 120, 120, 50, 120];
  const tableBgColor = "#f0f0f0";

  createTable(doc, tableData, columnWidths);
  doc
    .scale(0.6)
    .translate(470, -380)
    .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
    .fill("red", "even-odd")
    .restore();

  // End the PDF document
  doc.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
