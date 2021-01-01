import React, { useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faUser } from "@fortawesome/free-solid-svg-icons";
import Index from './users/Index';
import Login from './Login';
import userNew from './users/New'
import Edit from './users/Edit'
import UserShow from './users/Show';
import ItemIndex from './items/Index';
import ItemNew from './items/New';
import ItemEdit from './items/Edit';
import Process from './items/Process';
import OrderIndex from './orders/Index';
import OrderNew from './orders/New';
import OrderEdit from './orders/Edit';
import CustomorIndex from './customer/Index'
import CustomorShow from './customer/Show'
import Confirm from './customer/confirm';
import ShoppingIndex from './shopping/Index';
import ShoppingShow from './shopping/Show';
import { connect } from "react-redux";
import { logoutAction, cartEmpty } from './store/Store';


 function App(props){
  const[state, setState] = useState({
    editId: 0,
    deleteId: 0,
    itemEditId:0,
    processId: 0,
    OrderEditId: 0,
    customerItem: null,
    shoppingShow: null
  })
  const userlogout = ()=>{
    let action = logoutAction();
    props.dispatch(action);

    let cartAction = cartEmpty();
    props.dispatch(cartAction);
    
  }
  const getEditId = (id)=>{

    setState({
      editId: id,
      deleteId: state.deleteId,
      itemEditId: state.itemEditId,
      processId: state.processId,
      OrderEditId: state.OrderEditId,
      customerItem: state.customerItem,
      shoppingShow: state.shoppingShow
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
      shoppingShow: state.shoppingShow
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
      shoppingShow: state.shoppingShow
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
      shoppingShow: state.shoppingShow
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
      shoppingShow: state.shoppingShow
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
      shoppingShow: state.shoppingShow
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
      shoppingShow: data
    })
  }
  
  return(
    <BrowserRouter>
    <div className='fixed-top'> 
    <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
      <a className="navbar-brand text-white" href="#"><FontAwesomeIcon icon={faUtensils} />&nbsp;
            加工依頼アプリ</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
        
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {props.userData.length >0?
            <li class="nav-item pt-3 pb-3 active">
             <span className="font-weight-bold text-warning"><FontAwesomeIcon icon={faUser} />{props.userData[0].name}さん</span>
            </li>
            
            : 
            ''
          }
          <li className="nav-item pt-3 pb-3">
            <Link to="/" className="text-light p-3">HOME</Link>
          </li>
          <li className="nav-item pt-3 pb-3">
            <Link to="/customor" className="text-light p-3">お買い物</Link>
          </li>
          <li className="nav-item pt-3 pb-3">
            <Link to="/items" className="text-light p-3">商品一覧</Link>
          </li>
          <li className="nav-item pt-3 pb-3">
            <Link to="/orders" className="text-light p-3">店頭商品一覧</Link>
          </li>
          <li className="nav-item pt-3 pb-3">
            <Link to="/shoppings" className="text-light p-3">注文状況</Link>
          </li>
          
        </ul>

        <ul className="navbar-nav">
        {props.userData.length >0? 
           <li className="nav-item pt-3 pb-3">
             <button 
              className="logout"
              onClick={userlogout}
              data-testid="logintrue"
            >ログアウト</button>
           </li>
          : 
          <li className="nav-item pt-3 pb-3"><Link to="/login" className="text-light p-3" data-testid="loginfalse">ログイン</Link></li>
          }
        </ul>
      </div>
      
    </nav>
     
      </div><br/><br/>
      <Route exact path="/" render={()=><Index editIdget={(id)=>getEditId(id)} />} /> 
      <Route path="/login" render={()=><Login />} />
      <Route path="/users/new" component={userNew} />
      <Route path="/users/edit" render={ () => <Edit id={state.editId} />} />
      <Route path="/users/show" component={UserShow} />
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
          fixItemData={state.customerItem}
        />} />
      <Route path="/customor_show" 
      render={()=>
        <CustomorShow 
          itemData={state.customerItem}
          changeItemData={(item)=>changeItem(item)}
         
      />} />
     <Route path="/customer_confirm" component={Confirm} />
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