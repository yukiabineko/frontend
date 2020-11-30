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
   </>
  )
}
export default withRouter(New)