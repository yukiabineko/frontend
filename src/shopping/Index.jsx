import { useEffect, useState } from 'react';
import { Row, Col, Table, Button,Modal, Image } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

 function Index(props){
  let localData = JSON.parse(localStorage.getItem('shoppings'));


  /************************ステート*************************************** */
  const[shopingData, setState] = useState(
    localData ? localData : []
  )
  
  /*************APIによるshopping一覧**********************************/
  async function shoppingsCall(){
    await axios
      .get('https://uematsu-backend.herokuapp.com/shoppings')
      .then((res)=>{
         localStorage.removeItem('shoppings');
         setState(res.data);
         localStorage.setItem('shoppings', JSON.stringify(res.data));
      })
      .catch((error)=>{
         console.log(error);
      })
     
   }
   useState(shoppingsCall());
  
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
        <h2 data-testid="itemstitle">注文確認表</h2>
      </div>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="p-5 bg-light shadow">
          
        </Col>
      </Row>
    </div>  
  )
}
export default withRouter(connect((state)=>state)(Index))