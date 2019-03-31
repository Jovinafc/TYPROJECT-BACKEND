const PDFDocument = require('pdfkit')
const fs = require('fs')
let fileName=`file-${Date.now()}`;
const generatePdf =(CustomerName,pdfItemNames,pdfItemQuantity,pdfPrice,GrandTotal)=>{
    const doc= new PDFDocument;
    doc.pipe(fs.createWriteStream(`uploads/${fileName}.pdf`));

    // write to PDF
    doc.text('Invoice from Ride Wheelz',200,10)
    doc.moveDown(1);
    doc.text(`Customer Name:- ${CustomerName}`,10,40)
    doc.text(`Invoice no:-${Math.floor(Math.random() * 1000) + 1 }`,450,10)
    doc.text('Sr no',100,60)
    for(let i=1;i<=pdfItemNames.length;i++)
    {
        doc.text(i,100,60+(i*15));
    }
    doc.text("Item Name",150,60)
    for(let i=0,j=1;i<pdfItemNames.length;i++,j++)
    {
        doc.text(pdfItemNames[i],150,60+(j*15));
    }
    doc.text("Quantity",450,60)
    for(let i=0,j=1;i<pdfItemQuantity.length;i++,j++)
    {
        doc.text(pdfItemQuantity[i],450,60+(j*15));
    }
    doc.text("Price",500,60)

    let y=null;
    for(let i=0,j=1;i<pdfPrice.length;i++,j++)
    {
        doc.text(pdfPrice[i],500,60+(j*15));
        y=60+(j*30)
    }
    doc.text( `Grand Total ${GrandTotal} Rupees `,400,y)


    // doc.pipe(res);                                       // HTTP response
    doc.end()


}
module.exports ={generatePdf,fileName};