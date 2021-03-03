import { useState } from 'react';
import { Image, Table, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../App.css'
import { connect } from 'react-redux';
import { searchItem } from "./setting";
import axios from 'axios';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


 function Info(props){
  const[state, setState] = useState({
    date: null
  })
 /******************************ログイン/未ログイン切り替え********************************************************** */
 const loginUserCheck = ()=>{
  if(props.userData.length===0){
    props.history.push('/login');  
  }
}
useState(loginUserCheck());
/***************************************youtubeを表示する****************************************************** */
const showYoutube =()=>{
  const params = `part=snippet&q=${props.youtubeData.name} 魚&type=video&maxResults=10&key=AIzaSyDHHUMrX921aCvDdNuFia90JXJzANGy4Pc`;
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
const backPage = ()=>{
  props.history.push('/customor');  
}

  return(
    <div >
      <div className="text-center mt-5 mb-4  font-weight-bold">
        <h2 className="font-weight-bold text-white">{props.youtubeData.name}説明ページ</h2>
      </div>
      <Button 
        variant="light"
        className="btn btn-lg mb-1"
        onClick={backPage}
      >戻る</Button>
      <Table bordered className="bg-white">
        <tbody>
          <tr>
            <td className=" text-center w-25 align-middle" colSpan="2">
              <Image src={`http://yukiabineko.sakura.ne.jp/react/${props.youtubeData.name}.jpg`} alt="表示できません" roundedCircle />
            </td>
          </tr>
          <tr>
            <th className="bg-primary text-white">商品名</th>
            <td className="text-center">{props.youtubeData.name}</td>
          </tr>
          <tr>
            <th className="bg-primary text-white">価格</th>
            <td className="text-center">{props.youtubeData.price}</td>
          </tr>
          <tr>
            <th className="bg-primary text-white">カテゴリー</th>
            <td className="text-center">{searchItem(props.youtubeData.name).category}</td>
          </tr>
          <tr>
            <td colSpan="3">
              <p className="bg-primary text-white p-2">商品説明</p>
              <div className="p-5 border">
              {searchItem(props.youtubeData.name).info}
              </div>
             </td>
          </tr>
        </tbody>
      </Table>

      <div className="text-center mt-5 mb-4  font-weight-bold">
        <h2 className="font-weight-bold text-white">{`【${props.youtubeData.name}を知ろう】`}</h2>
        <p className="text-white font-weight-bold">
          各お魚についてYoutube動画で勉強できます。調理法や旬の時期など<br/>様々な情報を知ることができます。<br/>
          ぜひ活用ください。<br/>動画を視聴するにはボタンを押してください。
      </p>
      </div>
      
      <Button
         variant="danger"
         onClick={showYoutube}
         className="ml-3 text-white font-weight-bold btn btn-lg mb-2"
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
               <td>
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
  )
}
export default withRouter(connect((state)=>state)(Info))