import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css'
import MediaQuery from "react-responsive";
import { connect } from 'react-redux';

 function PcMovie(props){
  
  return(
    <div>
      <h1>sample</h1>
    </div>
  )
}
export default withRouter(connect((state)=>state)(PcMovie))