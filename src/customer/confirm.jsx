import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios'
import { cartEmpty, cartUpdate, ordersStockChange } from '../store/Store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faFish, faYenSign, faCalculator, faUtensils, faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { cartDeleteCart, sendLoginData, ordersSend, searchSend} from '../store/Store';
import Empty from './NoData';
import { localstorageChange, cartValidate } from './setting';


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
 
/*カートの商品の数量のみ配列化 */

const cartNum = ()=>{
  let array = [];
  props.buyCarts.forEach((data) => {
    array.push(Number(data.num));
  });
  return array;
}
 
/***************************** ステート管理 ************************************************************** */
const[state, setState] = useState(props.orderData); /* 全体の在庫*/
const[num, setNumber] = useState(cartNum());  /* 現在の注文数ステータス */




/***************************** セレクトの数量表示 ************************************************************** */
const selectNumber =(number)=>{
  let array = [];
  for(let i=0; i<= Number(number); i++){
    array.push(i);
  }
  return array;
}
/***********************サーバー送信注文確定***************************************************************** */
const sendServer = ()=>{
    let result = window.confirm('注文を確定してよろしいですか？');
    if(result && cartValidate(props.buyCarts)){  /*カートの受取時間もチェック(現時点空の場合のみ)*/
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
   obj['data'] = sendData;

   /* rails送信　*/
   axios.post('https://uematsu-backend.herokuapp.com/shoppings', obj)
      .then(function (response) {
        /*railsからメッセージ*/

        alert(response.data.message); 
        const id_data = {id: props.userData[0].id, email: props.userkey.email, password: props.userkey.password }
        axios.post(`https://uematsu-backend.herokuapp.com/users/show`, id_data).then(function(response){
           let action = sendLoginData (response.data);
           props.dispatch(action);
         

        }).catch(function(err){
         console.log(err);
        });
        /*ページネーション用のステート変更*/
        let page_data = {
          user_id: props.userData[0].id,
          num: 1
        }
        axios.post('https://uematsu-backend.herokuapp.com/history/search', page_data)
        .then(function (response) {
          let action = searchSend(response.data);
          props.dispatch(action);
        })
        .catch(function(){
        });


      })
      .catch(function(){
        alert('error');
      }) 
    
    props.history.push('/customor');  /*ユーザーページへ移動*/
    props.dispatch(cartEmpty());  /*買い物カゴリセット*/

    }
    else if(!cartValidate(props.buyCarts)){
      alert('時間を入力してください。');
    }
    
  }
  /**********************************商品アイテム削除************************************************************************************************ */
  const deleteItem = (index, name, n)=>{
    let action = cartDeleteCart(index);
    props.dispatch(action);
    
    let action2 = ordersStockChange(name, n);
    props.dispatch(action2);


    /*選択数ステートも更新*/
    let number = num.slice();
    number.splice(index, 1);
    

    setNumber(number);
    
    

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
/******************************セレクト切り替え********************************************************** */
const doSelect = (e)=>{
  let currentNumber = Number(num[Number(e.target.name)]);
  let changeNumber = Number(e.target.value);
  let calcNumber = changeNumber - currentNumber;
  let cartItemName = props.buyCarts[Number(e.target.name)].name;
  let stateData = state.slice();
  

  stateData.forEach((data,i)=>{
    let dataNumber = Number(data.stock);
    
    if(data.name === cartItemName){   /*セレクトの商品と全商品検証*/
      /*増やしたか？　減らしたか? */
      
      if(calcNumber > 0){
         stateData[i].stock = dataNumber - calcNumber;  /*数量増やした場合全体在庫減る*/
          /*大元のストレージも変更*/
          let propOrders = localstorageChange(cartItemName, stateData[i].stock, props.orderItem);
          let changePropDatas = propOrders;
        
          let action = ordersSend(changePropDatas);
          props.dispatch(action);
         
      }
      else if(calcNumber <0){
        stateData[i].stock = dataNumber + (currentNumber - changeNumber); /*数量増やした場合全体在庫増えるまたマイナスになるので計算反転*/
         /*大元のストレージも変更*/
        let propOrders = localstorageChange(cartItemName, stateData[i].stock, props.orderItem);
        let changePropDatas = propOrders;
      
        let action = ordersSend(changePropDatas);
        props.dispatch(action);
      }
    }
  });
  /*redux buycart変更*/
  let buycart = props.buyCarts.slice();

  let thiscartData = {
    name: cartItemName,
    num: changeNumber,
    price: props.buyCarts[Number(e.target.name)].price,
    process:props.buyCarts[Number(e.target.name)].process,
    time: props.buyCarts[Number(e.target.name)].time
  }
  /*リスト(買い物カゴ)の内変更かけたものを入れ替え*/

  buycart[Number(e.target.name)] = thiscartData;
  /*ストア送信(update)*/

  let delAction =  cartUpdate(buycart);
  props.dispatch(delAction);
  

  /*在庫ステート変更*/

  setState(stateData);
  let numArray = num.slice();
  numArray[Number(e.target.name)] = changeNumber;
  setNumber(numArray);
}
/************************時間変更************************************************* */
  const timesChange =(e)=>{
    let index = Number(e.target.name);
    let carts = props.buyCarts.slice();
    carts[index].time = e.target.value;
    let action = cartUpdate(carts);
    props.dispatch(action);
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
         
          {props.buyCarts.length >0? 
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
               <th style={th}>
                 <span className="text-primary mr-2 h5">
                    <FontAwesomeIcon icon={faUtensils} />
                  </span>
                  受け取り時間
               </th>
               <th style={th}>合計</th>
               <th style={th}></th>
             </thead>
             <tbody>
               {props.buyCarts.map((data,index)=>(
                 <tr>
                   <td className="text-dark text-center font-weight-bold align-middle">{data.name}</td>
                   <td className="text-dark text-center font-weight-bold align-middle">{data.price}</td>
                   <td className="text-dark text-center font-weight-bold">
                      <label>{"現在" + num[index]}</label>
                      <Form.Control as="select" size="sm" custom value={num[index]} onChange={(index)=>doSelect(index)} name={index} >
                       {state.map((order)=>(
                         order.name === data.name? 
                         /*在庫にすでに選択されている数量足した数*/
                         
                           selectNumber(Number(order.stock) + Number(num[index])).map((value)=>(
                             <option key={value}>{value}</option>
                           ))
                           : 
                           ''
                       ))}
                      </Form.Control>
                   </td>
                   <td className="text-dark text-center font-weight-bold align-middle">{data.process}</td>
                   <td className="text-dark text-center font-weight-bold align-middle">
                    <input 
                          name={index}
                          type="time" 
                          value={data.time}  
                          className="form-control"
                          onChange={timesChange}
                      />
                   </td>
                   <td className="text-dark text-center font-weight-bold align-middle">{Number(data.price) * Number(num[index])}</td>
                   <td className="text-dark text-center font-weight-bold">
                     <Button 
                       variant="danger"
                       onClick={()=>deleteItem(index, data.name, num[index])}
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
             <span><FontAwesomeIcon icon={faCashRegister} /></span>
             注文確定
             </Button>
           </div>
         </Form> 
           : 
          <Empty />
         }
        </Col>
      </Row>
   </>
  )
}
export default withRouter(connect((state)=>state)(Confirm))
