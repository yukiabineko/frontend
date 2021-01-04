import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { customerTodayOrders } from './setting';



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
      <div className="text-center mt-5 mb-4">
        <h2 data-testid="userNewtitle" className="text-light font-weight-bold">{props.historyData.name}&nbsp;注文履歴</h2>
      </div>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
         <p className="font-weight-bold text-center">【現在注文中の表品一覧】</p>
         {props.historyData? 
           <>
            <Table bordered>
              <thead>
                <tr>
                  <th rowSpan="2" className="text-white text-center bg-primary align-middle">日付</th>
                  <th rowSpan="2" className="text-white text-center bg-primary align-middle">商品名</th>
                  <th colSpan="3" className="text-white text-center bg-primary">価格</th>
                  <th rowSpan="3" className="text-white text-center bg-primary align-middle">依頼加工</th>
                </tr>
                <tr>
                  <th className="text-white text-center bg-primary">単価</th>
                  <th className="text-white text-center bg-primary">数量</th>
                  <th className="text-white text-center bg-primary">合計</th>
                </tr>
              </thead>
            </Table>
           </>
            : 
            <div className="bg-secondary text-center font-weight-bold text-white">データがありません。</div>
          }
        </Col>    
      </Row>
   </>
  )
}
export default withRouter(connect((state)=>state)(EmpShow))
