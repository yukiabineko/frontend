import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Table, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import { getOption } from './setItemData';
import Select from 'react-select';
import { connect } from 'react-redux';
import { circularLoading }  from '@yami-beta/react-circular-loading';


//プログレスステータス
const CircularLoading = circularLoading({
  num: 6,
  distance: 1,
  dotSize: 0.5,

});

const Process = (props)=>{
  const[progress,setProgres] = useState(false)
/********************加工データ************************************************************** */
  const getProcessData = ()=>{
    setProgres(true);
     axios
        .get(`https://uematsu-backend.herokuapp.com/processings/${props.item.id}`)
        .then((res)=>{
           
           localStorage.removeItem('process');
           localStorage.setItem('process', JSON.stringify(res.data));
           setProcess(res.data);
           setProgres(false);
        
        })
        .catch((error)=>{
           console.log(error);
           setProgres(false);
        })
     }

/*************************ステートおよび各種セット************************************************ */
   useState(getProcessData);
   let item = props.item;
   let options = getOption();

   const[process, setProcess] = useState([]);
   const [selectedOption, setSelectedOption] = useState(null);
/***********************加工データサーバー送信**************************************** */
   const addProcess = (e)=>{
     e.preventDefault();
     setProgres(true);
     let obj={};
     obj["id"] = props.item.id;
     obj["data"] = selectedOption;
     axios.post('https://uematsu-backend.herokuapp.com/processings', obj)
      .then(function (response) {
        /*railsからメッセージ*/
        alert(response.data.message); 
        setProgres(false);
        getProcessData();
      })
      .catch(function(){
        alert('error');
        setProgres(false);
      })
    
   }
   /******************************ログイン/未ログイン切り替え********************************************************** */
   const loginUserCheck = ()=>{
    if(props.userData.length===0){
      props.history.push('/login');  
    }
  }
  useEffect(()=>{
    loginUserCheck();
  })
 /****************************************削除加工法*************************************************************** */
    const deleteProcess = (i,count)=>{
      if(window.confirm('削除してよろしいですか？')){
        axios
          .delete(`https://uematsu-backend.herokuapp.com/processings/${i}`)
          .then((response)=>{
            alert(response.data.message); 
            let data = process.slice();
            data.splice(count,1);
            setProcess(data);
          })
          .catch((error)=>{
            console.log(error);
          })
      }
    }

  return(
   <>
    <div className="text-center text-white font-weight-bold h2 mt-5 mb-3">{item.name}加工法管理画面</div>
    <Row>
      <Col md={{ span: 4, offset: 4 }} className="p-5 bg-light shadow">
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
      <Form onSubmit={addProcess}>
        <Form.Group>
          <Form.Label>加工法の登録</Form.Label>
          <Select
          　isMulti
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </Form.Group>
        <Form.Control type="submit" className="bg-primary text-white"  value="追加" />
      </Form>
      {process.length >0?
       <>
         <div className="text-center font-weight-bold mt-5">登録加工法一覧</div>
         <Table bordered>
           <thead>
             <tr>
               <th className="text-white bg-dark text-center">加工法</th>
               <th className="text-white bg-dark text-center"></th>
             </tr>
           </thead>
           <tbody>
             {process.map((data,count)=>(
               <tr>
                 <td className="text-center">{data.processing_name}</td>
                 <td>
                   <Button
                    variant="danger"
                    className="btn-block"
                    onClick={(i)=>deleteProcess(data.id, count)}
                   >削除</Button>
                 </td>
               </tr>
             ))}
           </tbody>
         </Table>
       </>
       : 
       <></>
       }
      </Col>
    </Row>  


   </>
  )
}
export default withRouter(connect(state=>state)(Process))