import { createStore } from "redux";

let init_data ={
  userData: [],
  buyCarts: [],
  historyData: null
}

const storeReducer = (state = init_data, action)=>{
  switch (action.type) {
    case 'LOGIN':
      return loginReducer(state, action);
    case 'LOGOUT':
      return logoutReducer(state, action);
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
    buyCarts: state.buyCarts,
    historyData: state.historyData
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
const cartReducer = (state, action)=>{
  let data = state.buyCarts.slice();
  let sameCount = 0; /*同じ商品カウント(同じ商品を入力しているか確認 */

  if(data.length >0){
    data.forEach((item)=>{
      if((action.data.name === item.name) && (action.data.process === item.process)){
        alert('すでに注文しています。\n　修正は買い物確認ボタンにて変更できます。');
        sameCount ++;
      }
    })
    if(sameCount === 0){ data.push(action.data);}
  }
  else{
    data.push(action.data);
  }

  
  
  return{
    userData: state.userData,
    buyCarts: data,
    historyData: state.historyData
  }
}
const cartResetReducer = (state, action)=>{
  let data = state.buyCarts.slice();
  data.splice(0);
  return{
    userData: state.userData,
    buyCarts: data,
    historyData: state.historyData
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
    buyCarts: data,
    historyData: state.historyData
  }
}
const cartDeleteReducer = (state, action)=>{
  let datas = state.buyCarts.slice();
  datas.splice(action.num, 1);
  return{
    userData: state.userData,
    buyCarts: datas,
    historyData: state.historyData
  }
}

const userHistoryReducer = (state, action)=>{
  let history = action.data;
  return{
    userData: state.userData,
    buyCarts: state.buyCarts,
    historyData: history
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
export default createStore(storeReducer)