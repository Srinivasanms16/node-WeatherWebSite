

const weatherform = document.querySelector('form');

const search = document.getElementById('serchterm');

const wp = document.getElementById('winfo');

weatherform.addEventListener('submit',(event)=>{
  event.preventDefault();
  $.get( "http://localhost:3000/weather?address="+search.value, function( data ) {
    wp.textContent=data.Weather_Description;
    fadd.textContent = data.full_address
  });
})
