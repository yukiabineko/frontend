import React, { useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./App.css";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from './users/Index';
import Login from './Login';
import userNew from './users/New'
import Edit from './users/Edit'
import UserShow from './users/Show';
import ItemIndex from './items/Index';
import ItemNew from './items/New';
import ItemShow from './items/Show';
import { connect } from "react-redux";
import { logoutAction } from './store/Store';


 function App(props){
  const[state, setState] = useState({
    editId: 0,
    deleteId: 0
  })
  const userlogout = ()=>{
    let action = logoutAction();
    props.dispatch(action);
    
  }
  const getEditId = (id)=>{

    setState({
      editId: id,
      deleteId: state.deleteId
    })
  }
  
  return(
    <BrowserRouter>
     <Navbar bg="dark">
        <Navbar.Brand href="#home"　className="text-white font-weight-bold">加工依頼アプリ</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Item className="text-info">{props.userData.length >0  ?`${props.userData[0].name}さん`: ''}</Nav.Item>
          <Nav.Item><Link to="/" className="text-light p-3">HOME</Link></Nav.Item>
          <Nav.Item><Link to="/items" className="text-light p-3">商品一覧</Link></Nav.Item>
        </Nav>
        
        <Nav className="mr-right">
          {props.userData.length >0? 
           <Nav.Item>
             <button 
              className="logout"
              onClick={userlogout}
              data-testid="logintrue"
            >ログアウト</button>
           </Nav.Item>
          : 
          <Nav.Item><Link to="/login" className="text-light p-3" data-testid="loginfalse">ログイン</Link></Nav.Item>
          }
         
        </Nav>
      </Navbar>
      <Route exact path="/" render={()=><Index editIdget={(id)=>getEditId(id)} />} /> 
      <Route path="/login" render={()=><Login />} />
      <Route path="/users/new" component={userNew} />
      <Route path="/users/edit" render={ () => <Edit id={state.editId} />} />
      <Route path="/users/show" component={UserShow} />
      <Route path="/items" component={ItemIndex} />
      <Route path="/items_new" component={ItemNew} />
      <Route path="/items_edit" component={ItemNew} />
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