
/*買い物かごで同一商品が含まれているのかをチェック あればaddされない*/

export const sameItemCheck = (datas, name, process)=>{
  let sameItemCount = 0;
  datas.map((data)=>{
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

export const localstorageChange = (name,stock)=>{
  let datas = JSON.parse(localStorage.getItem('orders'));
  datas.map((data)=>{
    if(data.name === name){
      data.stock = stock;
    }
  });
  localStorage.setItem('orders', JSON.stringify(datas));
}