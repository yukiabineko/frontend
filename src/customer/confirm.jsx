import React, { useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios'
import { cartEmpty } from '../store/Store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faFish, faYenSign, faCalculator, faUtensils, faCashRegister } from "@fortawesome/free-solid-svg-icons";

const title={
  fontFamily: 'ヒラギノ明朝',
  color: '#0000CD',
  fontWeight: 'bold',
  marginTop: '8%'
}
const span ={
  color: '#6927FF',
  marginRight: '20px'
}
const th={
  background: '#8EB8FF',
  color: '#eee',
  textAlign: 'center'
}



/**************************************************************************************** */

const  Confirm = (props)=>{

/***********************サーバー送信***************************************************************** */
const sendServer = ()=>{
    const params = new FormData();
    params.append('email', props.userData[0].email);
    params.append('name', props.userData[0].name);

     /* PHP送信　*/
    axios.post('http://yukiabineko.sakura.ne.jp/mail.php',
　　　 params,
      {
        headers:{
          'content-type': 'multipart/form-data',
        },
      }
    ).then((res)=>{
        console.log(res.data);
    }).catch(()=>{
    })


  let sendData = props.buyCarts;
   let obj = {}
   obj['id'] = props.userData[0].id;
   obj['data'] = sendData

   /* rails送信　*/
   axios.post('https://uematsu-backend.herokuapp.com/shoppings', obj)
      .then(function (response) {
        /*railsからメッセージ*/
        alert(response.data.message); 
      })
      .catch(function(){
        alert('error');
      }) 
    props.history.push('/users/show');  /*ユーザーページへ移動*/
    props.dispatch(cartEmpty());  /*買い物カゴリセット*/

  }
/********************************************************************************************************************************** */
  return(
   <>
       <div className="text-center mt-5 mb-3">
         <h1 style={title}>
           <span style={span}><FontAwesomeIcon icon ={faShoppingCart} /></span>
           注文確認
        </h1>
       </div>
       <Row>
        <Col md={{ span: 8, offset: 2 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
         <Form>
           <Table bordered className="mt-3">
             <thead>
               <th style={th}>
                  <span className="text-primary mr-2 h5">
                    <FontAwesomeIcon icon={faFish} />
                  </span>
                  商品名
               </th>
               <th style={th}>
                  <span className="text-primary mr-2 h5">
                    <FontAwesomeIcon icon={faYenSign} />
                  </span>
                  価格
               </th>
               <th style={th}>
                  <span className="text-primary mr-2 h5">
                    <FontAwesomeIcon icon={faCalculator} />
                  </span>
                  数
               </th>
               <th style={th}>
                 <span className="text-primary mr-2 h5">
                    <FontAwesomeIcon icon={faUtensils} />
                  </span>
                  加工法
               </th>
               <th style={th}>合計</th>
               <th style={th}></th>
             </thead>
             <tbody>
               {props.buyCarts.map((data)=>(
                 <tr>
                   <td className="text-dark text-center font-weight-bold">{data.name}</td>
                   <td className="text-dark text-center font-weight-bold">{data.price}</td>
                   <td className="text-dark text-center font-weight-bold">{data.num}</td>
                   <td className="text-dark text-center font-weight-bold">{data.process}</td>
                   <td className="text-dark text-center font-weight-bold">{Number(data.price) * Number(data.num)}</td>
                   <td className="text-dark text-center font-weight-bold">
                     <Button 
                       variant="danger"
                     >
                    削除
                     </Button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </Table>
           <div className="text-center">
             <Button  
               variant="primary"
               className="btn-lg"
               onClick={sendServer}
             >
             <span><FontAwesomeIcon icon={faCashRegister} /></span>
             注文確定
             </Button>
           </div>
         </Form>
        </Col>
      </Row>
   </>
  )
}
export default withRouter(connect((state)=>state)(Confirm))
