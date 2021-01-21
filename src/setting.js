
export const timeSetting = (baseData)=>{
   let date = new Date(baseData);
   let hour = date.getHours();
   let min = date.getMinutes();
   return hour + ":" + toDoubleDigits(min);
}
const toDoubleDigits = function(num) {
   num += "";
   if (num.length === 1) {
     num = "0" + num;
   }
  return num;     
} 