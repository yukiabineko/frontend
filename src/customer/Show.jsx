import React, { useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

/**************************************************************************************** */
const  Show = (props)=>{
  return(
   <>
      <div className="text-center mt-5 mb-4  font-weight-bold">
        <h2>{props.userData[0].name}さんページ</h2>
      </div>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
          <Row>
            <Col md={{span :7}}>
             
            </Col>
          </Row>
        </Col>    
      </Row>
   </>
  )
}
export default withRouter(connect((state)=>state)(Show))
