import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import '../App.css';
import './users.css';
import { withRouter } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { sendLoginData } from '../store/Store';
import { circularLoading }  from '@yami-beta/react-circular-loading';
import { spanStyle } from '../style';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//プログレスステータス
const CircularLoading = circularLoading({
  num: 6,
  distance: 1,
  dotSize: 0.5,

});


/**************************************************************************************** */
const  Edit = (props)=>{

  const[show,setShow] =useState({
    display: 'none'
  })
  const[progress,setProgres] = useState(false)
  const[state, setState] = useState({
    name: props.userData.length>0? props.userData[0].name : '',
    email: props.userData.length>0? props.userData[0].email : '',
    tel: props.userData.length>0? props.userData[0].tel : '',
    confirmation: ''
  })
  /******************************ログイン/未ログイン切り替え********************************************************** */
  const loginUserCheck = ()=>{
    if(props.userData.length===0){
      props.history.push('/login');  
    }
  }
 useState(loginUserCheck());

  const userInput = (e)=>{
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setState({...state, [name]: value});
  }
  /*編集処理*/
  const sendUserParameter = (e)=>{
    setProgres(true);
    e.preventDefault();
    if(state.password === state.confirmation){
      let data = {
        name: state.name,
        email: state.email,
        tel: state.tel,
        password: state.password,
        confirmation: state.confirmation
      }
      setShow({display: 'none'});
      axios.patch(`https://uematsu-backend.herokuapp.com/users/${props.id}`, data)
      .then(function (response) {
        /*railsからメッセージ*/

        /*バリデーション通過*/
        if(response.data.message === "編集しました"){
          const id_data = {id: props.userData[0].id, email: props.userkey.email, password: props.userkey.password }
          axios.post(`https://uematsu-backend.herokuapp.com/users/show`, id_data).then(function(res){
            let action = sendLoginData (res.data);
            props.dispatch(action);
            alert(response.data.message); 
            setProgres(false);
            props.history.push('/users/show');

          }).catch(function(err){
          console.log(err);
          });
        }
        /*バリデーションブロック時*/

        else{
          let alertMsg = "";
          let messages = response.data.message
          messages.forEach(message => {
            alertMsg += message + "\n";
          });
          alert("【編集失敗】\n" + alertMsg); 
          setProgres(false);
        }
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
        <h2 className="text-white font-weight-bold">
          <span style={spanStyle}>
           <span className="mr-3 text-white"><FontAwesomeIcon icon={faUserEdit} /></span>
            {state.name}情報編集
          </span></h2>
      </div>
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
          {/* プログレス */}
     
          {progress ===true? 
            <div id="progress" className=" pl-2 pr-2  bg-white shodow">
              <p　className="mt-3 font-weight-bold">しばらくお待ちください。</p>
              <div className="text-center">
              <CircularLoading />
              </div>
            </div>
          : 
          ''
          }
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
              <Form.Label>電話番号</Form.Label>
              <Form.Control type="tel" name="tel" placeholder="(例)090-1111-1111" required pattern="[\d\-]*" onChange={userInput} value={state.tel} />
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