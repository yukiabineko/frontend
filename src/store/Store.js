import { createStore } from "redux";

let init_data ={
  userData: []
}

const storeReducer = (state = init_data, action)=>{
  switch (action.type) {
    case 'LOGIN':
      return loginReducer(state, action);
    default:
      return state
  }
}
/**************[-----redux処理---------]*********************************************************************** */
const loginReducer = (state, action)=>{
  let newData = state.userData.slice();
  newData.splice(0);
  newData.push(action.user);
  alert(JSON.stringify(newData));
  return{
    userData: newData
  }
}
/**************[-----コンポーネント送受メソッド処理---------]*********************************************************************** */
export  const sendLoginData = (user)=>{
  return{
    type:'LOGIN',
    user: user
  };
}
export default createStore(storeReducer)