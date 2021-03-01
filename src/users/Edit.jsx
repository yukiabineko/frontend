import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import '../App.css';
import './users.css';
import { withRouter } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';

/**************************************************************************************** */
const  Edit = (props)=>{

 const getuserData = ()=>{
  let user = []
  let datas = JSON.parse(localStorage.getItem('users'));
  datas.forEach((data)=>{
    if(data.id === props.id){
     user.push(data);
    }
  });
  return user
 }
  let user = getuserData();
  const[show,setShow] =useState({
    display: 'none'
  })

  const[state, setState] = useState({
    name: user.length>0? user[0].name : '',
    email: user.length>0?  user[0].email : '',
    password: '',
    confirmation: ''
  })
  /******************************ログイン/未ログイン切り替え********************************************************** */
  const loginUserCheck = ()=>{
    if(props.userData.length===0){
      props.history.push('/login');  
    }
  }
 useState(loginUserCheck());


  const homeComponent = ()=>{
    props.history.push('/')  
  }
  const userInput = (e)=>{
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setState({...state, [name]: value});
  }
  const sendUserParameter = (e)=>{
    e.preventDefault();
    if(state.password === state.confirmation){
      let data = {
        name: state.name,
        email: state.email,
        password: state.password,
        confirmation: state.confirmation
      }
      setShow({display: 'none'});
      axios.patch(`https://uematsu-backend.herokuapp.com/users/${props.id}`, data)
      .then(function (response) {
        /*railsからメッセージ*/
        alert(response.data.message); 
        setState({
          name: '',
          email: '',
          password: '',
          confirmation: ''
        })
      })
      .catch(function(){
        alert('error');
      })
    }
    /*password不一致警告解除*/
    else{
      setShow({display: 'block'});
    }
  }
  return(
   <>
      <div className="text-center mt-5 mb-4">
        <h2>{state.name}情報編集</h2>
      </div>
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
        <Button 
          variant="secondary" 
          onClick={homeComponent}
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
              <Form.Label>パスワード</Form.Label><br/>
              <div class="balloon1" style={show}>
                <p>パスワードが一致してません。</p>
              </div>
              <Form.Control type="password" name="password" placeholder="*必須です。" required onChange={userInput} value={state.password} />
             
            </Form.Group>

            <Form.Group>
              <Form.Label>パスワード確認</Form.Label><br />
              <div class="balloon1" style={show}>
                <p>パスワードが一致してません。</p>
              </div>
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
export default withRouter(connect(state=>state)(Edit));
/***************************************************************************************************** */