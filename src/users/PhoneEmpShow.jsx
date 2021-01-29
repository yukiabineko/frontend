import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { daySetting, customerTodayOrders,customerOrders } from './setting';



/**************************************************************************************** */
const  EmpShow = (props)=>{
   
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
   useState(loginUserCheck());
  return(
   <>
      <div className="text-center mt-5 mb-4">
        <h2 data-testid="userNewtitle" className="text-light font-weight-bold">{props.historyData? props.historyData.name : ''}&nbsp;注文履歴</h2>
      </div>
      <div className="w-100 bg-white">
         <p className="font-weight-bold text-center">【現在注文中の表品一覧】</p>
         {(props.historyData && customerTodayOrders(props.historyData.orders[0]).length >0)? 
           <>
            <Table bordered className="w-100"> 
              <tbody>
                {customerTodayOrders(props.historyData.orders[0]).map((data)=>(
                  <tr>
                    <Table bordered>
                        <tbody>
                        <tr>
                          <th className="text-white text-center bg-primary align-middle">日付</th>
                          <td colSpan="4" className="text-center font-weight-bold">{daySetting(data.shopping_date)}</td>
                        </tr>

                        <tr>
                          <th className="text-white text-center bg-primary align-middle">品名</th>
                          <td className="text-center font-weight-bold">{data.name}</td>
                          <th className="text-white text-center bg-primary align-middle">加工名</th>
                          <td colSpan="2" className="text-center font-weight-bold">{data.process}</td>
                        </tr>

                        <tr>
                          <th className="text-white text-center bg-primary align-middle">価格</th>
                          <td className="text-center font-weight-bold align-middle">
                             {data.price}<br/>(単価)
                          </td>
                          <td className="text-center font-weight-bold align-middle">
                            {Number(data.num) * Number(data.price)}<br/>(合計)
                          </td>
                          <th className="text-white text-center bg-primary align-middle">数</th>
                          <td className="text-center font-weight-bold align-middle">{data.num}</td>
                        </tr>
                      </tbody>
                     
                    </Table>
                    
                  </tr>
                ))}
              </tbody>
            </Table>
           </>
            : 
            <div className="bg-secondary text-center font-weight-bold text-white p-3">データがありません。</div>
          }  
      </div>

      {/* 当日以外の履歴 */}

      <div class="w-100 bg-light">
         <p className="font-weight-bold text-center">【過去の注文一覧】</p>
         {(props.historyData && customerOrders(props.historyData.orders[0]).length >0)? 
           <>
            <Table bordered className="w-100">
              <tbody>
                {customerOrders(props.historyData.orders[0]).map((data)=>(
                  <tr>
                    <Table bordered>
                    <tbody>
                        <tr>
                          <th className="text-white text-center bg-primary align-middle">日付</th>
                          <td colSpan="4" className="text-center font-weight-bold">{daySetting(data.shopping_date)}</td>
                        </tr>

                        <tr>
                          <th className="text-white text-center bg-primary align-middle">品名</th>
                          <td className="text-center font-weight-bold">{data.name}</td>
                          <th className="text-white text-center bg-primary align-middle">加工名</th>
                          <td colSpan="2" className="text-center font-weight-bold">{data.process}</td>
                        </tr>

                        <tr>
                          <th className="text-white text-center bg-primary align-middle">価格</th>
                          <td className="text-center font-weight-bold align-middle">
                             {data.price}<br/>(単価)
                          </td>
                          <td className="text-center font-weight-bold align-middle">
                            {Number(data.num) * Number(data.price)}<br/>(合計)
                          </td>
                          <th className="text-white text-center bg-primary align-middle">数</th>
                          <td className="text-center font-weight-bold align-middle">{data.num}</td>
                        </tr>
                      </tbody>
                    </Table>
    
                  </tr>
                ))}
              </tbody>
            </Table>
           </>
            : 
            <div className="bg-secondary text-center font-weight-bold text-white p-3">データがありません。</div>
          }
      </div>

   </>
  )
}
export default withRouter(connect((state)=>state)(EmpShow))
