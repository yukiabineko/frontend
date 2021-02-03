import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import MediaQuery from "react-responsive";
import PcIndex from './PcIndex';
import PhoneIndex from './PhoneIndex';


 function Index(props){
  let localData = JSON.parse(localStorage.getItem('shoppings'));
  
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
    useState(loginUserCheck()); 

  return(
    <div>
       <h1>売り上げ速報</h1>
    </div>  
  )
}
export default withRouter(connect((state)=>state)(Index))