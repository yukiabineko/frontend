import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';


const  MyPagination = (props)=>{
    let paginationLength = JSON.parse(localStorage.getItem('items')).length;
    let active = props.No +1;
    let items = [];
    if(props.No > 0){
       items.push(
        <Pagination.First onClick={()=>backButton()} /> 
       )
    }
    for (let number = 1; number <= paginationLength /2; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active} onClick={(num)=>sendNumber(number-1)}>
          {number}
        </Pagination.Item>,
      );
    }
  /************************ページネーション処理**************************************** */
  const sendNumber =(num)=>{
      props.paginationSend(num);
  }
  /************************ページネーション戻るボタン処理**************************************** */
  const backButton = () =>{
     alert(props.No -1);
  }
  return(
   <>
    <Pagination >{items}</Pagination>
   </>
  )
}
export default withRouter(connect((state)=>state)(MyPagination))