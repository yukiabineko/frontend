import { createStore } from "redux";

let init_data ={
  userData: [],
  orderItem: null,
  buyCarts: [],
  historyData: null,
  pageData: null,
  chartData: null,
  youtubeData: null
}

const storeReducer = (state = init_data, action)=>{
  switch (action.type) {
    case 'LOGIN':
      return loginReducer(state, action);
    case 'LOGOUT':
      return logoutReducer(state, action);
    case 'ORDER':
      return ordersReducer(state, action);
    case 'ORDERSTOCK':
      return ordersStockChangeReducer(state, action);
    case 'CARTADD':
      return cartReducer(state, action);
    case 'CARTRESET':
      return cartResetReducer(state, action);
    case 'CARTDELETE':
      return cartDeleteReducer(state, action);
    case 'CARTUPDATE':
      return cartUpdateReducer(state, action);
    case 'USERHISTORY':
      return userHistoryReducer(state, action);  
    case 'SEARCHDATA':
      return searchReducer(state, action);  
    case 'CHART':
      return chartReducer(state, action);  
    case 'YOUTUBE':
      return youtubeReducer(state, action);  
    default:
      return state
  }
}
/**************[-----redux処理---------]*********************************************************************** */
const loginReducer = (state, action)=>{
  let newData = state.userData.slice();
  newData.splice(0);
  newData.push(action.user);
 
  return{
    userData: newData,
    orderItem: state.orderItem,
    buyCarts: state.buyCarts,
    historyData: state.historyData,
    pageData: state.pageData,
    chartData: state.chartData,
    youtubeData: state.youtubeData
  }
}
const logoutReducer =(state, action)=>{
    let newData = state.userData.slice();
    newData.splice(0);
    return{
      userData: newData,
      buyCarts: state.buyCarts,historyData: state.historyData
    }
  }
const ordersReducer = (state, action)=>{
  let data = state.orderItem;
  data = action.data;
 
  return{
    userData: state.userData,
    orderItem: data,
    buyCarts: state.buyCarts,
    historyData: state.historyData,
    pageData: state.pageData,
    chartData: state.chartData,
    youtubeData: state.youtubeData
  }
}
/*買い物確認削除ボタン*/
const ordersStockChangeReducer = (state, action) =>{
  let datas = state.orderItem.slice();
  datas.forEach((data)=>{
    if(data.name === action.name){
      let stock = Number(data.stock);
      stock += Number(action.num); /*在庫元に戻す*/
      data.stock = stock;
    }
  });
  return{
    userData: state.userData,
    orderItem: datas,
    buyCarts: state.buyCarts,
    historyData: state.historyData,
    pageData: state.pageData,
    chartData: state.chartData,
    youtubeData: state.youtubeData
  }
}
const cartReducer = (state, action)=>{
  let data = state.buyCarts.slice();
  data.push(action.data);
  return{
    userData: state.userData,
    orderItem: state.orderItem,
    buyCarts: data,
    historyData: state.historyData,
    pageData: state.pageData,
    chartData: state.chartData,
    youtubeData: state.youtubeData
  }
}
const cartResetReducer = (state, action)=>{
  let data = state.buyCarts.slice();
  data.splice(0);
  return{
    userData: state.userData,
    orderItem: state.orderItem,
    buyCarts: data,
    historyData: state.historyData,
    pageData: state.pageData,
    chartData: state.chartData,
    youtubeData: state.youtubeData
  }
}
const cartUpdateReducer = (state, action)=>{
  let data = state.buyCarts.slice();
  data.splice(0);
  action.items.forEach((item) => {
    data.push(item);
  });
  return{
    userData: state.userData,
    orderItem: state.orderItem,
    buyCarts: data,
    historyData: state.historyData,
    pageData: state.pageData,
    chartData: state.chartData,
    youtubeData: state.youtubeData
  }
}
const cartDeleteReducer = (state, action)=>{
  let datas = state.buyCarts.slice();
  datas.splice(action.num, 1);
  
  return{
    userData: state.userData,
    orderItem: state.orderItem,
    buyCarts: datas,
    historyData: state.historyData,
    pageData: state.pageData,
    chartData: state.chartData,
    youtubeData: state.youtubeData
  }
}

const userHistoryReducer = (state, action)=>{
  let history = action.data;
  return{
    userData: state.userData,
    orderItem: state.orderItem,
    buyCarts: state.buyCarts,
    historyData: history,
    pageData: state.pageData,
    chartData: state.chartData,
    youtubeData: state.youtubeData
  }
}
/*ページネーション検索*/
const searchReducer = (state, action)=>{
  let data = action.data;
  
  return{
    userData: state.userData,
    orderItem: state.orderItem,
    buyCarts: state.buyCarts,
    historyData: state.historyData,
    pageData: data,
    chartData: state.chartData,
    youtubeData: state.youtubeData
  }
}
/*グラフ用*/
const  chartReducer = (state, action)=>{
  let data = action.data;
  
  return{
    userData: state.userData,
    orderItem: state.orderItem,
    buyCarts: state.buyCarts,
    historyData: state.historyData,
    pageData: state.pageData,
    chartData: data,
    youtubeData: state.youtubeData
  }
}
/*youtube用*/
const  youtubeReducer = (state, action)=>{
  let data = action.data;
   
   return{
    userData: state.userData,
    orderItem: state.orderItem,
    buyCarts: state.buyCarts,
    historyData: state.historyData,
    pageData: state.pageData,
    chartData: state.chartData,
    youtubeData: data
   }
}
/**************[-----コンポーネント送受メソッド処理---------]*********************************************************************** */
export  const sendLoginData = (user)=>{
  return{
    type:'LOGIN',
    user: user
  };
}
export const logoutAction =()=>{
  return{
    type: 'LOGOUT'
  }
}
export const cartsAdd = (item)=>{
  return{
    type: 'CARTADD',
    data: item
  }
}
export const ordersSend = (data)=>{
  return{
    type: 'ORDER',
    data: data
  }
}
export const ordersStockChange = (name, num)=>{
  return{
    type: 'ORDERSTOCK',
    name: name,
    num: num
  }
}
export const cartEmpty = ()=>{
  return{
    type: 'CARTRESET'
  }
}
export const cartDeleteCart = (index)=>{
  return{
    type: 'CARTDELETE',
    num: index
  }
}
export const cartUpdate = (items)=>{
  return{
    type: 'CARTUPDATE',
    items: items
  }
}
export const historyDataSend = (data)=>{
  return{
    type: 'USERHISTORY',
    data: data
  }
}
export const searchSend = (data)=>{
  return{
    type: 'SEARCHDATA',
    data: data
  }
}
/*グラフ用*/
export const chartSend = (data)=>{
  return{
    type: 'CHART',
    data: data
  }
}
/*youtube該当商品用*/
export const youtubeSeearchSend = (data)=>{
  return{
    type: 'YOUTUBE',
    data: data
  }
}
export default createStore(storeReducer)