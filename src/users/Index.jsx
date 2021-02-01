import {  useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './users.css';
import { connect } from 'react-redux';
import {historyDataSend} from '../store/Store';
import PcIndex from './PcIndex';
import PhoneIndex from './PhoneIndex';
import MediaQuery from "react-responsive";


 function Index(props){
  const[state,setState] = useState({
    data: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
  })
  
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
   useState(loginUserCheck());

  /****************************編集**************************************** */
   const editPage = (id)=>{
     props.editIdget(id);
     props.history.push("/users/edit");
   } 


   /****************************削除*********************************************** */
   function deleteUser(i){
    if(window.confirm('削除してよろしいですか？')){
      axios
       .delete(`https://uematsu-backend.herokuapp.com/users/${i}`)
       .then((response)=>{
         alert(response.data.message); 
       })
       .catch((error)=>{
          console.log(error);
       })
    
    }
   }
   const userShowaccess = (id)=>{
    axios
    .get(`https://uematsu-backend.herokuapp.com/history/show/${id}`)
    .then((res)=>{
       const action = historyDataSend(res.data);
       props.dispatch(action);

    })
    .catch((error)=>{
       console.log(error);
    })
     props.history.push('/users_empshow');
   }
 
  return(
    <div>
       <MediaQuery minDeviceWidth={767}>
        <PcIndex 
          editPage={(i)=>editPage(i)}
        />
      </MediaQuery>
    
      <MediaQuery maxDeviceWidth={767}>
        <PhoneIndex 
          editPage={(i)=>editPage(i)}
        />
      </MediaQuery>
    </div>
  )
}
export default withRouter(connect((state)=>state)(Index))