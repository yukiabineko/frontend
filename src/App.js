import React, { useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faUser, faDoorOpen, faShoppingCart, faUsers, faFish, faClipboard, faStore, faChartBar, faClipboardCheck, faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import Index from './users/Index';
import Login from './Login';
import userNew from './users/New'
import Edit from './users/Edit'
import UserShow from './users/Show';
import EmpShow from './users/EmpShow';
import PhoneEmpShow from './users/PhoneEmpShow';
import UserOrder from './users/Order';
import ItemIndex from './items/Index';
import ItemNew from './items/New';
import ItemEdit from './items/Edit';
import Process from './items/Process';
import OrderIndex from './orders/Index';
import OrderNew from './orders/New';
import OrderEdit from './orders/Edit';
import CustomorIndex from './customer/Index'
import CustomorShow from './customer/Show'
import CustomorPhoneShow  from './customer/PhoneShow'
import Confirm from './customer/confirm';
import PhoneConfirm from './customer/PhoneConfirm';
import CustomerItemInfo from './customer/Info';
import CustomerItemPhoneInfo from './customer/PhneInfo';
import Movie from './customer/Movie';
import ShoppingIndex from './shopping/Index';
import ShoppingShow from './shopping/Show';
import Reservation from './shopping/Reservation';
import SalesIndex from './sale/Index';
import { connect } from "react-redux";
import { logoutAction, cartEmpty } from './store/Store';
import {  todayOrderExisting } from './shopping/settiing';
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

 function App(props){
  const[state, setState] = useState({
    editId: 0,
    deleteId: 0,
    itemEditId:0,
    processId: 0,
    OrderEditId: 0,
    customerItem: null,
    shoppingShow: null,
    cartItem: null
  })
  const userlogout = ()=>{
    let action = logoutAction();
    props.dispatch(action);

    let cartAction = cartEmpty(); /*買い物かごリセット*/
    props.dispatch(cartAction);
    /*買い物かご操作のリセット(ストレージ)*/

    axios
    .get('https://uematsu-backend.herokuapp.com/orders')
    .then((res)=>{
       localStorage.setItem('orders', JSON.stringify(res.data));
       
    })
    .catch((error)=>{
       console.log(error);
    })
    setState({
     data: JSON.parse(localStorage.getItem('orders'))
   })
    
  }

  const getEditId = (id)=>{

    setState({
      editId: id,
      deleteId: state.deleteId,
      itemEditId: state.itemEditId,
      processId: state.processId,
      OrderEditId: state.OrderEditId,
      customerItem: state.customerItem,
      shoppingShow: state.shoppingShow,
      cartItem: state.cartItem
    })
  }
  const getItemEditId = (item)=>{

    setState({
      editId: state.editId,
      deleteId: state.deleteId,
      itemEditId: item,
      processId: state.processId,
      OrderEditId: state.OrderEdit,
      customerItem: state.customerItem,
      shoppingShow: state.shoppingShow,
      cartItem: state.cartItem
    })
  }
  const getProcessId = (item)=>{

    setState({
      editId: state.editId,
      deleteId: state.deleteId,
      itemEditId: state.itemEditId,
      processId: item,
      OrderEditId: state.OrderEdit,
      customerItem: state.customerItem,
      shoppingShow: state.shoppingShow,
      cartItem: state.cartItem
    })
  }
  const getOrderEditId = (id)=>{

    setState({
      editId: state.editId,
      deleteId: state.deleteId,
      itemEditId: state.itemEditId,
      processId: state.processId,
      OrderEditId: id,
      customerItem: state.customerItem,
      shoppingShow: state.shoppingShow,
      cartItem: state.cartItem
    })
  }
  /*お客様買うボタンより*/
  const customerItem = (item)=>{
    setState({
      editId: state.editId,
      deleteId: state.deleteId,
      itemEditId: state.itemEditId,
      processId: state.processId,
      OrderEditId: state.OrderEditId,
      customerItem: item,
      shoppingShow: state.shoppingShow,
      cartItem: state.cartItem
    })
  }
  /*ストック数およびお買い物リストの更新*/
  const changeItem =(item)=>{
    setState({
      editId: state.editId,
      deleteId: state.deleteId,
      itemEditId: state.itemEditId,
      processId: state.processId,
      OrderEditId: state.OrderEditId,
      customerItem: item,
      shoppingShow: state.shoppingShow,
      cartItem: state.cartItem
    })
  }
  /*個別の注文状況の表示用アイテム*/
  const shoppingData = (data)=>{
    setState({
      editId: state.editId,
      deleteId: state.deleteId,
      itemEditId: state.itemEditId,
      processId: state.processId,
      OrderEditId: state.OrderEditId,
      customerItem: state.customerItem,
      shoppingShow: data,
      cartItem: state.cartItem
    })
  }
  /*買い物カゴ送信処理*/

  const cartItem = (data)=>{
    setState({
      editId: state.editId,
      deleteId: state.deleteId,
      itemEditId: state.itemEditId,
      processId: state.processId,
      OrderEditId: state.OrderEditId,
      customerItem: state.customerItem,
      shoppingShow: state.shoppingShow,
      cartItem: data
    })
  }
  
  return(
    <BrowserRouter>
    <div className='fixed-top'> 
    <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
      <span className="navbar-brand text-white"><FontAwesomeIcon icon={faUtensils} />&nbsp;
            加工依頼アプリ</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
        
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {props.userData.length >0?
            props.userData[0].admin === true? 
             /*従業員サイド */
            <>
              <li class="nav-item pt-3 pb-3 active">
                <span className="font-weight-bold text-warning"><FontAwesomeIcon icon={faUser} />{props.userData[0].name}さん</span>
              </li>
              <li className="nav-item pt-3 pb-3">
                <Link to="/customor" className="text-light p-3">
                  <FontAwesomeIcon icon={faShoppingCart} className="text-slight" />
                   お買い物
                </Link>
             </li>
              <li className="nav-item pt-3 pb-3">
                <Link to="/" className="text-light p-3">
                  <FontAwesomeIcon icon={faUsers} className="text-slight" />
                    お客様一覧
                </Link>
              </li>
              <li className="nav-item pt-3 pb-3">
               <Link to="/items" className="text-light p-3">
                  <FontAwesomeIcon icon={faFish} className="text-slight" />
                    商品一覧
               </Link>
              </li>
              <li className="nav-item pt-3 pb-3">
               <Link to="/orders" className="text-light p-3">
                <FontAwesomeIcon icon={faStore} className="text-slight" />
                  店頭商品一覧
               </Link>
             </li>
             <li className="nav-item pt-3 pb-3">
               <Link to="/shoppings" className="text-light p-3">
                <FontAwesomeIcon icon={faClipboard} className="text-slight" />
                  本日注文状況
               </Link>
             </li>
             <li className="nav-item pt-3 pb-3">
               <Link to="/sales" className="text-light p-3">
                <FontAwesomeIcon icon={faChartBar} className="text-slight" />
                  売上速報
               </Link>
             </li>
             {/*明日のオーダーがあれば表示*/ }

             { todayOrderExisting(JSON.parse(localStorage.getItem('shoppings'))).length >0? 
               <li className="nav-item pt-3 pb-3">
                 <Link to="/reservation" className="text-light p-3">
                  <FontAwesomeIcon icon={faClipboardCheck} className="text-slight" /> 
                    明日の予約状況
                 </Link>
               </li> 
              : 
              ''
              }
          
            </>
            /*お客様サイド */
              : 
              <>
                <li className="nav-item pt-3 pb-3">
                  <Link to="/customor" className="text-light p-3">
                    <FontAwesomeIcon icon={faShoppingCart} />
                     お買い物
                  </Link>
                </li>
                <li className="nav-item pt-3 pb-3">
                  <Link to="/users/show" className="text-light p-3">
                    <FontAwesomeIcon icon={faUser} className="text-light"/>
                      お客様ページ
                  </Link>
                </li>
                <li className="nav-item pt-3 pb-3">
                  <Link to="/users_order" className="text-light p-3">
                   <FontAwesomeIcon icon={faClipboardCheck} className="text-light"/>
                     注文確認
                  </Link>
                </li>

                <li className="nav-item pt-3 pb-3">
                  <Link to="/movie" className="text-light p-3">
                   <FontAwesomeIcon icon={faYoutube} className="text-light"/>
                     動画検索
                  </Link>
                </li>
              </>
            : 
            <></>
          }
        </ul>

        <ul className="navbar-nav">
        {props.userData.length >0? 
           <li className="nav-item pt-3 pb-3">
             <button 
              className="logout"
              onClick={userlogout}
              data-testid="logintrue"
          
            >
            <FontAwesomeIcon icon={faDoorOpen} />
            ログアウト</button>
           </li>
          : 
          <li className="nav-item pt-3 pb-3"><Link to="/login" className="text-light p-3" data-testid="loginfalse">
            <FontAwesomeIcon icon={faDoorClosed} />
              ログイン
          </Link></li>
          }
        </ul>
      </div>
      
    </nav>
     
      </div><br/><br/>
      <Route exact path="/" render={()=>
        <Index 
          editIdget={(id)=>getEditId(id)} 
        />} /> 
      <Route path="/login" render={()=><Login />} />
      <Route path="/users/new" component={userNew} />
      <Route path="/users/edit" render={ () => <Edit id={state.editId} />} />
      <Route path="/users/show" component={UserShow} />
      <Route path="/users_empshow"  render={()=><EmpShow />} />
      <Route path="/users_phone_empshow"  render={()=><PhoneEmpShow />} />

      <Route path="/users_order" component={UserOrder} />
      <Route path="/items"  render={()=><ItemIndex 
        itemEditIdget={(item)=>getItemEditId(item)} 
        processIdget={(item)=>getProcessId(item)}
        />} />
      <Route path="/items_new" component={ItemNew} />
      <Route path="/items_process" render={ () => <Process item={state.processId} />}  />
      <Route path="/items_edit" render={ () => <ItemEdit item={state.itemEditId} />}  />
      <Route path="/orders" render={()=><OrderIndex orderEditIdget={(id)=>getOrderEditId(id)} />} />
      <Route path="/orders_new" component={OrderNew} />
      <Route path="/orders_edit" render={ () => <OrderEdit id={state.OrderEditId} />} />
      <Route path="/customor"  
        render={()=>
        <CustomorIndex 
          sendCustomerData={(item)=>customerItem(item)} 
          sendCartItemToConfirm={(item)=>cartItem(item)}
          fixItemData={state.customerItem}
        />} />
      <Route path="/customor_show" 
        render={()=>
          <CustomorShow 
            itemData={state.customerItem}
            changeItemData={(item)=>changeItem(item)}
      />} />
      <Route path="/phone_customor_show" 
        render={()=>
          <CustomorPhoneShow 
            itemData={state.customerItem}
            changeItemData={(item)=>changeItem(item)}
      />} />
     <Route path="/customer_confirm"
      render={()=>
        <Confirm
          orderData={state.cartItem}
      />} />

     <Route path="/phone_customer_confirm"
        render={()=>
          <PhoneConfirm
              orderData={state.cartItem}
          />} />
       <Route path="/customer_item_info" component={CustomerItemInfo} />
       <Route path="/customer_item_phone_info" component={CustomerItemPhoneInfo} />
       <Route path="/movie" component={Movie} />
        
     <Route path="/shoppings" 
      render={()=>
        <ShoppingIndex 
          sendShoppingData={(data)=>shoppingData(data)}
        />} />
     <Route path="/shoppings_show" 
      render={()=>
        <ShoppingShow 
          show={state.shoppingShow}
        />} />
       <Route path="/reservation" 
        render={()=>
          <Reservation
            
          />} />
      <Route path="/sales" component={SalesIndex} />
     
    </BrowserRouter>
  )
}
export default connect((state)=>state)(App)



/*
componentDidMount() {
    const fetchInit = {
      method: "GET",
      headers: { "content-type": "application/json" }
    };

    fetch(new URL(process.env.REACT_APP_SERVER_URL), fetchInit)
      .then(response => response.json())
      .then(response => this.setState(response));
  }
*/