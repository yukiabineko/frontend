import { useEffect, useState } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../App.css'
import { connect } from 'react-redux';
import image from '../images/fishs2.jpg';


 function Index(props){
 
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
    <div>
       <img src={image} alt="画像" className="costomer-imag"/>
       <div className="customor-main">
    　　　<h1 className="customor-main-title">本日入荷商品紹介</h1>
         <article>
           <h5>商品一覧</h5>

         </article>
         <div className="customor-right">

         </div>
      </div>
    </div>
    
     
  )
}
export default withRouter(connect((state)=>state)(Index))