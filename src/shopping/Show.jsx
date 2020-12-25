import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';


const  Show = (props)=>{
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
    useEffect(()=>{
      loginUserCheck();
    })

    /*ステータスによる条件訳*/

    const statusLayout = ()=>{
      switch (props.show.status) {
        case 0:
          return <div className="bg-info text-white text-center">申請中</div>;
        case 1:
          return <div className="bg-warning text-white text-center">加工済み</div>;
        case 2:
          return <div className="bg-danger text-white text-center">受け渡し済み</div>;
        default:
          break;
      }
    }
  return(
   <>
    <div className="text-center mt-5">
      <h2 className="font-weight-bold">注文状況確認/変更</h2>
    </div>
    <Row>
      < Col md={{ span: 8, offset: 2 }} className="p-5 bg-light shadow">
        {props.show? 
          <Table bordered>
            <tbody>
              <tr>
                <th className="bg-primary text-white">商品名</th>
                <td colSpan="3">{props.show.name}</td>
              </tr>
              <tr>
                <th className="bg-primary text-white">価格</th>
                <td>{props.show.price}</td>
                <th className="bg-primary text-white">注文数</th>
                <td>{props.show.num}</td>
              </tr>
              <tr>
                <th className="bg-primary text-white">合計金額</th>
                <td>{Number(props.show.price) * Number(props.show.num)}</td>
                <th className="bg-primary text-white">注文状況</th>
                <td>{statusLayout()}</td>
              </tr>
            </tbody>
          </Table>
           : 
          ''
        }
      </Col>
      </Row>
   </>
  )
}
export default withRouter(connect((state)=>state)(Show))
