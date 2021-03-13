import { useEffect, useState } from 'react';
import { Image, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import image from '../images/fishs2.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { HeaderImagePhone,ArticlePhone, UlPhone, LlPhone, phoneBuyCartMain } from './phoneStyle';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { youtubeSeearchSend } from '../store/Store';

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
  margin: '0',
  width: '100%'
}
const buycheck={
  padding: '5px 0 25px 0',
  background: 'brown',
  color:'white',
  fontSize:'16px',
  textAlign: 'center',
  borderLeft:'6px solid #c0c0c0'

}
const buttonHeight={
  height:'100px'
}

 function PhoneIndex(props){
  
  /*買い物カゴに入れた際の在庫の更新*/

  if(props.fixItemData){
    props.orderItem.forEach((data,i)=>{
      if(props.fixItemData.id === data.id){
        props.orderItem[i] = props.fixItemData;
        /*localStorage.setItem('orders', JSON.stringify(localData));*/
      }
    })

  }

  /***********************ステート*************************************** */
  const[ itemData ] = useState(
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
    props.history.push('/phone_customor_show');
  }

/********************************************買い物カゴ合計金額*************************************************************************************** */
 const itemTotalMoney = ()=>{
   let total = 0;
   props.buyCarts.forEach((data)=>{
     total += Number(data.price) * Number(data.num);
   })
   return total;
 }
 /********************************************に買い物確認情報送信*************************************************************************************** */
 const sendShoppingData =()=>{
   props.sendCartItemToConfirm(itemData);
   props.history.push('/phone_customer_confirm');
 }
 /********************************************商品説明ページアクセス*************************************************************************************** */
 const showItemInfo =(item)=>{
  let action = youtubeSeearchSend(item);
  props.dispatch(action);

  props.history.push('/customer_item_phone_info')
}
  return(
    <div>
      <img src={image} alt="画像" style={HeaderImagePhone} />
       <div style={HeaderImagePhone} className="text-center">
    　　　<h4>本日入荷商品紹介</h4>
         <article style={ArticlePhone}>
           <section>
             {itemData.length>0? <h2 className="customer-article-title">商品紹介</h2> : <div className="bg-secondary text-center text-white p-5 font-weight-bold">ただいま入荷商品がありません。</div>}
             {itemData.length > 0 ? 
               <ul style={UlPhone}>
                 {itemData.map((item)=>(
                   <li style={LlPhone}>
                       <Image style={HeaderImagePhone} src={`http://yukiabineko.sakura.ne.jp/react/${item.name}.jpg`} alt="表示できません" roundedCircle /><br/>
                       <ul style={UlPhone}>
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
                             <div>
                                <button 
                                  className="btn btn-success btn-block"
                                  onClick={()=>buyItem(item)}
                                >
                                  <FontAwesomeIcon icon={faCartPlus}  />買い物する
                                </button>

                                <button 
                                  className="btn btn-danger btn-block"
                                  onClick={()=>showItemInfo(item)}
                                >
                                  <FontAwesomeIcon icon={faYoutube}  />商品説明
                                </button>
                             </div>
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
            <div style={phoneBuyCartMain}>
              <h5 style={buycheck}>管理者表示</h5>
              <div className="p-3 bg-lignt font-weight-bold">管理者のため表示されません</div>
            </div>
            : 
            <div style={phoneBuyCartMain}>
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
export default withRouter(connect((state)=>state)(PhoneIndex))