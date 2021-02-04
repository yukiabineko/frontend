import {  useState } from 'react';
import { withRouter } from 'react-router-dom';
import './users.css';
import { connect } from 'react-redux';
import PcIndex from './PcIndex';
import PhoneIndex from './PhoneIndex';
import MediaQuery from "react-responsive";


 function Index(props){
  
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
   useState(loginUserCheck());

  /****************************編集**************************************** */
   const editPage = (id)=>{
     props.editIdget(id);
     props.history.push("/users/edit");
   } 


   
  return(
    <div>
       <MediaQuery minDeviceWidth={767}>
        <PcIndex 
          editPage={(i)=>editPage(i)}
        />
      </MediaQuery>
    
      <MediaQuery maxDeviceWidth={767}>
        <PhoneIndex 
          editPage={(i)=>editPage(i)}
        />
      </MediaQuery>
    </div>
  )
}
export default withRouter(connect((state)=>state)(Index))