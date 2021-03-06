import {  useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './users.css';
import { connect } from 'react-redux';
import {historyDataSend} from '../store/Store';
import { customers } from './setting';
import { circularLoading }  from '@yami-beta/react-circular-loading';
import UserPagination from './UserPagination';
import { spanStyle } from '../style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const userLink ={
  border: 'none',
  background: 'none',
  color: '#333399',
  outline: 'none',
  fontWeight: 'bold',
  textDecoration: 'underline',
  
}

//プログレスステータス
const CircularLoading = circularLoading({
  num: 6,
  distance: 1,
  dotSize: 0.5,

});


 function PhoneIndex(props){
  const[page, setPage] = useState(0);
  const[group, setGroup] = useState(0);
  let localBaseData = JSON.parse(localStorage.getItem('users'))
  let localData = localBaseData == null? "" : customers(localBaseData).slice(0,5);
  const[state,setState] = useState({
     data: localData? localData : []
  })
  const[progress, setProgress] = useState(false)
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
   /*const editPage = (id)=>{
     props.editPage(id);
     props.history.push("/users/employee_edit");
   } */


   /****************************削除*********************************************** */
   function deleteUser(i){
    if(window.confirm('削除してよろしいですか？')){
      axios
       .delete(`https://uematsu-backend.herokuapp.com/users/${i}`,{data: props.userkey})
       .then((response)=>{
         /*ユーザー更新*/
      
      　　axios.post('https://uematsu-backend.herokuapp.com/users/index',props.userkey)
            .then((res)=>{
                localStorage.setItem('users', JSON.stringify(res.data));
                setPage(0)
                let updateData = localBaseData == null? "" : localBaseData.slice(0, 4 )
                alert(response.data.message); 
                setState({
                  data: updateData? updateData : []
                })
                setProgress(false)
                setPage(0);
                paginationNo(0);
                sendGroup(0);
            })
            .catch((error)=>{
                console.log(error);
            })
          axios
            .post('https://uematsu-backend.herokuapp.com/shoppings/index',props.userkey)
            .then((res)=>{
              localStorage.removeItem('shoppings');
              localStorage.setItem('shoppings', JSON.stringify(res.data));
            })
          .catch((error)=>{
            console.log(error);
          })              
          
        })
        .catch((error)=>{
            console.log(error);
        })
    
    }
   }
   /****************************ページ更新**************************************** */
   const updateUsers = ()=>{
    setProgress(true)
    axios
    .post('https://uematsu-backend.herokuapp.com/users/index',props.userkey)
    .then((res)=>{
        localStorage.setItem('users', JSON.stringify(res.data));
        let updateData = localBaseData == null? "" : localBaseData.slice(page * 2, page * 2 + 4 )
        setState({
          data: updateData? updateData : []
        })
        setProgress(false)
        setPage(0);
        paginationNo(0);
        sendGroup(0);
    })
    .catch((error)=>{
        console.log(error);
    })       
   } 

   const userShowaccess = (id)=>{
    const sendid = {user_id: id}
    axios
    .post(`https://uematsu-backend.herokuapp.com/history/show/`, sendid)
    .then((res)=>{
       const action = historyDataSend(res.data);
       props.dispatch(action);

    })
    .catch((error)=>{
       console.log(error);
    })
     props.history.push('/users_phone_empshow');
   }
   /********************************ページネーション(通常ボタン)処理**************************************** */
  const paginationNo = (num)=>{
    switch (num) {
      case 0:
        setState({
          data: customers(JSON.parse(localStorage.getItem('users'))).slice(num * 5, num * 5 + 5)
        })
       
        break;
      default:
        setState({
          data: customers(JSON.parse(localStorage.getItem('users'))).slice(num * 5, num * 5 + 5)
        })
        break;
    }
    setPage(num);
  }
  /*********************************ページグループ更新*********************************************** */
  const sendGroup = (i)=>{
    setGroup(i);
  }
 
 
  return(
    <div className="w-100">
      <div className="text-center mt-3 mb-1">
      <h2 data-testid="usertitle">
        <span style={spanStyle}>
          <span className="mr-3 text-white font-weight-bold"><FontAwesomeIcon icon={faUsers} /></span>
            会員一覧
          </span>
        </h2>
      </div>
      {/* プログレス */}
     
      {progress ===true? 
            <div id="progress" className=" pl-2 pr-2  bg-white shodow">
              <p　className="mt-3 font-weight-bold">しばらくお待ちください。</p>
              <div className="text-center">
              <CircularLoading />
              </div>
            </div>
          : 
          ''
      }
     
      <Button　
        variant="primary"
        className="mb-3"
        onClick={updateUsers}
      >更新</Button>

        <UserPagination 
          No={page} 
          group={group}
          paginationSend={(num)=>paginationNo(num)} 
          sendGroup={(i)=>sendGroup(i)}
        />

      <div class="bg-white"></div>
      <div className="w-100 bg-white">
          {state.data.length > 0 ?
            <Table striped bordered hover>
              <tbody>
                {customers(state.data).map((value)=>(
                  <tr key={value.name}>
                    <Table bordered>
                      <tbody>
                        <tr>
                          <th className="text-center align-middle bg-dark text-white">名前</th>
                          <td className="text-center align-middle">
                            <button 
                              style={userLink} 
                              onClick={(i)=>userShowaccess(value.id)}
                            >{value.name}</button>
                          </td>
                        </tr>

                        <tr>
                          <th className="text-center align-middle bg-dark text-white">メールアドレス</th>
                          <td  className="text-center align-middle">
                            <a className="font-weight-bold" href={`mailto:${value.email}`} target="_blank" rel="noopener noreferrer">{value.email}</a>  
                          </td>
                        </tr>

                        <tr>
                          <th className="text-center align-middle bg-dark text-white">電話番号</th>
                          <td  className="text-center align-middle">
                            <a className="font-weight-bold" href={`tel:${value.tel}`} target="_blank" rel="noopener noreferrer">{value.tel}</a>
                          </td>
                        </tr>
                        

                        <tr>
                            <td colSpan="2">
                             {/* <Button 
                                variant="primary"
                                onClick={(i)=>editPage(value.id)}
                                style={buttonWidth}
                               >編集</Button>*/}

                              <Button 
                                variant="danger"
                                onClick={(i)=>deleteUser(value.id)}
                                className="btn btn-block"
                              >削除</Button>
                          </td>
                        </tr>


                      </tbody>
                    </Table>
                  </tr>
                ))}
              </tbody>
            </Table>
            :
            <div>データなし</div>
            }
      </div>
    </div>
  )
}
export default withRouter(connect((state)=>state)(PhoneIndex))