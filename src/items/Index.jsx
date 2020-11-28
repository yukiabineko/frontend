import { useEffect, useState } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';



 function Index(props){
  let localData = JSON.parse(localStorage.getItem('items'))
  let itemData = localData ? localData : [];
  /*************APIによるitem一覧**********************************/
  async function itemsCall(){
    await axios
      .get('https://uematsu-backend.herokuapp.com/items')
      .then((res)=>{
         localStorage.removeItem('items');
         itemData = res.data;
         localStorage.setItem('items', JSON.stringify(res.data));
      })
      .catch((error)=>{
         console.log(error);
      })
     
   }
   useState(itemsCall());
   useEffect(()=>{
     itemsCall();
   })
  
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
   useEffect(()=>{
     loginUserCheck();
   })
   const newPage = ()=>{
    props.history.push('/items_new')
   }
   /****************************編集**************************************** */
   const editPage = (id)=>{
    props.itemEditIdget(id);
    props.history.push("/items_edit");
  } 
  
  return(
    <div className>
      <div className="text-center mt-5 mb-4">
        <h2 data-testid="usertitle">商品一覧</h2>
      </div>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="p-5 bg-light shadow">
          <Button 
            variant="primary"
            onClick={newPage}
          >新規商品登録</Button>
          {itemData.length > 0 ?
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center align-middle bg-dark text-white">商品名</th>
                  <th className="text-center align-middle bg-dark text-white">価格</th>
                  <th className="text-center align-middle bg-dark text-white">カテゴリー</th>
                  <th className="text-center align-middle bg-dark text-white"></th>
                </tr>
              </thead>
              <tbody>
                {itemData.map((item)=>(
                  <tr>
                    <td>{item.name}</td>
                    <td className="text-right text-danger">{item.price}</td>
                    <td>{item.category}</td>
                    <td>
                    <Button 
                        variant="primary"
                        onClick={(i)=>editPage(item.id)}
                        className="ml-3"
                      >編集</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
               
            </Table>
            :
            <div className="text-center bg-info text-white font-weight-bold p-5 mt-3">
              データを表示できません。
            </div>
            }
        </Col>
      </Row>
    </div>
  )
}
export default withRouter(connect((state)=>state)(Index))