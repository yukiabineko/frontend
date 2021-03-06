function modalclose(){
  $('.js-modal').hide();
}

document.getElementById('paybt').addEventListener('click', function(){
    let token = document.querySelector('input[type="hidden"]').value;
    let data = JSON.parse(localStorage.getItem('pay'));
    data["payjpToken"] = token;
    
    axios.post('https://uematsu-backend.herokuapp.com/orders/pay',data).then((res)=>{
        alert(res.data.message);
        document.getElementById('modal-push').style.display = 'none';
        document.getElementById('pay_conf').style.display = 'block';
        $('.js-modal').hide();
    }).catch(()=>{
  })
  token.value = null;
  $('.js-modal').hide();
})
document.getElementById("modal-back").addEventListener('click',function(){
  $('.js-modal').hide();
});
