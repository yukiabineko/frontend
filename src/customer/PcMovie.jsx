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
      const params = `part=snippet&q=${selectedOption.value} 魚&type=video&maxResults=10&key=AIzaSyDHHUMrX921aCvDdNuFia90JXJzANGy4Pc`;
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
        <h1 className="font-weight-bold text-dark">お魚動画視聴ページ</h1>
        <p className="text-light font-weight-bold mt-5">
          販売されているお魚を動画で調べてみましょう<br/>
        </p>
      </div>
     
      <div className="container">
        <div className="row">
          <div className="col-md-11 offset-md-1">
          <p className="text-light font-weight-bold">検索したい商品を選択してください。</p>
          <Table>
            <tbody>
              <tr>
                <td className="align-middle">
                  <Select
                    options={options}
                    defaultvalue={selectedOption}
                    onChange={setSelectedOption}
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={showYoutube}
                    className="ml-3 text-white font-weight-bold btn btn-lg mb-2"
                  > <FontAwesomeIcon icon={faYoutube}  />動画を見る</Button>
                </td>
              </tr>
            </tbody>
      </Table>
          </div>
        </div>
      </div>
     
      {state.data?
       <Table className="bg-light text-primary">
         <thead>
           <tr>
             <th></th>
             <th>動画</th>
             <th>動画情報</th>
           </tr>
         </thead>
         <tbody>
           {state.data.map((data,i)=>(
             <tr>
               <td>NO.{i + 1}</td>
               <td>
                 <a　target="_blank" rel="noopener noreferrer" href={`https://www.youtube.com/watch?v=${data.id.videoId}`}　>
                   <img width="320" height="180" src={data.snippet.thumbnails.medium.url} alt="" />
                 </a>
               </td>
               <td className="text-dark"> 
                 <b>{data.snippet.title}</b>
                 <span>{data.snippet.description}</span>
               </td>
             </tr>
           ))}
         </tbody>
       </Table>
       : 
       <div className="container">
         <div className="row">
           <div className="col-md-10 offset-md-1">
            <p className="bg-light p-5 font-weight-bold text-center">
              ただいま表示できません。表示するにはボタン押してください。
            </p>
           </div>
         </div>
      </div>
      }
    </div>
  );
}
export default withRouter(connect((state)=>state)(PcMovie))