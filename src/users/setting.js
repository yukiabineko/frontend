import React from 'react';

/*注文された商品中受け渡し済み以外申請中と加工済みの件数検知*/

export const ordercheck = (datas) =>{
   let count = 0;
   let date = null;
  if(datas){
    datas.forEach(data => {
        if(data.status === 0 || data.status === 1){
            count += 1;
            date = data.shopping_date;
        }
    });
    return {
        count:  count + '件注文',
        date: date
    }
  }
  else{
    return '履歴なし';
  }
}
/* 注文された商品の履歴状況分岐  */

export const orderHistoryStatus = (status) =>{
  switch (status) {
    case 0:
      return <div className="bg-info text-white">注文中</div>
    case 1:
      return <div className="bg-info text-white">注文中</div>
    case 2:
      return <div className="font-weight-bold">完了済み</div>
    default:
      break;
  }
}

