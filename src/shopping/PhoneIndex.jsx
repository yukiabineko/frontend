import { useState } from 'react';
import { Row, Col, Table, Button,Modal, Image } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { viewDataBranch, todayOdrersChecker } from "./settiing";
import { daySetting } from '../users/setting';
import { timeSetting } from '../setting';

 const customButton ={
   border: "none",
   borderBottom: "1px solid #0000bb",
   background: "none",
   color: "#0000bb",
   outline: 'none',
   fontWeight: 'bold'
 }

 function PcIndex(props){
  let localData = JSON.parse(localStorage.getItem('shoppings'));
  

  /************************ステート*************************************** */
  const[shopingData, setState] = useState(
    localData ? localData : []
  )
  
  /*************APIによるshopping一覧**********************************/
  /*async function shoppingsCall(){
    await axios
      .get('https://uematsu-backend.herokuapp.com/shoppings')
      .then((res)=>{
         localStorage.removeItem('shoppings');
         setState(res.data);
         localStorage.setItem('shoppings', JSON.stringify(res.data));
      })
      .catch((error)=>{
         console.log(error);
      })
     
   }
   useState(shoppingsCall());*/
  
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
    useState(loginUserCheck()); 
/***************************************ステータス分岐********************************************************************** */
  const orderStatus = (status)=>{
    switch (status) {
      case 0:
        return <div className="bg-info text-center text-white mt-3">申請中</div>;
      case 1:
        return <div className="bg-warning text-center text-white mt-3">加工済み</div>;
      case 2:
        return <div className="bg-danger text-center text-white mt-3">受け渡し済み</div>;
    default:
        break;
    }
  }
  /****************************************カスタムbutton hover*************************************************** */
  const hoverButton = (i)=>{
    document.getElementById('customButton' + i).style.background = "#BAD3FF";
  }
  /****************************************カスタムbutton out*************************************************** */
  const outButton = (i)=>{
    document.getElementById('customButton' + i).style.background = "none";
  }
  /*************************************ステータス変更/確認ページへ************************************************************************ */
  const showShoppingStatus =(data)=>{
    props.showShoppingStatus(data);
    props.history.push('/shoppings_show');
  }

  return(
    <div className="w-100">
      <div className="text-center mt-5 mb-4">
        <h2 data-testid="itemstitle" className="font-weight-bold text-info">注文確認表</h2>
      </div>
      <div className="w-100 bg-white">
          {(shopingData.length >0 && todayOdrersChecker(shopingData) > 0)? 
            <Table striped className="w-100" >
              <tbody>
                {shopingData.map((data,i)=>(
                  /* 当日のみ表示 */

                  viewDataBranch(data.shopping_date) === 1? 
                  <tr>
                    <Table bordered>
                      <tbody>
                        <tr>
                          <td colSpan="5" className="font-weight-bold text-danger bg-white text-center">受け取り時間:{timeSetting(data.receiving_time)}</td>
                        </tr>

                        <tr>
                          <th className="bg-primary text-white text-center align-middle">受け渡し日</th>
                          <td colSpan="4" className="font-weight-bold text-center align-middle">{daySetting(data.shopping_date)}</td>
                        </tr>

                        <tr>
                          <th className="bg-primary text-white text-center align-middle">商品名</th>
                          <td colSpan="4" className="font-weight-bold text-center align-center">
                            <button 
                              style={customButton} 
                              id={`customButton${i}`}
                              onMouseOver={()=>hoverButton(i)}
                              onMouseOut={()=>outButton(i)}
                              className="customButton"
                              onClick={()=>showShoppingStatus(data)}
                              >{data.name}</button>
                            
                            <br/>
                            {orderStatus(data.status)}
                          </td>
                        </tr>
                         
                        <tr>
                          <th className="bg-primary text-white text-center align-middle">お客様名</th>
                          <td colSpan="4" className="font-weight-bold text-center align-middle">{`${data.user_name}様`}</td>
                        </tr>

                        <tr>
                           <th className="bg-primary text-white text-center align-middle">価格</th>
                           <td className="font-weight-bold text-center text-danger align-middle">{data.price}</td>
                           <td className="font-weight-bold text-center text-danger align-middle">
                            ({ Number(data.price) * Number(data.num) })
                           </td>
                           <th className="bg-primary text-white text-center align-middle">個数</th>
                           <td className="font-weight-bold text-center align-middle">{data.num}</td>
                        </tr>

                        <tr>
                          <th className="bg-primary text-white text-center align-middle">加工法</th>
                          <td colSpan="4" className="font-weight-bold text-center align-middle">{data.process}</td>
                        </tr>


                      </tbody>
                    </Table>
                </tr>
                   : 
                   ''
                ))}
              </tbody>
            </Table>
            : 
            <div className="bg-secondary text-center text-white font-weight-bold p-3">データがありません。</div>
          }
          
      </div>
    </div>  
  )
}
export default withRouter(connect((state)=>state)(PcIndex))