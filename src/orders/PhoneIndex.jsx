import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ordersSend } from '../store/Store';

const buttonWidth ={
  width: '48%',
  margin: '0',
  marginRight:'2%'
}


 function Index(props){
  const[state,setState] = useState({
    data: localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : []
  })
  /*************APIによるuser一覧**********************************/
   /*async function orderCall(){
     
     await axios
       .get('https://uematsu-backend.herokuapp.com/orders')
       .then((res)=>{
          localStorage.setItem('orders', JSON.stringify(res.data));
          let action = ordersSend(res.data);
          props.dispatch(action);
          
       })
       .catch((error)=>{
          console.log(error);
       })
       setState({
        data: JSON.parse(localStorage.getItem('orders'))
      })
  }
    useState(orderCall());*/
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
   useState(loginUserCheck());

  /****************************編集**************************************** */
   const editPage = (id)=>{
     props.orderEditIdget(id);
     props.history.push("/orders_edit");
   } 


   /****************************削除*********************************************** */
   function deleteOrder(i){
    if(window.confirm('削除してよろしいですか？')){
      axios
       .delete(`https://uematsu-backend.herokuapp.com/orders/${i}`)
       .then((response)=>{
          /*削除後更新*/
        axios
        .get('https://uematsu-backend.herokuapp.com/orders')
        .then((res)=>{
            localStorage.setItem('orders', JSON.stringify(res.data));
            let action = ordersSend(res.data);
            props.dispatch(action);
            setState({
              data: localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : []
            })
            
        })
        .catch((error)=>{
            console.log(error);
        })
         alert(response.data.message); 
       })
       .catch((error)=>{
          console.log(error);
       })
    
    }
   }
   /****************************商品全リセット*********************************************** */
   function ResetOrder(){
    if(window.confirm('リセットしてよろしいですか？')){
      axios
       .get('https://uematsu-backend.herokuapp.com/orders/deleteAll')
       .then((response)=>{
        localStorage.removeItem('orders');
           /*削除後更新*/
           axios
           .get('https://uematsu-backend.herokuapp.com/orders')
           .then((res)=>{
               localStorage.setItem('orders', JSON.stringify(res.data));
               let action = ordersSend(res.data);
               props.dispatch(action);
               setState({
                 data: localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : []
               })
               
           })
           .catch((error)=>{
               console.log(error);
           })
         alert(response.data.message); 
       })
       .catch((error)=>{
          console.log(error);
       })
    }
   }
  return(
    <div className="image">
      <div className="text-center mt-5 mb-4">
        <h2 data-testid="usertitle">店頭商品一覧</h2>
      </div>
      <div className="p-2 bg-white"></div>
      <div className="w-100 bg-white">
          <Button 
            variant="primary"
            onClick={()=>props.history.push('orders_new')}
            className="mr-2"
          >店頭商品追加</Button>
           {/*状況によりリセットボタン*/}

          {state.data.length >0? 
            <Button 
              variant="danger"
              onClick={ResetOrder}
             >リセット</Button>
             : 
             ''
            }
          {/*テーブル*/}

          {state.data.length > 0 ?

            <Table striped bordered hover mt-3>
              <tbody>
                {state.data.map((value)=>(
                  <tr key={value.name}>
                     <Table bordered>
                        <tbody>
                          <tr>
                            <th className="text-center align-middle bg-dark text-white">商品名</th>
                            <td colSpan="3" className="text-center align-middle">{value.name}</td>
                          </tr>

                          <tr>
                            <th className="text-center align-middle bg-dark text-white">価格</th>
                            <td className="text-center align-middle">{value.price}</td>
                            <th className="text-center align-middle bg-dark text-white">在庫</th>
                            <td className="text-center align-middle">{value.stock}</td>
                            
                          </tr>
                          <tr>
                            <th className="text-center align-middle bg-dark text-white">合計金額</th>
                            <td colSpan="3" className="text-center align-middle">{Number(value.price) * Number(value.stock)}</td>
                          </tr>

                          <tr>
                            <td colSpan="4">
                              <Button 
                                variant="primary"
                                onClick={(i)=>editPage(value.id)}
                                style={buttonWidth}
                              >編集</Button>

                              <Button 
                                variant="danger"
                                onClick={(i)=>deleteOrder(value.id)}
                                style={buttonWidth}
                              >削除</Button>
                            </td>
                          </tr>
                        </tbody>
                     </Table>
                  </tr>
                ))}
              </tbody>
            </Table>
            :
            <div className="bg-secondary p-5 text-center text-white font-weight-bold mt-1">データなし</div>
            }
      </div>
    </div>
  )
}
export default withRouter(connect((state)=>state)(Index))