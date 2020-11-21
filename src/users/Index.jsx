import { useState } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './users.css';

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
  /****************************編集**************************************** */
   const editPage = (id)=>{
     props.editIdget(id);
     props.history.push("/users/edit");
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
                       {value.name}
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
                        onClick={(i)=>editPage(value.id)}
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
export default withRouter(Index)