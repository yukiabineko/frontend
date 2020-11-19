import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './App.css'
import { withRouter } from 'react-router'

export default function Login(){
 
  return(
   <>
    <div className="text-center mt-5 mb-4">
        <h2>ログイン</h2>
      </div>
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="p-5 bg-light shadow">
          <Form>
            <Form.Group>
              <Form.Label>メールアドレス</Form.Label>
              <Form.Control type="email" placeholder="(例)sample@example.com" className="h8" />
            </Form.Group>

            <Form.Group>
              <Form.Label>パスワード</Form.Label>
              <Form.Control type="password" placeholder="(例)password" />
            </Form.Group>

              <Button 
                type="submit" 
                variant="primary" 
                className="btn-block mt-5">
                  送信
              </Button>
          </Form>
          
        </Col>
      </Row>
   </>
  )
}