import React, { useState } from 'react';
import { Row, Col, Form, Button,Modal } from 'react-bootstrap';
import './App.css'
import { withRouter } from 'react-router'
import axios from 'axios'
import { connect} from 'react-redux';
import { sendLoginData } from './store/Store';

const  Login = (props)=>{

  const[state, setState] = useState({
    email: '',
    password: ''
  })

  const newUserComponent = ()=>{
    props.history.push('/users/new');  
  }
  const accesslogin = (e)=>{
    e.preventDefault();
    let data = {
      email: state.email,
      password: state.password,
    }
    axios.post('https://uematsu-backend.herokuapp.com/sessions', data)
      .then(function (response) {
        let action = sendLoginData(response.data);
        props.dispatch(action);
        /*railsからメッセージ*/
        alert('ログインしました'); 
        setState({
          name: '',
          email: '',
          password: '',
          confirmation: ''
        })
        props.history.push('/users/show');
      })
      .catch(function(err){
        alert(err);
      })
  }
  const inputText = (e)=>{
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setState({...state, [name]:value});
  }
  return(
   <>
    <div className="text-center mt-5 mb-4">
        <h2 className="text-secondary" data-testid="logintitle">ログイン</h2>
      </div>
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="p-5 bg-light shadow">
          <Form onSubmit={accesslogin} data-testid="loginForm">
            <Form.Group>
              <Form.Label>メールアドレス</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                placeholder="(例)sample@example.com" 
                className="h8" 
                onChange={inputText}
                required
                value={state.email}
                data-testid="ml"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>パスワード</Form.Label>
              <Form.Control
                 type="password" 
                 name="password"
                 placeholder="(例)password" 
                 onChange={inputText}
                 required
                 value={state.password}
                 data-testid="ps"
              />
            </Form.Group>

              <Button 
                type="submit" 
                variant="primary" 
                className="btn-block mt-4">
                  送信
              </Button>

              <Button 
                variant="primary" 
                onClick={newUserComponent}
                className="btn-block mt-3">
                新規登録
              </Button>
          </Form>
          
        </Col>
      </Row>
   </>
  )
}
export default withRouter(connect((state)=>state)(Login))