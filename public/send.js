document.getElementById('paybt').addEventListener('click', function(){
    let token = document.querySelector('input[type="hidden"]').value;
    axios.post('https://uematsu-backend.herokuapp.com/orders/pay',{test:"pay!", payjpToken: token}).then((res)=>{
        alert(res.data.message);
    }).catch(()=>{
  })
  $('#modal1').modal("hide");
})

