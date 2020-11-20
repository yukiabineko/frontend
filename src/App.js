import React, { useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./App.css";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from './users/Index';
import Login from './Login';
import userNew from './users/New'
import Edit from './users/Edit'


export default function App(){
  const[state, setState] = useState({
    editId: 0,
    deleteId: 0
  })
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
          <Nav.Item><Link to="/" className="text-light p-3">HOME</Link></Nav.Item>
        </Nav>
        <Nav className="mr-right">
        <Nav.Item><Link to="/login" className="text-light p-3">ログイン</Link></Nav.Item>
        </Nav>
      </Navbar>
      <Route exact path="/" render={()=><Index editIdget={(id)=>getEditId(id)} />} />
      <Route path="/login" component={Login} />
      <Route path="/users/new" component={userNew} />
      <Route path="/users/edit" render={ () => <Edit id={state.editId} />} />
    </BrowserRouter>
  )
}



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