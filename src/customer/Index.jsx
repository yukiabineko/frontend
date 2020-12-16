import { useEffect, useState } from 'react';
import { Image, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../App.css'
import { connect } from 'react-redux';
import image from '../images/fishs2.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCashRegister } from "@fortawesome/free-solid-svg-icons";

const rightAreaTable={
  height: '200px',
  overflow: 'scroll'
}

const nameTitle={
  background: '#136FFF',
  padding: '5px',
  color:'white',
  border:'1px solid #f0f0f0',
  maxWidth: '100%',
  margin: '0'
}
const buycheck={
  padding: '5px 0',
  background: 'brown',
  color:'white',
  fontSize:'16px',
  textAlign: 'center',
  borderLeft:'6px solid #c0c0c0'

}
const buttonHeight={
  height:'100px'
}

 function Index(props){
  let localData = JSON.parse(localStorage.getItem('orders'))

  /*買い物カゴに入れた際の在庫の更新*/

  if(props.fixItemData){
    localData.forEach((data,i)=>{
      if(props.fixItemData.id == data.id){
        localData[i] = props.fixItemData;
      }
    })

  }
  let modalData = [];
 

  /************************ステート*************************************** */
  const[itemData, setState] = useState(
    localData ? localData : []
  )
 
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
   useEffect(()=>{
     loginUserCheck();
   })
/*******************************************買い物ボタン*********************************************************************** */
  const buyItem = (item)=>{
    props.sendCustomerData(item);
    props.history.push('/customor_show');
  }
/********************************************買い物カゴ合計金額*************************************************************************************** */
 const itemTotalMoney = ()=>{
   let total = 0;
   props.buyCarts.map((data)=>{
     total += Number(data.price) * Number(data.num);
   })
   return total;
 }
 /********************************************サーバーに買い物情報送信*************************************************************************************** */
 const sendShoppingData =()=>{
   props.history.push('/customer_confirm');
 }
  return(
    <div>
       <img src={image} alt="画像" className="costomer-imag"/>
       <div className="customor-main">
    　　　<h1 className="customor-main-title">本日入荷商品紹介</h1>
         <article>
           <section class="gallery">
             <h2 className="customer-article-title">商品紹介</h2>
             {itemData.length > 0 ? 
               <ul>
                 {itemData.map((item)=>(
                   <li>
                       <Image src={`http://yukiabineko.sakura.ne.jp/react/${item.name}.jpg`} alt="表示できません" roundedCircle /><br/>
                       <ul>
                         <li style={nameTitle}>{`商品名${item.name}`}</li>
                         <li style={nameTitle}>
                           価格&emsp;
                           <span className="text-warning font-weight-bold">{item.price}</span>円
                         </li>
                         <li style={nameTitle} className="bg-white">
                           {Number(item.stock) > 0? 
                              <button 
                                className="btn btn-success btn-block"
                                onClick={()=>buyItem(item)}
                              >
                               <FontAwesomeIcon icon={faCartPlus}  />買い物する
                              </button>
                             : 
                             <span className="text-danger font-weight-bold">売り切れ</span>
                           }
                          
                         </li>
                       </ul>
                     
                   </li>
                 ))}
               </ul>
                :
               ''
              }
            
           </section>

         </article>
         <div className="customor-right">
           <h5 style={buycheck}>買い物確認</h5>
            <p className="font-weight-bold text-center">{props.userData[0].name}さん</p>
            <p className="font-weight-bold bg-light p-2">買い物点数&emsp;<span className="text-danger">{props.buyCarts.length}</span>件</p>
            
            {props.buyCarts.length >0 ? 
             <div style={ rightAreaTable}>
              <Table bordered>
                <thead className="bg-primary text-white">
                  <th>商品名</th>
                  <th>個数</th>
                  
                </thead>
                <tbody>
                  {props.buyCarts.map((data)=>(
                    <tr>
                      <td className="align-middle">{data.name}</td>
                      <td className="text-center">
                        {data.num}<br/>
                        <button className="btn btn-danger">削除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              </div>
              : 
              ''
            }
          
            <p className="m-0">合計金額</p>
            <p className="font-weight-bold bg-dark p-2 text-white text-right">{itemTotalMoney()}</p>
            <button 
              className="btn btn-primary btn-block font-weight-bold" 
              onClick={sendShoppingData}
              style={buttonHeight}>
              <FontAwesomeIcon icon={faCashRegister} />
                &nbsp;買い物確定
            </button>
         </div>
      </div>
    </div>
    
     
  )
}
export default withRouter(connect((state)=>state)(Index))