import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import '../App.css';
import { withRouter } from 'react-router';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.browser.cjs';
import { formSelectItems } from './setItem';

const  New = (props)=>{
  const[state, setState] = useState({
    price: '',
    stock: ''
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const options = formSelectItems();

  
  const dochange = (e)=>{
    const target = e.target;
    const name = target.name;
    const value = target.value
    setState({...state, [name]: value});
  }
  const doSubmit = (e)=>{
    e.preventDefault();
    let sendData ={name: selectedOption.value, price: state.price, stock: state.stock};
    axios.post('https://uematsu-backend.herokuapp.com/orders', sendData)
      .then(function (response) {
        /*railsからメッセージ*/
        alert(response.data.message); 
        setState({
          price: '',
          stock: '',
        })
        setSelectedOption(null);
      })
      .catch(function(){
        alert('error');
      })
  }
  return(
   <>
      <div className="text-center mt-5 mb-4">
        <h2 data-testid="userNewtitle">店頭商品追加</h2>
      </div> 
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
        <Button 
          variant="secondary" 
          className="mb-3"
        >
         戻る
        </Button>
          <Form onSubmit={doSubmit}>
            <Form.Group>
              <Form.Label>商品名</Form.Label>
              <Select
                options={options}
                defaultvalue={selectedOption}
                onChange={setSelectedOption}
              />
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
export default withRouter(New)