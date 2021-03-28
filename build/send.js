function modalclose(){
  $('.js-modal').hide();
}

document.getElementById('paybt').addEventListener('click', function(){
    let token = document.querySelector('input[type="hidden"]').value;
    let data = JSON.parse(localStorage.getItem('pay'));
    data["payjpToken"] = token;
    
    axios.post('https://uematsu-backend.herokuapp.com/orders/pay',data).then((res)=>{
        alert(res.data.message);
        $('.js-modal').hide();
    }).catch(()=>{
  })
})
document.getElementById("modal-back").addEventListener('click',function(){
  $('.js-modal').hide();
});
