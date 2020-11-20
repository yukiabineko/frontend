import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import '../App.css';
import { withRouter } from 'react-router';
import axios from 'axios';

const  New = (props)=>{

  const[state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmation: ''
  })

  const loginComponent = ()=>{
    props.history.push('/login')  
  }
  const userInput = (e)=>{
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setState({...state, [name]: value});
  }
  const sendUserParameter = (e)=>{
    e.preventDefault();
    let data = {
      name: state.name,
      email: state.email,
      password: state.password,
      confirmation: state.confirmation
    }
    axios.post('http://192.168.1.9:3000/users', data)
    .then(function (response) {
      /*railsからメッセージ*/
      alert(response.data.message); 
    })
    .catch(function(){
      alert('error');
    })
  }
  return(
   <>
      <div className="text-center mt-5 mb-4">
        <h2>新規登録</h2>
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
          <Form onSubmit={sendUserParameter}>
            <Form.Group>
              <Form.Label>お名前</Form.Label>
              <Form.Control type="text" name="name" placeholder="*必須です。" className="h8" required onChange={userInput} value={state.name} />
            </Form.Group>

            <Form.Group>
              <Form.Label>メールアドレス</Form.Label>
              <Form.Control type="email" name="email" placeholder="*必須です。" required onChange={userInput} value={state.email} />
            </Form.Group>

            <Form.Group>
              <Form.Label>パスワード</Form.Label>
              <Form.Control type="password" name="password" placeholder="*必須です。" required onChange={userInput} value={state.password} />
            </Form.Group>

            <Form.Group>
              <Form.Label>パスワード確認</Form.Label>
              <Form.Control type="password" name="confirmation" placeholder="*もう一度入力ください。" required onChange={userInput}
                value={state.confirmation}
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