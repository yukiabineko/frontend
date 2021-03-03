import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import MediaQuery from "react-responsive";
import PcIndex from './PcIndex';
import PhoneIndex from './PhoneIndex';


 function Index(props){
  
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
    useState(loginUserCheck()); 

  /*************************************ステータス変更/確認ページへ************************************************************************ */
  const showShoppingStatus =(data)=>{
    props.sendShoppingData(data);
    props.history.push('/shoppings_show');
  }

  return(
    <div>
       <MediaQuery minDeviceWidth={767}>
        <PcIndex 
          showShoppingStatus={(data)=>showShoppingStatus(data)}
        />
      </MediaQuery>
    
      <MediaQuery maxDeviceWidth={767}>
        <PhoneIndex 
           showShoppingStatus={(data)=>showShoppingStatus(data)}
        />
      </MediaQuery>
    </div>  
  )
}
export default withRouter(connect((state)=>state)(Index))