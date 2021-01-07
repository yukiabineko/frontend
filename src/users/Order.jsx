import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import '../users/users.css';
import { connect } from 'react-redux';
import { customerTodayOrders } from './setting';

/*****************************お客様用注文一覧ページ*********************************************************** */
const  Order = (props)=>{
 
/******************************ログイン/未ログイン切り替え********************************************************** */
const loginUserCheck = ()=>{
  if(props.userData.length===0){
    props.history.push('/login');  
  }
}
useState(loginUserCheck());
  
  return(
    <>
      <div className="text-center mt-5 mb-4">
        <h2 className="font-weight-bold text-light">現在注文商品{customerTodayOrders(props.userData[0].orders[0]).length}</h2>
      </div> 
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
          <ul class="list-group">
          {customerTodayOrders(props.userData[0].orders[0]).map((data)=>(
            <li className="list-group-item">
            
            </li>
          ))}
          </ul>
        </Col>
      </Row>
    </>
   )
}
export default withRouter(connect(state=>state)(Order));
/***************************************************************************************************** */