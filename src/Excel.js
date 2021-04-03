import  XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const sheet_to_workbook = (sheet, opts)=>{
  var n = opts && opts.sheet ? opts.sheet : "Sheet1";
    var sheets = {}; sheets[n] = sheet;
    return { SheetNames: [n], Sheets: sheets };
}
const  aoa_to_workbook = (data, opts)=>{
  return sheet_to_workbook(XLSX.utils.aoa_to_sheet(data, opts), opts);
}
const s2ab = (s)=>{
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
/*構成比を含めたデータに変換*/
const composition_ratio =(datas)=>{
   let total = 0;
   let array = [];

   datas.forEach(data => {
    if(data["合計"]){
      total += Number(data["合計"]);
    }
  });
   
   datas.forEach(data => {
     array.push({day: data.day, week: data.week, num: data.num, 合計: data["合計"],rate: (Number(data["合計"] / total )*100)})
   });
   return array;

}
 export const excelExport = (sendData)=>{
  const datas = composition_ratio(sendData);
 
  var write_opts = {
    type: 'binary'
  };
  let array1 = [];
    const keyArray = Object.keys(datas);                        //キー一覧
    const keyCount = keyArray.length;                           //日付キー数
    array1.push(["日付", "曜日", "点数","合計","構成比"]);
    for(let i=0; i< keyCount; i++){
      array1.push(
        [
          datas[keyArray[i]]["day"],
          datas[keyArray[i]]["week"],
          datas[keyArray[i]]["num"],
          datas[keyArray[i]]["合計"],
          datas[keyArray[i]]["rate"]? datas[keyArray[i]]["rate"] : ""
        ]
      );
    }

  var wb = aoa_to_workbook(array1);
  var wb_out = XLSX.write(wb, write_opts);
  var blob = new Blob([s2ab(wb_out)], { type: 'application/octet-stream' });
  saveAs(blob, '売り上げ.xlsx');

}
