import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const Base_URL = 'http://223.2.197.240:8062';
// const My_URL = 'http://223.2.197.240:8888/robert'
const My_URL = 'http://localhost:8080';

function wordExport(type, html, name) {
  let doc=html;
  let a=document.body.innerHTML;
  let docFile="<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:"+a+"' xmlns='http://www.w3.org/TR/REC-html40'>";
  docFile=docFile+"<head>" +
    "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />" +
    "<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->" +
    "</head><body>"+doc+"</body>" +
    "</html>";
  let base64data="base64,"+window.btoa(unescape(encodeURIComponent(docFile)));
  if(type=='doc'){
    /*
                  window.open('data:application/msword;'+ base64data);
    */
    let link = document.createElement('a');
    link.href = 'data:application/msword;'+ base64data;
    link.download = name + '.doc'
    link.click();
  }else if(type=='excel'){
    window.open('data:application/vnd.ms-excel;'+ base64data);
  }
};
function pdfExport(html, name) {
  let table = html;
  let obj = document.createElement('div');
  obj.innerHTML = table;
  obj = obj.firstChild;
  obj.classList.add('pdf-table');
  document.body.appendChild(obj);
  html2canvas(obj,{
    backgroundColor: null,
    allowTaint: true,
    taintTest: false,
  }).then((canvas) => {
    /*console.log(canvas);
    document.body.appendChild(canvas);*/
    /*
                  //单页
                  let dataURL = canvas.toDataURL("image/png", 1.0);
                  this.dataURL = dataURL;
                  let pdf = new jsPDF('', 'pt', 'a4');
                  pdf.addImage(dataURL, 'PNG', 20, 50, 555.28, 555.28/canvas.width * canvas.height);
                  pdf.save('test.pdf');
    */
    //多页显示pdf
    let contentWidth = canvas.width;
    let contentHeight = canvas.height;
    let pageHeight = contentWidth / 552.28 * 841.89;
    let remainHeight = contentHeight;
    let deviation = 0;
    let imageWidth = 554.28;
    let imageHeight = 552.28 / contentWidth * contentHeight;

    let pageData = canvas.toDataURL('image/png', 1.0);
    let pdf = new jsPDF('', 'pt', 'a4');
    if (remainHeight < pageHeight)
      pdf.addImage(pageData, 'PNG', 20, 0, imageWidth, imageHeight);
    else
      while( remainHeight > 0) {
        pdf.addImage(pageData, 'PNG', 20, deviation,imageWidth,imageHeight);
        remainHeight -= pageHeight;
        deviation -= 841.89;
        if(remainHeight > 0)
          pdf.addPage();
      }
    pdf.save(name+  '.pdf');
    document.body.removeChild(obj)
  });
};

export default {
  Base_URL,
  My_URL,
  wordExport,
  pdfExport,
}
