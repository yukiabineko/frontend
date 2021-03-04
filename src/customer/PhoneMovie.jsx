import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css'
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formSelectItems } from '../orders/setItem';
import Select from 'react-select';
import axios from 'axios';


 function PcMovie(props){
   const[state, setState] = useState({
     data: null
   });
  const [selectedOption, setSelectedOption] = useState(null);
  const options = formSelectItems();
  /******************ボタン処理************************ */
  const showYoutube =()=>{
    if(selectedOption){
      const params = `part=snippet&q=${selectedOption.value} 魚&type=video&maxResults=10&key=AaSyDHHIzUMrX921aCvDdNuFia90JXJzANGy4Pc`;
        axios.get(`https://www.googleapis.com/youtube/v3/search?${params}`)
          .then((response)=>{
              let data = response.data.items;
              setState({
                data: data
              })
          })
          .catch((error)=>{
              console.log(error);
          })
        }
    }
  return(
    <div>
     <div className="text-center mt-5 mb-4  font-weight-bold">
        <h2 className="font-weight-bold text-dark">お魚動画視聴ページ</h2>
        <p className="text-warning font-weight-bold mt-3">
          販売されているお魚を動画で調べてみましょう<br/>
        </p>
      </div>
      <p className="text-white font-weight-bold">【検索したい商品を選択してください。】</p>
        <Select
            options={options}
            defaultvalue={selectedOption}
            onChange={setSelectedOption}
        />
        <Button
            variant="danger"
            onClick={showYoutube}
            className="text-white font-weight-bold btn btn-block mb-2 mt-2"
        > <FontAwesomeIcon icon={faYoutube}  />動画を見る</Button>

     {state.data?
       <Table className="bg-light text-primary table-responsive">
         <thead>
           <tr>
             <th className="text-center">動画</th>
           </tr>
         </thead>
         <tbody>
           {state.data.map((data,i)=>(
             <tr>
               <td className="text-dark">
                 <a　target="_blank" rel="noopener noreferrer" href={`https://www.youtube.com/watch?v=${data.id.videoId}`}　>
                   <img src={data.snippet.thumbnails.medium.url} alt="" />
                 </a><br/>
                 <b className="w-100">{data.snippet.title}</b>
                 
               </td>
             </tr>
           ))}
         </tbody>
       </Table>
       : 
       <div className="bg-white p-5 text-primary text-center">
         <p className="bg-light p-5 font-weight-bold">
           ただいま表示できません。表示するにはボタン押してください。
         </p>
        
      </div>
      }
    </div>
  );
}
export default withRouter(connect((state)=>state)(PcMovie))