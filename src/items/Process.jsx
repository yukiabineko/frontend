import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import { getOption } from './setItemData';
import Select from 'react-select';
import { connect } from 'react-redux';

const Process = (props)=>{
  const getitemData = ()=>{
    let item = []
    let datas = JSON.parse(localStorage.getItem('items'));
    datas.forEach((data)=>{
      if(data.id === props.id){
       item.push(data);
      }
    });
    return item
   }

   let item = getitemData();
   let options = getOption();
   const [selectedOption, setSelectedOption] = useState(null);
   const addProcess = (e)=>{
     e.preventDefault();
     alert(JSON.stringify(selectedOption));
   }
   /******************************ログイン/未ログイン切り替え********************************************************** */
   const loginUserCheck = ()=>{
    if(props.userData.length===0){
      props.history.push('/login');  
    }
  }
 useEffect(()=>{
   loginUserCheck();
 })

  return(
   <>
    <div className="text-center font-weight-bold h2 mt-5 mb-3">{item[0].name}加工法管理画面</div>
    <Row>
      <Col md={{ span: 6, offset: 3 }} className="p-5 bg-light shadow">
      <Form onSubmit={addProcess}>
        <Form.Group>
          <Form.Label>加工法の登録</Form.Label>
          <Select
          　isMulti
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </Form.Group>
        <Form.Control type="submit" variant="primary"  value="追加" />
      </Form>
      </Col>
    </Row>  
   </>
  )
}
export default withRouter(connect(state=>state)(Process))