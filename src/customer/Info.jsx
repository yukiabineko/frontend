import { useEffect, useState } from 'react';
import { Image, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../App.css'
import { connect } from 'react-redux';
import image from '../images/fishs2.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from '@fortawesome/free-brands-svg-icons';



 function Info(props){
 
  return(
    <div >
      <div className="text-center mt-5 mb-4  font-weight-bold">
        <h2 className="font-weight-bold text-white">説明ページ</h2>
      </div>
    </div>
  )
}
export default withRouter(connect((state)=>state)(Info))