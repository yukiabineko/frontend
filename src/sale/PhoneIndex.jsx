import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import { totalSales, salesRate} from './setting';
import { excelExport } from "../Excel";
import { spanStyle } from '../style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';



 function PcIndex(props){
  const datas = props.chartData;
/******************************ログイン/未ログイン切り替え********************************************************** */
    const loginUserCheck = ()=>{
      if(props.userData.length===0){
        props.history.push('/login');  
      }
    }
    useState(loginUserCheck()); 
/**************************************************************** */
    const downloadFile =()=>{
      excelExport(datas);
   }
  return(
    <div className="w-100">
       <div className="text-center text-white mt-4">
        　<h1 className="font-weight-bold">
          <span style={spanStyle}>
            <span className="mr-3 text-white"><FontAwesomeIcon icon={faChartBar} /></span>
              売上速報
            </span>
          
         </h1>
          <h3 className="font-weight-bold">{`【${(new Date()).getMonth() + 1}月】`}</h3>
       </div>

       <ResponsiveContainer width="100%" height={300} className="bg-white w-100">
            <BarChart  data={datas} margin={{ top: 5, right: 0, left: 10, bottom: 5, }}>
            　　 <CartesianGrid strokeDasharray="3 3" />
            　　　<XAxis dataKey="date" /><YAxis />
            　　　<Tooltip />
                <Legend />
                <Bar dataKey="合計" fill="orange" />
            </BarChart>
        </ResponsiveContainer>

        <div className="text-center font-weight-bold text-white mt-2">
            <h4 className="font-weight-bold text-white">【売上実績合計】{ totalSales(datas) }円</h4>
        </div>
        <Button 
          variant="success"
          className="btn-lg border"
          onClick={downloadFile}
        >Excel出力</Button>
        <div className="bg-white w-100 pb-2">
          {datas? 
             <Table bordered>
             <thead>
                 <tr>
                     <th rowSpan="2" className="bg-primary text-white font-weight-bold text-center align-middle">日付</th>
                     <th rowSpan="2" className="bg-primary text-white font-weight-bold text-center align-middle">曜日</th>
                     <th colSpan="3" className="bg-primary text-white font-weight-bold text-center">売上</th>
                 </tr>
                 <tr>
                   <th className="bg-primary text-white font-weight-bold text-center">販売数</th>
                   <th className="bg-primary text-white font-weight-bold text-center">売上金額</th>
                   <th className="bg-primary text-white font-weight-bold text-center">構成比(%)</th>
                 </tr>
             </thead>
             <tbody>
                 {datas.map((data)=>(
                     <tr>
                       <td className="font-weight-bold text-center">{data.day}</td>
                       <td className="font-weight-bold text-center">{data.week}</td>
                       <td className="font-weight-bold text-center">{data.num}</td>
                       <td className="font-weight-bold text-center">{data.合計}</td>
                       <td className="font-weight-bold text-center">{ salesRate(data, datas) }</td>
                     </tr>
                 ))}
             </tbody>
         </Table>
            : 
          <div className="bg-secondary p-5 font-weight-bold text-white text-center">データがありません。</div>
          }
         
        </div>
    </div>  
  )
}
export default withRouter(connect((state)=>state)(PcIndex))