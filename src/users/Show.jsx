import React, { useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { ordersSend } from '../store/Store';
import { ordercheck, daySetting } from './setting';
import History from './History';


/**************************************************************************************** */
const  Show = (props)=>{
 const sendShoppindData = ()=>{
  axios
  .get('https://uematsu-backend.herokuapp.com/orders')
  .then((res)=>{
     let action = ordersSend(res.data);
     props.dispatch(action);
     
  })
  .catch((error)=>{
     console.log(error);
  })
 }
 useState(sendShoppindData);
   
  /*************APIによるuser一覧**********************************/
   /*async function orderCall(){
     
    await axios
      .get(`https://uematsu-backend.herokuapp.com/history/show/${props.userData[0].id}`)
      .then((res)=>{
         const action = historyDataSend(res.data);
         props.dispatch(action);

      })
      .catch((error)=>{
         console.log(error);
      })
 }
 */


/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
    useState(loginUserCheck)
  return(
   <>
      {props.userData.length >0?
       <>
        <div className="text-center mt-5 mb-4  font-weight-bold">
          <h2 className="text-white font-weight-bold">{props.userData[0].name}さんページ</h2>
        </div>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
          <Row>
            <Col md={{span :7}}>
              <p className="font-weight-bold">会員情報</p>
              <Table  bordered className="mt-3">
                <tbody>
                 <tr>
                   <th className="bg-primary text-white w-50">名前</th>
                   <td>{props.userData[0].name}</td>
                 </tr>
                 <tr>
                   <th className="bg-primary text-white w-50">メールアドレス</th>
                   <td>{props.userData[0].email}</td>
                 </tr>
                 <tr>
                   <th className="bg-primary text-white w-50">ご利用開始日</th>
                   <td>{daySetting(props.userData[0].create)}</td>
                 </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={{span :5}}>
            <p className="font-weight-bold">ご利用状況</p>
              <Table  bordered className="mt-3">
                <tbody>
                 <tr>
                   <th className="bg-primary text-white w-50">ご利用回数</th>
                   <td className="text-center">{props.userData[0].orders[0]? props.userData[0].orders[0].length : 0 }</td>
                 </tr>
               
                 <tr>
                   <th className="bg-primary text-white w-50">現在注文有無</th>
                   <td className="text-center">{ordercheck(props.userData[0].orders[0]).count? ordercheck(props.userData[0].orders[0]).count : '未使用'}</td>
                 </tr>

                 <tr>
                   <th className="bg-primary text-white w-50">注文日</th>
                   <td className="text-center">{ordercheck(props.userData[0].orders[0]).date? ordercheck(props.userData[0].orders[0]).date : '未使用'}</td>
                 </tr>
               
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>    
      </Row>
      </>
        : 
        loginUserCheck()
      }
      {/* 履歴エリア */}

      <div className="text-center mt-3 font-weight-bold">
          <h2 className="text-light font-weight-bold">商品依頼履歴</h2>
      </div>

      <Row>
        <Col md={{ span: 8, offset: 2 }} className="pt-3 pl-5 pr-5 mt-2 pb-4 bg-light shadow">
          {/* ログアウト中は無効 */}
          
          {props.userData.length >0? <History /> : ''}
        </Col>
      </Row>
   </>
  )
}
export default withRouter(connect((state)=>state)(Show))
