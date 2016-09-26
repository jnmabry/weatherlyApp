// Created Panel Template // 



// function displayTemplate(data) {


// var templateHTML = '<div class ="row">';

// templateHTML += '<div class="col-md-4 col-xs-12 col-sm-6 card">';
// templateHTML += '<div class="thumbnail">';
// templateHTML += '<h1 class="text-center">'+ Olive Hill, KY +'</h1>';
// templateHTML += '<h3 class="text-center">'+ Friday, September 21 +'</h3>';
// templateHTML += '<h2 class="text-center">'+ 91&deg; +'</h2>';
// templateHTML += '<div class="caption text-center">';
// templateHTML += '<span class="wi wi-umbrella"><h3>'+ 50% + '</h3></span>';
// templateHTML += '<span class="wi wi-thermometer"><h3>' + 91&deg;+ '</h3></span>';
// templateHTML += '<span class="wi wi-thermometer-exterior"><h3>' + 85&deg; +'</h3></span>';
// templateHTML += '</div>';
// templateHTML += '</div>';
// templateHTML += '</div>';

// $('#topRow').html(templateHTML)

// }



var city =  0;
var state = 0;


// API Requests //


function geoCodeRequest(zipCode){

    var geoCodeRequest = {

        url: "https://maps.googleapis.com/maps/api/geocode/json?address="+ zipCode +"&key=AIzaSyA2Q8skYQhVnVaDlSx_L-VEXFvl-dd1e-Q",
        dataType: "json",
        success: geocode_Complete
    };

    $.ajax(geoCodeRequest);

    console.log("Made it to geoCodeRequest post");
}


// Completed Functions // 

function darksky_Complete(geocode_Complete) {

    var temp = geocode_Complete.currently.temperature;
    temp = Math.round(temp);
    var maxTemp = geocode_Complete.daily.data[0].temperatureMax;
    maxTemp = Math.round(maxTemp);
    var minTemp = geocode_Complete.daily.data[0].temperatureMin;
    minTemp = Math.round(minTemp);
    var precip = geocode_Complete.daily.data[0].precipProbability;

    
    var hour1 = geocode_Complete.hourly.data[0];
    var time = new Date(hour1.time * 1000);
    time = time.toLocaleString();

    console.log("Time: " + time.toLocaleString());
    console.log("Made it to Dark Sky Complete");

    var templateHTML = '<div class="col-md-4 col-xs-12 col-sm-6 card">';
    templateHTML += '<span class="glyphicon glyphicon-minus-sign pull-right" id="remove"></span>';
    templateHTML += '<div class="thumbnail">';
    templateHTML += '<h1 class="text-center">'+ city + ',' + state + '</h1>';
    templateHTML += '<h3 class="text-center">'+ time +'</h3>';
    templateHTML += '<h2 class="text-center">'+ temp + '&deg;'+'</h2>';
    templateHTML += '<div class="caption text-center">';
    templateHTML += '<span class="wi wi-umbrella"><h3>'+ precip + '</h3></span>';
    templateHTML += '<span class="wi wi-thermometer"><h3>' + maxTemp + '&deg;'+ '</h3></span>';
    templateHTML += '<span class="wi wi-thermometer-exterior"><h3>' + minTemp + '&deg;' +'</h3></span>';
    templateHTML += '</div>';
    templateHTML += '</div>';
    templateHTML += '</div>';

    $('#topRow').append(templateHTML);

    $("body").on("click", "#remove", function(){
        $(this).parent().remove();
    });

    
}

    function removeCard (){
        console.log("Remove worked!");
        $(this).parent().remove();
    }

function geocode_Complete(geoCodeRequest) {

    console.log("Made It to geocode_Complete");
   
    console.log(geoCodeRequest.results[0].geometry.location.lat);
    console.log(geoCodeRequest.results[0].geometry.location.lng);
    console.log(geoCodeRequest.results[0].address_components[1].long_name);
    console.log(geoCodeRequest.results[0].address_components[2].short_name);

    var lat = geoCodeRequest.results[0].geometry.location.lat;
    var long = geoCodeRequest.results[0].geometry.location.lng;
    city = geoCodeRequest.results[0].address_components[1].long_name;
    state = geoCodeRequest.results[0].address_components[2].short_name;

    var darkskyRequest = {
    url: "https://api.darksky.net/forecast/ed7be92607845014ac1b22c8b2dcb545/" + lat + "," + long,
    dataType: "jsonp",
    success: darksky_Complete
 };
    $.ajax(darkskyRequest);
}


// Remove Card from Body


// Sends zip after user input
function geoUserInput() {
    var zipCode = $("#zipCode").val();
    console.log(zipCode);
    if(zipCode != 0) {
        geoCodeRequest(zipCode);
    } else {
        console.log("Not ZERO");
    }
}


$(function(){

    $("#submit").on("click", geoUserInput);
    $("#zipSubmit").on("click", geoUserInput);


});
