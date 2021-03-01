import React, { useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { daySetting, customerTodayOrders,customerOrders } from './setting';



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
        <h2 data-testid="userNewtitle" className="text-light font-weight-bold">{props.historyData? props.historyData.name : ''}&nbsp;注文履歴</h2>
      </div>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
         <p className="font-weight-bold text-center">【現在注文中の表品一覧】</p>
         {(props.historyData && customerTodayOrders(props.historyData.orders[0]).length >0)? 
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
              <tbody>
                {customerTodayOrders(props.historyData.orders[0]).map((data)=>(
                  <tr>
                    <td className="text-center font-weight-bold">{daySetting(data.shopping_date)}</td>
                    <td className="text-center font-weight-bold">{data.name}</td>
                    <td className="text-center font-weight-bold">{data.price}</td>
                    <td className="text-center font-weight-bold">{data.num}</td>
                    <td className="text-center font-weight-bold">{Number(data.num) * Number(data.price)}</td>
                    <td className="text-center font-weight-bold">{data.process}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
           </>
            : 
            <div className="bg-secondary text-center font-weight-bold text-white p-3">データがありません。</div>
          }
        </Col>    
      </Row>

      {/* 当日以外の履歴 */}

      <Row>
        <Col md={{ span: 8, offset: 2 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
         <p className="font-weight-bold text-center">【過去の注文一覧】</p>
         {(props.historyData && customerOrders(props.historyData.orders[0]).length >0)? 
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
              <tbody>
                {customerOrders(props.historyData.orders[0]).map((data)=>(
                  <tr>
                    <td className="text-center font-weight-bold">{daySetting(data.shopping_date)}</td>
                    <td className="text-center font-weight-bold">{data.name}</td>
                    <td className="text-center font-weight-bold">{data.price}</td>
                    <td className="text-center font-weight-bold">{data.num}</td>
                    <td className="text-center font-weight-bold">{Number(data.num) * Number(data.price)}</td>
                    <td className="text-center font-weight-bold">{data.process}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
           </>
            : 
            <div className="bg-secondary text-center font-weight-bold text-white p-3">データがありません。</div>
          }
        </Col>    
      </Row>

   </>
  )
}
export default withRouter(connect((state)=>state)(EmpShow))
