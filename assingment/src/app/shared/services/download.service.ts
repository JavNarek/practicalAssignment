import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  downloadFile(data:any,headers: string[],filename='data') {
    let csvData = this.ConvertToCSV(data,headers);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

private ConvertToCSV(objArray: string, headerList: string[]) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     let str = '';
     let row = '';
for (let index in headerList) {
         row += headerList[index] + ',';
     }
     row = row.slice(0, -1);
     str += row + '\r\n';
     for (let i = 0; i < array.length; i++) {
         let line ='';
         for (let index in headerList) {
            let head = headerList[index];
            line += array[i][head]+ ',';
         }
         str += line + '\r\n';
     }
     return str;
 }

  private getSVGString(w:number,h:number,style:string ,html:string) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" ><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${style}</style>${html}</div></foreignObject></svg>`
  }

 downloadPNG(fileName:string, elementId: string){
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const tempImg = document.createElement('img')
  tempImg.addEventListener('load', onTempImageLoad)
  const style = `${document.querySelectorAll('style')[3].outerHTML}`
  const element = document.getElementById(elementId)  as HTMLElement
  const html = new XMLSerializer().serializeToString(element)
  const { offsetWidth, offsetHeight} = element
  canvas.width = offsetWidth
  canvas.height = offsetHeight

  const replacedStyle = style.replace(/\n/g,'')
  const svgString = this.getSVGString(offsetWidth,offsetHeight,replacedStyle,html)
  tempImg.src = 'data:image/svg+xml,' + encodeURIComponent(svgString)

  function onTempImageLoad(e:any){
    ctx?.drawImage(e.target, 0, 0)
    let a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${fileName}.png`;
    a.click();
  }
 }

}
