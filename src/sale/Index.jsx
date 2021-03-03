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

  return(
    <div>
       <MediaQuery minDeviceWidth={767}>
        <PcIndex />
      </MediaQuery>
    
      <MediaQuery maxDeviceWidth={767}>
        <PhoneIndex />
      </MediaQuery>
    </div>  
  )
}
export default withRouter(connect((state)=>state)(Index))