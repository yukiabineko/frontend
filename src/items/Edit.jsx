import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import '../users/users.css';

/**************************************************************************************** */
const  ItemEdit = (props)=>{

  const getitemData = ()=>{
    let item = []
    let datas = JSON.parse(localStorage.getItem('items'));
    datas.forEach((data)=>{
      if(data.id === props.id){
       item.push(data);
      }
    });
    return item
   }
   let item = getitemData();
/*********************************state******************************************************* */
  const[show,setShow] =useState({
    display: 'none'
  })
  const[state, setState] = useState({
    name: item[0].name,
    price: item[0].price,
    category: item[0].category,
    info: item[0].info
  })

  const[image, setImage] = useState({
    file: null
  })



  const homeComponent = ()=>{
    props.history.push('/items')  
  }
  const itemInput = (e)=>{
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setState({...state, [name]: value});
  }

  const updateFile = (e)=>{
    setImage({
      file: e.target.files[0]
    })
  }
  const sendItemParameter = (e)=>{
    e.preventDefault();
    if(state.category === ''){
      setShow({display: 'block'});
    }
    else{
       /* PHPへの送信 */
       const params = new FormData();
       params.append('file', image.file);
       params.append('name', state.name);
       axios.post('http://yukiabineko.sakura.ne.jp/send-react.php',
       　　　　　　　params,
                   {
                     headers:{
                       'content-type': 'multipart/form-data',
                     },
                   }
       ).then((res)=>{
           console.log(res.data);
       }).catch(()=>{
         alert('ERROR');
       })

       /* rails側への送信*/ 
      let data = {
        name: state.name,
        price: state.price,
        category: state.category,
        info: state.info
      }
      axios.patch(`https://uematsu-backend.herokuapp.com/items/${props.id}`, data)
      .then(function (response) {
        /*railsからメッセージ*/
        alert(response.data.message); 
        setState({
          name: '',
          price: '',
          category: '',
          info: ''
        })
        props.history.push('/items');
      })
      .catch(function(){
        alert('error');
      })
      setShow({display: 'none'});
    }
    
  }
  return(
    <>
       <div className="text-center mt-5 mb-4">
         <h2 data-testid="userNewtitle">{state.name}編集</h2>
       </div>
       <Row>
         <Col md={{ span: 4, offset: 4 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
         <Button 
           variant="secondary" 
           onClick={homeComponent}
           className="mb-3"
         >
          戻る
         </Button>
           <Form onSubmit={sendItemParameter}>
             <Form.Group>
               <Form.File  label="商品画像" multiple accept="image/*" onChange={updateFile} />
             </Form.Group>
             <Form.Group>
               <Form.Label>商品名</Form.Label>
               <Form.Control type="text" name="name" placeholder="*必須です。" className="h8" required onChange={itemInput} value={state.name} />
             </Form.Group>
 
             <Form.Group>
               <Form.Label>価格</Form.Label>
               <Form.Control type="price" name="price" placeholder="*必須です。" required onChange={itemInput} value={state.price} />
             </Form.Group>
 
             <Form.Group>
               <Form.Label>カテゴリー</Form.Label>
               <div class="balloon1" style={show}>
                 <p>選択してください。</p>
               </div>
                 <Form.Control as="select" name="category" value={state.category} onChange={itemInput}>
                   <option value="">選択してください  </option>
                  {["青魚","白身魚","大型魚","いか、タコ","貝","その他"].map((value, i)=>
                    <option key={i} value={value}>{value}</option>
                  )}
                 </Form.Control>
             </Form.Group>
                
             <Form.Group>
               <Form.Label>商品説明</Form.Label>
               <textarea 
                 name="info" 
                 cols="30" 
                 rows="10" 
                 value={state.info}
                 onChange={itemInput}
                 className="form-control">{state.info}</textarea>
             </Form.Group>
 
               <Button 
                 type="submit" 
                 variant="primary" 
                 className="btn-block mt-4">
                   送信
               </Button>
           </Form>
           
         </Col>
       </Row>
    </>
   )
}
export default withRouter(ItemEdit)
/***************************************************************************************************** */