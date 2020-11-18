import { useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { useStore } from 'react-redux';

export default function Index(){
  
  /*************APIによるuser一覧**********************************/
  async function userCall(){
    const fetchInit = {
      method: "GET",
      headers: { "content-type": "application/json" }
    };
    let response = await fetch("https://uematsu-backend.herokuapp.com/users", fetchInit);
    if (response.ok) { 
      let json = await response.json();
      console.log(json);
      localStorage.setItem('users', json);
    } else {
      alert("HTTP-Error: " + response.status);
    }
    
  }
 /*************ステート**********************************/
    const[state,setState] = useState({
      data: localStorage.getItem('users') ?localStorage.getItem('users') : []
    })
 
  return(
    <>
      <div className="text-center mt-5 mb-4">
        <h2>会員一覧</h2>
      </div>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="p-5 bg-light shadow">
          {state.length > 0 ?

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center align-middle bg-dark text-white">名前</th>
                  <th className="text-center align-middle bg-dark text-white">メールアドレス</th>
                  <th className="text-center align-middle bg-dark text-white"></th>
                </tr>
              </thead>
              <tbody>
                {state.map((value)=>(
                  <tr>
                     <td className="text-center align-middle">
                       {value.name}
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