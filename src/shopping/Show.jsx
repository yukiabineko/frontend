import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';


const  Show = (props)=>{
  
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
   <>
    <div className="text-center mt-5">
      <h2 className="font-weight-bold">注文状況確認/変更</h2>
    </div>
    
   </>
  )
}
export default withRouter(connect((state)=>state)(Show))
