/*当日日付のみ表示するための分岐処理*/

export const viewDataBranch = (date)=>{
  /*本日*/

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  /*注文データ*/

  const createDate = new Date(date);
  const c_year = createDate.getFullYear();
  const c_month = createDate.getMonth() + 1;
  const c_day = createDate.getDate();

  /*照合*/
  if( year === c_year && month === c_month && day === c_day){
     return 1;
  }
  else{
     return 0;
  }

}
/********************************************************************************************* */
/*オーダーで今日の日付のものがあるかチェック*/

export const todayOdrersChecker = (shoppings)=>{
  let target = 0;
  shoppings.forEach((shopping)=> {
     let data = viewDataBranch(shopping.shopping_date);
     /*各オーダーで今日日付のものがあれば加算*/
     if(data === 1) target ++;
  });
  return target;
}