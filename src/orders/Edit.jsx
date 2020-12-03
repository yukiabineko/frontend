import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import '../users/users.css';

/**************************************************************************************** */
const  OrderEdit = (props)=>{

 const getitemData = ()=>{
  let orders = []
  let datas = JSON.parse(localStorage.getItem('orders'));
  datas.forEach((data)=>{
    if(data.id === props.id){
     orders.push(data);
    }
  });
  return orders
 }
 let orders = getitemData();
 

/*********************************state******************************************************* */
  
  const[state, setState] = useState({
    name: orders[0].name,
    price: orders[0].price,
    stock: orders[0].stock
  })

  const homeComponent = ()=>{
    props.history.push('/orders')  
  }
  const dochange = (e)=>{
    const target = e.target;
    const name = target.name;
    const value = target.value
    setState({...state, [name]: value});
  }
  const doSubmit = (e)=>{
    e.preventDefault();
    let sendData ={name:state.name, price: state.price, stock: state.stock};
    axios.patch(`https://uematsu-backend.herokuapp.com/orders/${props.id}`, sendData)
      .then(function (response) {
        /*railsからメッセージ*/
        alert(response.data.message); 
      })
      .catch(function(){
        alert('error');
      })
      props.history.push('/orders');
  }
  
  return(
    <>
      <div className="text-center mt-5 mb-4">
        <h2 data-testid="userNewtitle">{orders[0].name}編集</h2>
      </div> 
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
        <Button 
          variant="secondary" 
          className="mb-3"
          onClick={homeComponent}
        >
         戻る
        </Button>
          <Form onSubmit={doSubmit}>
            <Form.Group>
              <Form.Label>商品名</Form.Label>
              <div className="font-weight-bold">{state.name}</div>
              <Form.Control 
                type="hidden"
                name="name"
                value={state.name} />
            </Form.Group>

            <Form.Group>
              <Form.Label>価格</Form.Label>
              <Form.Control 
                type="number" 
                name="price" 
                placeholder="*必須です。" 
                value={state.price} required
                onChange={dochange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>在庫</Form.Label>
              <Form.Control 
                type="number" 
                name="stock" 
                value={state.stock}
                onChange={dochange}
              />
            </Form.Group>


              <Button 
                type="submit" 
                variant="primary" 
                className="btn-block mt-4">
                  送信
              </Button>
          </Form>
          
        </Col>
      </Row>
   </>
   )
}
export default withRouter(OrderEdit)
/***************************************************************************************************** */