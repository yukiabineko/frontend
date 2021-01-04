import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { historyDataSend } from '../store/Store';
import { ordercheck, daySetting } from './setting';
import History from './History';


/**************************************************************************************** */
const  EmpShow = (props)=>{
   
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
   useState(loginUserCheck());
  return(
   <>
      <h2 className="mt-5">test</h2>
   </>
  )
}
export default withRouter(connect((state)=>state)(EmpShow))
