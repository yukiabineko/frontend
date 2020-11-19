import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from './users/Index';
import Login from './Login';
import userNew from './users/New'


export default function App(){
  return(
    <BrowserRouter>
     <Navbar bg="dark">
        <Navbar.Brand href="#home"　className="text-white font-weight-bold">加工依頼アプリ</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/" className="text-white border">Home</Nav.Link>
        </Nav>
        <Nav className="mr-right">
          <Nav.Link href="/login" className="text-white border">ログイン</Nav.Link>
        </Nav>
      </Navbar>
      <Route exact path="/" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/users/new" component={userNew} />
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