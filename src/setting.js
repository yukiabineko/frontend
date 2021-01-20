
export const timeSetting = (baseData)=>{
   let date = new Date(baseData);
   let hour = date.getHours();
   let min = date.getMinutes();
   return hour + ":" + min;
}