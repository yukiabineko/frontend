import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import datastore from './store/Store';
import { Beforeunload } from 'react-beforeunload';


ReactDOM.render(
  <Provider store={datastore}>
    <Beforeunload onBeforeunload={() => "data"}>
     <App />
    </Beforeunload>
  </Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
