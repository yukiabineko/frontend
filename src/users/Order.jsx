import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { withRouter } from 'react-router';
import '../users/users.css';
import { connect } from 'react-redux';
import { customerTodayOrders, totalMoneyCalc } from './setting';

const ulArea ={
  marginTop: '-4%'
}
const image={
  width: '100px',
  height: '100px'
}

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
        <h2 className="font-weight-bold text-light">現在注文商品</h2>
      </div> 
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
        <h3 className="mt-2">【注文合計金額: 
          <span className="text-danger font-weight-bold">
            {totalMoneyCalc(customerTodayOrders(props.userData[0].orders[0]))}
          </span>円】</h3>
          <ul class="list-group" style={ulArea}>
          {props.userData.length>0? customerTodayOrders(props.userData[0].orders[0]).map((data)=>(
            <li className="list-group-item mt-5">
              <Row>
                <Col md="12">
                  <ul className="list-inline">
                    <li className="list-inline-item h4 ml-5">
                       <Image src={`http://yukiabineko.sakura.ne.jp/react/${data.name}.jpg`} alt="表示できません" style={image} roundedCircle />
                    </li>
                    <li className="list-inline-item h5 mr-5">商品名:{data.name}</li>
                    <li className="list-inline-item h5 mr-3">価格:<span className="text-danger">{data.price}</span>円</li>
                    <li className="list-inline-item h5 mr-3">注文数:{data.num}</li>
                    <li className="list-inline-item h5 mr-3">合計:<span className="text-danger">{data.price *data.num}</span>円</li>
                    <li className="list-inline-item h5 mr-3">依頼加工:{data.process}</li>
                  </ul>
                
                </Col>
              </Row>
            </li>
          )) : ''}
          </ul>
        </Col>
      </Row>
    </>
   )
}
export default withRouter(connect(state=>state)(Order));
/***************************************************************************************************** */