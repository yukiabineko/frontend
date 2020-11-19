import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import '../App.css';
import { withRouter } from 'react-router'

const  New = (props)=>{

  const loginComponent = ()=>{
    props.history.push('/login')  
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
          <Form>
            <Form.Group>
              <Form.Label>お名前</Form.Label>
              <Form.Control type="text" name="name" placeholder="*必須です。" className="h8" required />
            </Form.Group>

            <Form.Group>
              <Form.Label>メールアドレス</Form.Label>
              <Form.Control type="email" name="email" placeholder="*必須です。" required />
            </Form.Group>

            <Form.Group>
              <Form.Label>パスワード</Form.Label>
              <Form.Control type="password" name="password" placeholder="*必須です。" required />
            </Form.Group>

            <Form.Group>
              <Form.Label>パスワード確認</Form.Label>
              <Form.Control type="password" name="password_confirmation" placeholder="*もう一度入力ください。" required />
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