import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css'
import MediaQuery from "react-responsive";
import { connect } from 'react-redux';
import PcMovie from './PcMovie';
import PhoneMovie from './PhoneMovie';

 function Movie(props){
  
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
   useState(loginUserCheck);
  return(
    <div>
    <MediaQuery minDeviceWidth={767}>
      <PcMovie />
    </MediaQuery>
    
    <MediaQuery maxDeviceWidth={767}>
      <PhoneMovie />
    </MediaQuery>
    </div>
  )
}
export default withRouter(connect((state)=>state)(Movie))