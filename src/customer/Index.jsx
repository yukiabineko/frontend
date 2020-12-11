import { useEffect, useState } from 'react';
import { Row, Col, Table, Button,Image } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../App.css'
import { connect } from 'react-redux';
import image from '../images/fishs2.jpg';


 function Index(props){
  let localData = JSON.parse(localStorage.getItem('items'))
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
                       <Image src={`http://yukiabineko.sakura.ne.jp/react/${item.name}.jpg`} alt="表示できません" roundedCircle />
                   </li>
                 ))}
               </ul>
                :
               ''
              }
            
           </section>

         </article>
         <div className="customor-right">

         </div>
      </div>
    </div>
    
     
  )
}
export default withRouter(connect((state)=>state)(Index))