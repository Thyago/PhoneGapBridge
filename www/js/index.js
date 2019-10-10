WebBridge.init('iframe', {
  default_url: 'http://www.voluptor.com/protomono',
  push_sender_id: "<YOUR SENDER ID>"
});

document.addEventListener('deviceready', function() {
  if (window.cache)
    window.cache.clear();

  var parentElement = document.getElementById('deviceready');
  var listeningElement = parentElement.querySelector('.listening');
  var receivedElement = parentElement.querySelector('.received');

  listeningElement.setAttribute('style', 'display:none;');
  receivedElement.setAttribute('style', 'display:block;');
}, false);

document.getElementById('iframe').onload = function() {
  //proto.base.splash.hide();
  document.getElementById('splash').remove();//.fadeOut("fast", function() { $(this).remove(); $('#iframe').fadeIn("fast"); });
  document.getElementById('iframe').style.display = "block";
};





//Event handlers
/*deviceready
 pause
 resume
 backbutton
 menubutton
 searchbutton
 startcallbutton
 endcallbutton
 volumedownbutton
 volumeupbutton

 navigator

 get available plugins
 Battery Status (event)
 Camera navigator + event
 Contacts (navigator)
 Device device
 Device Motion (navigator.accelerometer)
 Device Orientation (navigator.compass)
 Dialogs (navigator.notification)
 File (resolveLocalFileSystemURL)
 FileTransfer (FileTransfer())
 Geolocation (navigator)
 Inappbrowser (cordova.InAppBrowser.open())
 Media (Media())
 Media Capture (navigator.device.capture)
 Network Information (navigator.connection.type)
 Splash Screen (navigator.splashscreen)
 Vibrations (navigator.vibrate)
 StatusBar (StatusBar())
 Whitelist (config.xml to allow where can be navigated to)*/
