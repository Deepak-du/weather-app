$(document).ready(function () {

        let lat;
        let long;
    
        if (navigator.geolocation) {
    
            navigator.geolocation.getCurrentPosition(function (position) {
    
                lat = position.coords.latitude;
                long = position.coords.longitude;
    
                const api = `{https://fcc-weather-api.glitch.me/api/current?lat=' + ${lat}&lon=${long}`};
    
                $.getJSON(api, function (res) {
    
                    let celsius = res.main.temp;
                    let fahrenheit = (celsius * 1.8) + 32;
    
                    let location = res.name;
                    
    
    
                    $('.weather-location').html(location);
                    $('.temp').html(Math.floor(celsius));
                    $('.weather-description').html(res.weather[0].description);
                    $('.weatherType').attr('id', res.weather[0].main);
                    $('.row2').on('click', function () {
                        if ($('.temp').html() == (Math.floor(celsius))) {
                            $('.temp').html(Math.floor(fahrenheit));
                            $('.temp-type').html('°F');
    
                        } else {
                            $('.temp').html(Math.floor(celsius));
                            $('.temp-type').html('°C');
                        }
                    });
    
    
                    //SETTING UP THE ICON 
                    let icons = new Skycons({
                        "color": "white"
                    });
                    
                    const weatherIcons = [
                        {
                            name: "Clear",
                            weather: Skycons.CLEAR_DAY
                        },
                        {
                            name: "Clear-night",
                            weather: Skycons.CLEAR_NIGHT
                        },
                        {
                            name: "Partly-cloudy-day",
                            weather: Skycons.PARTLY_CLOUDY_DAY
                        },
                        {
                            name: "Partly-cloudy-night",
                            weather: Skycons.PARTLY_CLOUDY_NIGHT
                        },
                        {
                            name: "Clouds",
                            weather: Skycons.CLOUDY
                        },
                        {
                            name: "Rain",
                            weather: Skycons.RAIN
                        },
                        {
                            name: "Sleet",
                            weather: Skycons.SLEET
                        },
                        {
                            name: "Snow",
                            weather: Skycons.SNOW
                        },
                        {
                            name: "Wind",
                            weather: Skycons.WIND
                        },
                        {
                            name: "Fog",
                            weather: Skycons.FOG
                        },
                    ]


                    for(const icon of weatherIcons) {
                        const { name,weather } = icon
                        icons.set(name,weather)
                    }
                    icons.play()
                    
                
            });
        }
    });