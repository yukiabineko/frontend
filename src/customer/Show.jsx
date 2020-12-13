import React, { useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

const table ={
  width: '100%',
  border: '1px solid #c0c0c0'
}
const select={
  width:'30%',
  height:'40px'
}

/**************************************************************************************** */

const  Show = (props)=>{
  const[state, setState] = useState({
    number: null,
    total: props.itemData.price
  })
  const stockOption = ()=>{
    let array = []
    for(let i=0; i<=Number(props.itemData.stock); i++){
       array.push(i)
    }
    return array
  }
 /********************************カテゴリーの配列化************************************************** */
 const categoryArray = ()=>{
   return  props.itemData.process.split(',')
 }
 /********************************注文数変更************************************************** */
 const numberChange = (e)=>{
   setState({
     number: e.target.value,
     total:  Number(props.itemData.price) * Number(e.target.value)
   })
}
/********************************サブミット************************************************** */

  const doSubmit = (e)=>{
    e.preventDefault();
    let propData = props.itemData;
    let stock = Number(props.itemData.stock);
    let minusNumber = Number(state.number);
    stock -= minusNumber;
    propData.stock = stock;
    props.changeItemData(propData);
    props.history.push('/customor/index')

  }

/********************************************************************************************************************************** */
  return(
   <>
      <div className="text-center mt-5 mb-4  font-weight-bold">
        <h2 className="font-weight-bold text-info">{props.itemData.name}注文</h2>
      </div>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="pt-3 pl-5 pr-5 pb-4 bg-light shadow">
            <form onSubmit={doSubmit} className="W-100">
             <Table  style={table}>
               <thead>
                 <th className="bg-dark text-center text-white">商品名</th>
                 <th className="bg-dark text-center text-white">価格</th>
                 <th className="bg-dark text-center text-white">買い上げ数</th>
                 <th className="bg-dark text-center text-white">加工法</th>
                 <th className="bg-dark text-center text-white">合計金額</th>
               </thead>
               <tbody>
                 <tr>
                   <td className="font-weight-bold text-center align-middle">{props.itemData.name}</td>
                   <td className="font-weight-bold text-center align-middle text-danger">{props.itemData.price}</td>
                   <td className="font-weight-bold text-center">
                     <select className="form-control" onChange={numberChange}>
                       {stockOption().map((num)=>(
                         <option>{num}</option>
                       ))}
                     </select>
                   </td>
                   <td className="font-weight-bold text-center align-middle">
                   <select className="form-control">
                       {categoryArray().map((process)=>(
                         <option>{process}</option>
                       ))}
                     </select>
                   </td>
                   <td className="font-weight-bold text-center align-middle text-danger">{state.total}</td>
                 </tr>
               </tbody>
             </Table>
              <div className="text-left">
                <input type="submit" value="追加"　className="btn btn-primary btn-lg" />
              </div>
             </form>
        </Col>    
      </Row>
   </>
  )
}
export default withRouter(connect((state)=>state)(Show))
