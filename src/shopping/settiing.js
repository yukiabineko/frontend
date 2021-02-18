import { faDivide } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

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
/*(ヘッダー表示用,商品リスト用)明日の日付アイテムあるか確認 */

export const todayOrderExisting =(shoppings)=>{
   let todayObjects = [];
   let date = new Date();
   let year = date.getFullYear();
   let month = date.getMonth() + 1;
   date.setDate(date.getDate() + 1); 
   let day = date.getDate();  /*tomorrow */

   if(shoppings){
      shoppings.forEach((shopping)=>{
         let t_date = new Date(shopping.shopping_date);
         let t_year = t_date.getFullYear();
         let t_month = t_date.getMonth() + 1;
         let t_day = t_date.getDate();
         if( year == t_year && month == t_month && day == t_day){
            todayObjects.push(shopping);
         }
      });
   }
   return todayObjects;
}
/*売上速報ページ売上合計計算*/
export  const totalSales = (datas)=>{
  let total = 0
  datas.map((data)=>{
     total += Number(data.合計);
  })
  return total;
}
