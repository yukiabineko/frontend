import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import '../App.css';
import { withRouter } from 'react-router';
import axios from 'axios';

const  New = (props)=>{

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
          <Form>
            <Form.Group>
              <Form.Label>商品名</Form.Label>
              <Form.Control type="text" name="name" placeholder="*必須です。" className="h8" required />
            </Form.Group>

            <Form.Group>
              <Form.Label>価格</Form.Label>
              <Form.Control type="price" name="price" placeholder="*必須です。" required />
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