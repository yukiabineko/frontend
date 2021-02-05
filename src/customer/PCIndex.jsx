import { useEffect, useState } from 'react';
import { Image, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../App.css'
import { connect } from 'react-redux';
import image from '../images/fishs2.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { cartDeleteCart } from '../store/Store';


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

 function PcIndex(props){
  let localData = null;

  /*買い物カゴに入れた際の在庫の更新*/

  if(props.fixItemData){
    props.orderItem.forEach((data,i)=>{
      if(props.fixItemData.id == data.id){
        props.orderItem[i] = props.fixItemData;
        /*localStorage.setItem('orders', JSON.stringify(localData));*/
      }
    })

  }

  /***********************ステート*************************************** */
  const[itemData, setState] = useState(
    props.orderItem? props.orderItem : []
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
/*******************************************買い物カゴアイテム削除*********************************************************************** */
const deleteCartItem = (index)=>{
  let action = cartDeleteCart(index);
  props.dispatch(action);
}
/********************************************買い物カゴ合計金額*************************************************************************************** */
 const itemTotalMoney = ()=>{
   let total = 0;
   props.buyCarts.map((data)=>{
     total += Number(data.price) * Number(data.num);
   })
   return total;
 }
 /********************************************に買い物確認情報送信*************************************************************************************** */
 const sendShoppingData =()=>{
   props.sendCartItemToConfirm(itemData);
   props.history.push('/customer_confirm');
 }
  return(
    <div>
      <img src={image} alt="画像" className="costomer-imag"/>
       <div className="customor-main">
    　　　<h1 className="customor-main-title">本日入荷商品紹介</h1>
         <article>
           <section class="gallery">
             {itemData.length>0? <h2 className="customer-article-title">商品紹介</h2> : <div className="bg-secondary text-center text-white p-5 font-weight-bold">ただいま入荷商品がありません。</div>}
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
                         <li style={nameTitle}>
                           在庫&emsp;
                           <span className="text-warning font-weight-bold">{item.stock}</span>(尾/個)
                         </li>
                         <li style={nameTitle} className="bg-white">
                           {props.userData.length>0 && props.userData[0].admin? 
                             '' 
                             : 
                             Number(item.stock) > 0? 
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

         {props.userData.length>0 && props.userData[0].admin? 
            <div className="customor-right">
              <h5 style={buycheck}>管理者表示</h5>
              <div className="p-3 bg-lignt font-weight-bold">管理者のため表示されません</div>
            </div>
            : 
            <div className="customor-right">
            <h5 style={buycheck}>買い物確認</h5>
             <p className="font-weight-bold text-center">{props.userData.length>0? props.userData[0].name : ''}さん</p>
             <p className="font-weight-bold bg-light p-2">買い物点数&emsp;<span className="text-danger">{props.buyCarts.length}</span>件</p>
             
             {props.buyCarts.length >0 ? 
              <div style={ rightAreaTable}>
               <Table bordered>
                 <thead className="bg-primary text-white">
                   <th>商品名</th>
                   <th>個数</th>
                   
                 </thead>
                 <tbody>
                   {props.buyCarts.map((data,index)=>(
                     <tr>
                       <td className="align-middle text-center">
                         {data.name}<br/>
                         ({data.process})
                      </td>
                       <td className="text-center">
                         {data.num}<br/>
                         {/*<button
                          className="btn btn-danger"
                          onClick={()=>deleteCartItem(index)}
                         >削除</button>*/}
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
             {props.buyCarts.length >0? 
               <button 
                 className="btn btn-primary btn-block font-weight-bold" 
                 onClick={sendShoppingData}
                 style={buttonHeight}>
                 <FontAwesomeIcon icon={faCashRegister} />
                   &nbsp;買い物確認
              </button>
               : 
               ''
             }
          </div>
          }
         
      </div>

    </div>
  )
}
export default withRouter(connect((state)=>state)(PcIndex))