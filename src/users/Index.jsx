import { useEffect, useState } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './users.css';
import { connect } from 'react-redux';


const userLink ={
  border: 'none',
  background: 'none',
  color: '#333399',
  outline: 'none',
  fontWeight: 'bold',
  textDecoration: 'underline',
  
}


 function Index(props){
  const[state,setState] = useState({
    data: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
  })
  /*************APIによるuser一覧**********************************/
   async function userCall(){
     
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
    useState(userCall());
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
   useEffect(()=>{
     loginUserCheck();
   })

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
     props.history.push('/users/show')
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
                {state.data.map((value)=>(
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
                    <td>
                      <Button 
                        variant="primary"
                        onClick={(i)=>editPage(value.id)}
                        className="ml-3"
                      >編集</Button>

                      <Button 
                        variant="danger"
                        onClick={(i)=>deleteUser(value.id)}
                        className="ml-3"
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
export default withRouter(connect((state)=>state)(Index))