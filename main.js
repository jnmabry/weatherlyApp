var darkskyRequest = {
    url: "https://api.darksky.net/forecast/ed7be92607845014ac1b22c8b2dcb545/37.8267,-122.4233",
    dataType: "jsonp",
    success: darksky_Complete
};


var geocodeRequest = {
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=41164&key=AIzaSyA2Q8skYQhVnVaDlSx_L-VEXFvl-dd1e-Q",
    dataType: "json",
    success: geocode_Complete
};

function darksky_Complete(result) {
    console.log(result.currently.summary);
    var hour1 = result.hourly.data[0];
    var time = new Date(hour1.time * 1000);
    console.log("Time: " + time.toLocaleString());
}

function geocode_Complete(results) {
    console.log(results.results[0].geometry.location.lat);
    console.log(results.results[0].geometry.location.lat);
}

// Test Section for Handling Geocode Zip
function geoUserInput() {
    var zipCode = $("#submit").val();
  
    var geocodeRequest = {
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=41164&key=AIzaSyA2Q8skYQhVnVaDlSx_L-VEXFvl-dd1e-Q",
    dataType: "json",
    success: geocode_Complete
};


}

$(function(){
    $.ajax(geocodeRequest);
    $.ajax(darkskyRequest);
    $("#submit").on("click", geoUserInput);
});