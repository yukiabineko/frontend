import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { historyDataSend } from '../store/Store';

/**************************************************************************************** */
const  Show = (props)=>{
  /*************APIによるuser一覧**********************************/
   async function orderCall(){
     
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
   useState(orderCall());
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
      {props.userData.length >0?
       <>
        <div className="text-center mt-5 mb-4  font-weight-bold">
        <h2>{props.userData[0].name}さんページ</h2>
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
                   <td>{props.userData[0].created_at}</td>
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
                   <td></td>
                 </tr>
                 <tr>
                   <th className="bg-primary text-white w-50">最終ご利用日</th>
                   <td></td>
                 </tr>
                 <tr>
                   <th className="bg-primary text-white w-50">現在注文有無</th>
                   <td></td>
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
   </>
  )
}
export default withRouter(connect((state)=>state)(Show))
