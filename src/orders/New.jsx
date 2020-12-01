import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import '../App.css';
import { withRouter } from 'react-router';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.browser.cjs';
import { formSelectItems } from './setItem';

const  New = (props)=>{
  const options = formSelectItems();
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
              <Select
                valueKey="id"
                labelKey="item"
                options={options}
              />
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