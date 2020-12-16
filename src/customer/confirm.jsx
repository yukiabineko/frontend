import React, { useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart　} from "@fortawesome/free-solid-svg-icons";

const title={
  fontFamily: 'ヒラギノ明朝',
  color: '#0000CD',
  fontWeight: 'bold',
  marginTop: '8%'
}
const span ={
  color: '#6927FF',
  marginRight: '20px'
}
const th={
  background: '#8EB8FF',
  color: '#0000CD',
  textAlign: 'center'
}



/**************************************************************************************** */

const  Confirm = (props)=>{

/***********************サーバー送信***************************************************************** */
const sendServer = ()=>{
  let sendData = props.buyCarts;
   let obj = {}
   obj['id'] = props.userData[0].id;
   obj['data'] = sendData
   axios.post('http://localhost:3001/shoppings', obj)
      .then(function (response) {
        /*railsからメッセージ*/
        alert(response.data.message); 
      })
      .catch(function(){
        alert('error');
      }) 
  }
/********************************************************************************************************************************** */
  return(
   <>
       <div className="text-center mt-5 mb-3">
         <h1 style={title}>
           <span style={span}><FontAwesomeIcon icon ={faShoppingCart} /></span>
           注文確認
        </h1>
       </div>
       <Row>
        <Col md={{ span: 8, offset: 2 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
         <Form>
           <Table bordered className="mt-3">
             <thead>
               <th style={th}>商品名</th>
               <th style={th}>価格</th>
               <th style={th}>注文数</th>
               <th style={th}>加工法</th>
               <th style={th}>合計</th>
               <th style={th}></th>
             </thead>
           </Table>
         </Form>
        </Col>
      </Row>
   </>
  )
}
export default withRouter(connect((state)=>state)(Confirm))
