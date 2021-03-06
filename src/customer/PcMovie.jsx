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
import { spanStyle } from '../style';


 function PcMovie(props){
   const[state, setState] = useState({
     data: null
   });
  const [selectedOption, setSelectedOption] = useState(null);
  const options = formSelectItems();
  /******************ボタン処理************************ */
  const showYoutube =()=>{
    if(selectedOption){
      const params = `part=snippet&q=${selectedOption.value} 魚&type=video&maxResults=10&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
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
        <h1 className="font-weight-bold text-dark">
          <span style={spanStyle}>
           <span className="mr-3 text-white"><FontAwesomeIcon icon={faYoutube} /></span>
            お魚動画視聴ページ
          </span></h1>
        <p className="text-darkx font-weight-bold mt-5">
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
           <div className="col-md-10 offset-md-1 bg-white pt-3 pt-2">
            <p className="bg-dark p-5 font-weight-bold text-center text-white">
              お魚を選択してください。
            </p>
           </div>
         </div>
      </div>
      }
    </div>
  );
}
export default withRouter(connect((state)=>state)(PcMovie))