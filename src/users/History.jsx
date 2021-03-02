import React from 'react';
import { withRouter } from 'react-router';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { orderHistoryStatus } from "./setting";
import MyPagination from './MyPagination';

const  History = (props)=>{

  return(
   <div>
    {props.pageData?
      <>
        <MyPagination />
       <Table bordered className="mt-3">
         <thead>
           <tr>
             <th className="bg-primary text-white text-center">注文日</th>
             <th className="bg-primary text-white text-center">注文商品</th>
             <th className="bg-primary text-white text-center">加工法</th>
             <th className="bg-primary text-white text-center">価格</th>
             <th className="bg-primary text-white text-center">注文数</th>
             <th className="bg-primary text-white text-center">状況</th>
           </tr>
         </thead>
         <tbody>
           {props.pageData.map((data)=>(
             <tr>
               <td className="font-weight-bold text-center">{data.shopping_date}</td>
               <td className="font-weight-bold text-center">{data.name}</td>
               <td className="font-weight-bold text-center">{data.process}</td>
               <td className="font-weight-bold text-center">{data.price}</td>
               <td className="font-weight-bold text-center">{data.num}</td>
               <td className="font-weight-bold text-center">{orderHistoryStatus(data.status)}</td>
             </tr>
           ))}
         </tbody>
       </Table>
      </>
      : 
      <div className="p-5 bg-secondary mt-3 text-white font-weight-bold text-center">履歴がありません。</div>
    }
   </div>
  )
}
export default withRouter(connect((state)=>state)(History))