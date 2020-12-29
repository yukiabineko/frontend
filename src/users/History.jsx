import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

const  History = (props)=>{

  return(
   <>
    {props.userData.length > 0? 
      <>
       <Table bordered className="mt-3">
         <thead>
           <tr>
             <th className="bg-primary text-white text-center">注文日</th>
             <th className="bg-primary text-white text-center">注文商品</th>
             <th className="bg-primary text-white text-center">加工法</th>
             <th className="bg-primary text-white text-center">状況</th>
           </tr>
         </thead>
         <tbody>
           {props.userData[0].orders[0].map((data)=>(
             <tr>
               <td className="font-weight-bold text-center">{data.shopping_date}</td>
             </tr>
           ))}
         </tbody>
       </Table>
      </>
      : 
      <div className="p-5 bg-light">履歴がありません。</div>
    }
   </>
  )
}
export default withRouter(connect((state)=>state)(History))