import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { withRouter } from 'react-router';
import '../users/users.css';
import { connect } from 'react-redux';
import { customerTodayOrders, totalMoneyCalc, statusView } from './setting';
import Reservation from './Reservation'; 
import { timeSetting } from '../setting';
import useScript from '../useScript';
import { Button } from 'bootstrap';
import axios from 'axios'
import { sendLoginData } from '../store/Store';

const ulArea ={
  marginTop: '-4%'
}
const image={
  width: '100px',
  height: '100px'
}

/*****************************お客様用注文一覧ページ*********************************************************** */
const  Order = (props)=>{
 
  const updateView = ()=>{
    const id_data = {id: props.userData[0].id, email: props.userkey.email, password: props.userkey.password }
    axios.post(`https://uematsu-backend.herokuapp.com/users/show`, id_data).then(function(response){
       let action = sendLoginData (response.data);
       props.dispatch(action);
     
  
    }).catch(function(err){
     console.log(err);
    });
  }
  useState(updateView);
 
/******************************ログイン/未ログイン切り替え********************************************************** */
const loginUserCheck = ()=>{
  if(props.userData.length===0){
    props.history.push('/login');  
  }
}
useState(loginUserCheck());
  useScript();

  return(
    <>
      <div className="text-center mt-5 mb-4">
        <h1 className="font-weight-bold text-white">現在注文商品</h1>
      </div> 
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
          
          <div className="text-center">
            【本日受取商品】
          </div>
          {((props.userData.length>0) && (customerTodayOrders(props.userData[0].orders[0]).length >0))?
           <div>
              <h3 className="mt-2">【注文合計金額: 
              <span className="text-danger font-weight-bold">
                {totalMoneyCalc(customerTodayOrders(props.userData[0].orders[0]))}
              </span>円】</h3>

              <form id ="todayorder-customer">

              </form>
           </div>
           : 
           ''}
          
          <ul class="list-group" style={ulArea}>
          {((props.userData.length>0) && (customerTodayOrders(props.userData[0].orders[0]).length >0))? customerTodayOrders(props.userData[0].orders[0]).map((data)=>(
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
                    <li className="list-inline-item h5 mr-3">受け取り時間:{timeSetting(data.receiving_time)}</li>
                    <li className="list-inline-item text-white pt-2 pb-2 mr-3">{ statusView(data.status) }</li>
                    {data.pay? <span className="bg-warning font-weight-bold text-danger p-2">支払い済</span> : ''}
                  </ul>
                
                </Col>
              </Row>
            </li>
          )) :   <div className="p-5 text-white text-center mt-5 bg-secondary font-weight-bold">データがありません</div>}
          </ul>
        </Col>
      </Row>
      <br/>
      <Reservation />
    </>
   )
}
export default withRouter(connect(state=>state)(Order));
/***************************************************************************************************** */