import { useState } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router';

 function Index(props){
  const[state,setState] = useState({
    data: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
  })
  /*************APIによるuser一覧**********************************/
   function userCall(){
     axios
       .get('https://uematsu-backend.herokuapp.com/users')
       .then((res)=>{
          localStorage.setItem('users', JSON.stringify(res.data));
          setState({
            data: JSON.parse(localStorage.getItem('users'))
          })
       })
       .catch((error)=>{
          console.log(error);
       })
  }
    useState(userCall());
  /****************************編集**************************************** */
   const editPage = (id)=>{
     props.editIdget(id);
     props.history.push("/users/edit");
   } 
 
  return(
    <>
      <div className="text-center mt-5 mb-4">
        <h2>会員一覧</h2>
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
                      <Button veriant="primary" onClick={(i)=>editPage(value.id)}>編集</Button>
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
    </>
  )
}
export default withRouter(Index)