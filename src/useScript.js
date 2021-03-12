import { useEffect } from "react";


const useScript = url =>{
   useEffect(()=>{
     const orderArea = document.getElementById('payform')
     const script = document.createElement('script');
     script.src = "https://checkout.pay.jp";
     script.dataset.key = process.env.REACT_APP_PAYJP_API_KEY;
     script.className ="payjp-button";
     script.dataset.partial=true;
     if(orderArea){
      orderArea.appendChild(script);
      return () => {
       orderArea.removeChild(script);
       }
     }
    else{

    }
   },[url])
}
export default useScript;