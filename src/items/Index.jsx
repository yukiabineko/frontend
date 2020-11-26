import { useEffect, useState } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';



 function Index(props){
  
  
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
    <div className>
      <div className="text-center mt-5 mb-4">
        <h2 data-testid="usertitle">商品一覧</h2>
      </div>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="p-5 bg-light shadow">
          {props.userData.length > 0 ?

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center align-middle bg-dark text-white">商品名</th>
                  <th className="text-center align-middle bg-dark text-white">価格</th>
                  <th className="text-center align-middle bg-dark text-white">カテゴリー</th>
                </tr>
              </thead>
              <tbody></tbody>
               
            </Table>
            :
            <div>データなし</div>
            }
        </Col>
      </Row>
    </div>
  )
}
export default withRouter(connect((state)=>state)(Index))