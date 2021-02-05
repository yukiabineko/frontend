import React, { useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import '../App.css';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { todayOrderExisting } from './settiing';
import { timeSetting } from '../setting';

 /******************************従業員側明日の予約確認ページ********************************************************** */

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
        <h2 className="text-light font-weight-bold">明日の予約一覧表</h2>
      </div> 
      <Row>
        <Col md={{ span: 10, offset: 1 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
         {todayOrderExisting(JSON.parse(localStorage.getItem('shoppings'))).map((data,i)=>(
           <>
           <div className="font-weight-bold h3">【{data.user_name}さん】</div>
           <Table bordered className="mt-3">
             <tbody>
               <tr>
                 <th className="bg-primary text-white font-weight-bold">商品名</th>
                 <td colSpan="5" className="font-weight-bold">{data.name}</td>
               </tr>
               <tr>
                 <th className="bg-primary text-white font-weight-bold">依頼調理法</th>
                 <td colSpan="5" className="font-weight-bold">{data.process}</td>
               </tr>
               <tr>
                 <th className="bg-primary text-white font-weight-bold">受け取り時間</th>
                 <td colSpan="5" className="font-weight-bold">{timeSetting(data.receiving_time)}</td>
               </tr>
               <tr>
                 <th className="bg-primary text-white font-weight-bold">商品単価</th>
                 <td className="font-weight-bold">{data.price}</td>
                 <th className="bg-primary text-white font-weight-bold">注文数量</th>
                 <td className="font-weight-bold">{data.num}</td>
                 <th className="bg-primary text-white font-weight-bold">合計金額</th>
                 <td className="font-weight-bold">{data.price * data.num}</td>
               </tr>
               <tr>

               </tr>
             </tbody>
           </Table>
           </>
         ))}
           
          
        </Col>
      </Row>
   </>
  )
}
export default withRouter(connect(state=>state)(Reservation));