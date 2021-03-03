import { useState } from 'react';
import { withRouter } from 'react-router-dom';
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
   const editPage = (item)=>{
    props.itemEditIdget(item);
    props.history.push("/items_edit");
  } 
  /*****************************加工ページ********************************************* */
  const processItem = (item)=>{
    props.processIdget(item);
    props.history.push('/items_process');
  }
  
  return(
    <div>
      <MediaQuery minDeviceWidth={767}>
        <PcIndex 
          editPage={(item)=>editPage(item)}
          processItem ={(item)=>processItem (item)}
        />
      </MediaQuery>
    
    <MediaQuery maxDeviceWidth={767}>
      <PhoneIndex 
          editPage={(item)=>editPage(item)}
          processItem ={(item)=>processItem (item)}
      />
    </MediaQuery>
    </div>
  )
}
export default withRouter(connect((state)=>state)(Index))