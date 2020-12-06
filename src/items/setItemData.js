export const getitemData = ()=>{
  let item = []
  let datas = JSON.parse(localStorage.getItem('items'));
  datas.forEach((data)=>{
    if(data.id === props.id){
     item.push(data);
    }
  });
  return item
 }
 export const getOption = ()=>{
   return [
    { value: '刺身', label: '刺身' },
    { value: '切り身', label: '切り身' },
    { value: '煮物用', label: '煮物用' },
    { value: '塩焼き用', label: '塩焼き用' },
    { value: 'フライ用', label: 'フライ用' },
    { value: '刺身/切り身', label: '刺身/切り身' },
   ];
 }