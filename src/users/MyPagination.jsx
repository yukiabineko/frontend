import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Table, Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';


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
      <Pagination.Item key={i} active={i == state.first}>{i}</Pagination.Item>
    )
  }
    
  
  return(
   <>
    <Pagination>{items}</Pagination>
   </>
  )
}
export default withRouter(connect((state)=>state)(MyPagination))