
/*買い物かごで同一商品が含まれているのかをチェック あればaddされない*/
export const sameItemCheck = (datas, name, process)=>{
  let sameItemCount = 0;
  datas.forEach((data)=>{
    if((data.name === name) && (data.process === process)){
        sameItemCount ++ ;
    }
  });
  if(sameItemCount >0){
      return true;
  }
  else{
      return false;
  }
}

/*セレクト時商品選択されていないかチェック*/

export const selectItemCheck = (name)=>{
   if(name === '--加工法を選択してください--' || name === ''){
        return false
   }
   else{
       return true;
   }
}

/*セレクト時ローカルストレージ在庫更新*/

export const localstorageChange = (name,stock, datas)=>{
  
  datas.forEach((data)=>{
    if(data.name === name){
      data.stock = stock;
    }
  });
 return datas;
}

/*注文確認ボタンにて削除ボタン押し下時に大元propsの在庫反映*/

export const pushDeleteButtonTolocalData = (name,orderNumber,datas)=>{
  datas.forEach((data)=>{
    if(data.name === name){
      let localnum = Number(data.stock);
      localnum += Number(orderNumber);
      data.stock = localnum;
    }
  });
  
}
/* カートの時間のチェック*/
export const cartValidate = (datas)=>{
  let check = true;
  datas.forEach((data)=>{
    data.time === "" ? check = false : check = true;
  })
  return check;
}

/* 商品の検索 */
export const searchItem = (name)=>{
  let items = JSON.parse(localStorage.getItem('items'));
  let data  = {}
  items.forEach((item)=>{
     if(item.name === name){
       data["info"] = item.info;
       data["category"] = item.category
     }
  });
  return data;
}
