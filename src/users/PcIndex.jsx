import {  useState } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './users.css';
import { connect } from 'react-redux';
import {historyDataSend} from '../store/Store';
import { customers } from './setting';


const userLink ={
  border: 'none',
  background: 'none',
  color: '#333399',
  outline: 'none',
  fontWeight: 'bold',
  textDecoration: 'underline',
  
}

 let data = JSON.parse(localStorage.getItem('users'));
 function PcIndex(props){
  const[state,setState] = useState({
    data:  data? data : []
  })
  /*************APIによるuser一覧**********************************/
   /*async function userCall(){
     
     await axios
       .get('https://uematsu-backend.herokuapp.com/users')
       .then((res)=>{
          localStorage.setItem('users', JSON.stringify(res.data));
          
       })
       .catch((error)=>{
          console.log(error);
       })
       setState({
        data: JSON.parse(localStorage.getItem('users'))
      })
  }
    useState(userCall());*/

  /****************************編集**************************************** */
   const editPage = (id)=>{
     props.editPage(id);
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
    <div className="image">
      <div className="text-center mt-5 mb-4">
        <h2 data-testid="usertitle">会員一覧</h2>
      </div>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="p-5 bg-light shadow">
          {state.data.length > 0 ?

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center align-middle bg-dark text-white">名前</th>
                  <th className="text-center align-middle bg-dark text-white">メールアドレス</th>
                  <th className="text-center align-middle bg-dark text-white"></th>
                </tr>
              </thead>
              <tbody>
                {customers(state.data).map((value)=>(
                  <tr key={value.name}>
                     <td className="text-center align-middle">
                       <button 
                         style={userLink} 
                         onClick={(i)=>userShowaccess(value.id)}
                       >{value.name}</button>
                    </td>
                    <td  className="text-center align-middle">
                      {value.email}
                    </td>
                    <td className="text-center">
                      <Button 
                        variant="primary"
                        onClick={(i)=>editPage(value.id)}
                        className="ml-3 w-25"
                      >編集</Button>

                      <Button 
                        variant="danger"
                        onClick={(i)=>deleteUser(value.id)}
                        className="ml-3 w-25"
                      >削除</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            :
            <div>データなし</div>
            }
        </Col>
      </Row>
    </div>
  )
}
export default withRouter(connect((state)=>state)(PcIndex))