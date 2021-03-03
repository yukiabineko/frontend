/*売上速報ページ売上合計計算*/
export  const totalSales = (datas)=>{
  let total = 0
  if(datas){
    datas.forEach((data)=>{
      let num = data.合計? Number(data.合計) : 0;
      total += num;
    })
  }
  return total;
 
}
/*totalSales元に比率計算*/
export  const salesRate = (data, datas)=>{
    let allTotal = totalSales(datas);
    return data.合計? Math.floor(( Number(data.合計)  / allTotal) *100) : "";
}