import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import '../App.css';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

const  Reservation = (props)=>{
 

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
        <h2 data-testid="userNewtitle">明日の予約一覧表</h2>
      </div> 
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
      
          
        </Col>
      </Row>
   </>
  )
}
export default withRouter(connect(state=>state)(Reservation));