import axios from 'axios';

export const formSelectItems = ()=>{
  const itemData =JSON.parse(localStorage.getItem('items'));
  if(!itemData){
    axios
    .get('https://uematsu-backend.herokuapp.com/items')
    .then((res)=>{
       localStorage.removeItem('items');
       localStorage.setItem('items', JSON.stringify(res.data));
    })
    .catch((error)=>{
       console.log(error);
    })
  }
  let options = [];
  if(itemData){
    itemData.forEach(item=>{
      options.push({value: item.name, label: item.name});
    })
  }
  return options;
  
}