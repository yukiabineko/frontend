import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';

const  New = (props)=>{

  const[show,setShow] =useState({
    display: 'none'
  })

  const[state, setState] = useState({
    name: '',
    price: '',
    category: '',
    info: ''
  })
  

  const loginComponent = ()=>{
    props.history.push('/login')  
  }
  const itemInput = (e)=>{
   
  }
  const sendItemParameter = (e)=>{
    e.preventDefault();
    
    
  }
  return(
   <>
      <div className="text-center mt-5 mb-4">
        <h2 data-testid="userNewtitle">新規商品登録</h2>
      </div>
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
        <Button 
          variant="secondary" 
          onClick={loginComponent}
          className="mb-3"
        >
         戻る
        </Button>
          <Form onSubmit={sendItemParameter}>
            <Form.Group>
              <Form.Label>商品名</Form.Label>
              <Form.Control type="text" name="name" placeholder="*必須です。" className="h8" required onChange={itemInput} value={state.name} />
            </Form.Group>

            <Form.Group>
              <Form.Label>価格</Form.Label>
              <Form.Control type="price" name="price" placeholder="*必須です。" required onChange={itemInput} value={state.price} />
            </Form.Group>

            <Form.Group>
              <Form.Label>カテゴリー</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                 {["青魚","白身魚","大型魚","いか、タコ","貝","その他"].map((value, i)=>
                   <option key={i} value={value}>{value}</option>
                 )}
                </Form.Control>
            </Form.Group>
               
            <Form.Group>
              <Form.Label>商品説明</Form.Label>
              <textarea name="i fo" cols="30" rows="10" className="form-control"></textarea>
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