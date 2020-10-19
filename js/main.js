var url =
  'https://api.weatherapi.com/v1/current.json?key=364cecae259c437fb96105745203006&q=';
var lat, long, currentURL;

$(document).ready(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  } else {
    alert(
      'It seems like Geolocation, which is required for this page, is not enabled in your browser.'
    );
  }
});

function successFunction(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  currentURL = url + lat + ',' + long;

  getData(currentURL);
}

function errorFunction(position) {
  document.getElementById("AlertMessage").classList.remove('hidden')
  //alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Or you have blocked the geolocalication on this page.');
}

function getData(rurl) {
  var info;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', rurl);
  xhr.onload = () => {
    if (xhr.status === 200) {
      info = JSON.parse(xhr.responseText);
      generateHTMl(info);
    }
  };
  xhr.send();
}

function generateHTMl(data) {
  $('.city').text(data.location.name);
  $('.country').text(data.location.country);
  $('#icon1').attr('src', data.current.condition.icon);
  $('.temp').text(data.current.temp_c);
  $('.weather-description').text(data.current.condition.text);
  $('.weatherType').css('opacity', '1');
}

function click() {
  var curCity = document.querySelector('.location').value;
  document.querySelector('.location').value = '';
  document.querySelector('.location').focus();

  currentURL = url + curCity;
  getData(currentURL);
}

$('.btn').click(click);
document.addEventListener('keypress', function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    click();
  }
});
