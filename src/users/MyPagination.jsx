import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { searchSend } from '../store/Store';

const  MyPagination = (props)=>{
  let items = [];
  const[state, setState] = useState({
    first: 1,
    last: ((props.userData[0].orders[0]) && props.userData[0].orders[0].length>=5)? 
    Math.floor(props.userData[0].orders[0].length/5 >10)?  10 : Math.floor(props.userData[0].orders[0].length/5)   : 1,
    active: 1
  });
  for(let i=state.first; i<=state.last; i++){
    items.push(
      <Pagination.Item key={i} active={i == state.active} onClick={()=>seachDatarequest(i)}>{i}</Pagination.Item>
    )
  }
  const seachDatarequest = (i)=>{
    let data = {
      user_id: props.userData[0].id,
      num: i
    }
    axios.post('https://uematsu-backend.herokuapp.com/history/search', data)
    .then(function (response) {
      let action = searchSend(response.data);
      props.dispatch(action);
    })
    .catch(function(){
      alert('error');
    })
    setState({
      first: state.first,
      last: state.last,
      active: i
    })
  }  
  
  return(
   <>
    <Pagination >{items}</Pagination>
   </>
  )
}
export default withRouter(connect((state)=>state)(MyPagination))