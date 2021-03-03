import { useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
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
  const[shopingData] = useState(
    localData ?localData : []
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
   useState(shoppingsCall()); */
  
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
    <div className>
      <div className="text-center mt-5 mb-4">
        <h2 data-testid="itemstitle" className="font-weight-bold text-info">注文確認表</h2>
      </div>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="p-5 bg-light shadow">
          {(shopingData.length >0 && todayOdrersChecker(shopingData) > 0)? 
            <Table bordered striped>
              <thead>
                <th className="bg-primary text-white text-center">日付</th>
                <th className="bg-primary text-white text-center">受け渡し時間</th>
                <th className="bg-primary text-white text-center">商品名</th>
                <th className="bg-primary text-white text-center">お客様名</th>
                <th className="bg-primary text-white text-center">価格</th>
                <th className="bg-primary text-white text-center">個数</th>
                <th className="bg-primary text-white text-center">加工法</th>
                <th className="bg-primary text-white text-center">合計金額{todayOdrersChecker(shopingData).length}</th>
              </thead>
              <tbody>
                {shopingData.map((data,i)=>(
                  /* 当日のみ表示 */

                  viewDataBranch(data.shopping_date) === 1? 
                  <tr>
                  <td className="font-weight-bold text-center align-middle">{daySetting(data.shopping_date)}</td>
                  <td className="font-weight-bold text-danger align-middle text-center">{timeSetting(data.receiving_time)}</td>
                  <td className="font-weight-bold text-center align-center">
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
                  <td className="font-weight-bold text-center align-middle">{`${data.user_name}様`}</td>
                  <td className="font-weight-bold text-center text-danger align-middle">{data.price}</td>
                  <td className="font-weight-bold text-center align-middle">{data.num}</td>
                  <td className="font-weight-bold text-center align-middle">{data.process}</td>
                  <td className="font-weight-bold text-center text-danger align-middle">
                    { Number(data.price) * Number(data.num) }
                  </td>
                </tr>
                   : 
                   ''
                ))}
              </tbody>
            </Table>
            : 
            <div className="bg-secondary text-center text-white font-weight-bold p-3">データがありません。</div>
          }
          
        </Col>
      </Row>
    </div>  
  )
}
export default withRouter(connect((state)=>state)(PcIndex))