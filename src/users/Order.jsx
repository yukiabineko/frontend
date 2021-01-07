import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import '../users/users.css';
import { connect } from 'react-redux';

/**************************************************************************************** */
const  Order = (props)=>{

/******************************ログイン/未ログイン切り替え********************************************************** */
const loginUserCheck = ()=>{
  if(props.userData.length===0){
    props.history.push('/login');  
  }
}
useState(loginUserCheck());
  const homeComponent = ()=>{
    props.history.push('/orders')  
  }
  
  
  return(
    <>
      <div className="text-center mt-5 mb-4">
        <h2 data-testid="userNewtitle">注文商品</h2>
      </div> 
    </>
   )
}
export default withRouter(connect(state=>state)(Order));
/***************************************************************************************************** */