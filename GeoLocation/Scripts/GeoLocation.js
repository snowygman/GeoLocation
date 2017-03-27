/// <reference path="jquery-3.1.1.js" />
var watchId = 0;
var options = { enableHighAccuracy: true };

$(document).ready(function () {
    $('#startMonitoring').on('click', getLocation2);
    $('#stopMonitoring').on('click', endWatch);
});

function getLocation2()
{
    if("geolocation" in navigator)
    {
        watchId = navigator.geolocation.getCurrentPosition(showPosition,showError,options);
    }
    else
    {
        alert("browser not compatible");
    }

}

function endWatch()
{
    if(watchId != 0)
    {
        navigator.geolocation.clearWatch(watchId);
        watchId = 0;
        showMessage("I'm done spying on you. Muhahahahahahaha!");
    }

}
function supportsGeolocation() {
    //alert('checking support for gloc');
    return 'geolocation' in navigator;
}

function showMessage(message) {
    $('#message').html(message);
}
function getLocation()
{
    alert('checking support for gloc');
    if (supportsGeoLocation()) {
        alert('Geolocation is supported');
        navigator.geolocation.getCurrentPosition(showPosition);
        //grabs position if browser supports gLoc
    }
    else {
        alert('GEO ie not supported.');
        showMessage("Geolocation is not supported by this browser.");
    }
}
function showErrorX(failure) {
    if (failure.message.indexOf("Only secure origins are allowed") == 0) {
        alert('Only secure origins are allowed by your browser.');
    }
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            showMessge("User denied Geolocation access request.");
            break;
        case error.POSITION_UNAVAILABLE:
            showMessage("Location information unavailable.");
            break;
        case error.TIMEOUT:
            showMessage("Get user location request timed out.");
            break;
        case error.UNKNOWN_ERROR:
            showMessage("An unknown error occurred.");
            break;
    }
}
function showPosition(position) {
    var datetime = new Date(position.timestamp).toLocaleString();
    showMessage("Latitude: " + position.coords.latitude + "<br />"
    + "Longitude: " + position.coords.longitude + "<br />"
    + "Timestamp: " + datetime);
    //showMessage(position.coords.heading + position.coords.latitude);
}

