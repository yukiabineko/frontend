import { useEffect, useState } from 'react';
import { Image, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../App.css'
import { connect } from 'react-redux';
import { searchItem } from "./setting";

 function Info(props){
 /******************************ログイン/未ログイン切り替え********************************************************** */
 const loginUserCheck = ()=>{
  if(props.userData.length===0){
    props.history.push('/login');  
  }
}
useState(loginUserCheck());
  return(
    <div >
      <div className="text-center mt-5 mb-4  font-weight-bold">
        <h2 className="font-weight-bold text-white">{props.youtubeData.name}説明ページ</h2>
      </div>
      <Table bordered className="bg-white">
        <tbody>
          <tr>
            <td className=" text-center w-25 align-middle" rowSpan="4">
              <Image src={`http://yukiabineko.sakura.ne.jp/react/${props.youtubeData.name}.jpg`} alt="表示できません" roundedCircle />
            </td>
            <th className="bg-primary text-white">商品名</th>
            <th className="bg-primary text-white">価格</th>
            <th className="bg-primary text-white">カテゴリー</th>
          </tr>

          <tr>
            <td className="text-center">{props.youtubeData.name}</td>
            <td className="text-center">{props.youtubeData.price}</td>
            <td className="text-center">{searchItem(props.youtubeData.name).category}</td>
          </tr>

          <tr>
            <th colSpan="3"　　className="bg-primary text-white text-center">
               商品説明
            </th>
          </tr>
          <tr>
            <td colSpan="3">
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
          ぜひ活用ください。
      </p>
      </div>
      


    </div>
  )
}
export default withRouter(connect((state)=>state)(Info))