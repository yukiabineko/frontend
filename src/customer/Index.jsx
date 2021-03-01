import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css'
import MediaQuery from "react-responsive";
import { connect } from 'react-redux';
import PcIndex from './PCIndex';
import PhoneIndex from './PhoneIndex';

 function Index(props){

  /*買い物カゴに入れた際の在庫の更新*/

  if(props.fixItemData){
    props.orderItem.forEach((data,i)=>{
      if(props.fixItemData.id === data.id){
        props.orderItem[i] = props.fixItemData;
        /*localStorage.setItem('orders', JSON.stringify(localData));*/
      }
    })

  }
  
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
   useEffect(()=>{
     loginUserCheck();
   })
  return(
    <div>
    <MediaQuery minDeviceWidth={767}>
      <PcIndex 
        sendCustomerData={props.sendCustomerData}  
        sendCartItemToConfirm={props.sendCartItemToConfirm}
        fixItemData={props.fixItemData}
      />
    </MediaQuery>
    
    <MediaQuery maxDeviceWidth={767}>
      <PhoneIndex 
          sendCustomerData={props.sendCustomerData}  
          sendCartItemToConfirm={props.sendCartItemToConfirm}
          fixItemData={props.fixItemData}
      />
    </MediaQuery>
    </div>
  )
}
export default withRouter(connect((state)=>state)(Index))