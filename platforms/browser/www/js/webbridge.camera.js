'use strict';

WebBridge.registerPlugin("camera", {
  getPicture: function(cameraOptions) {
    var plugin = "camera";
    var action = "getPicture";

    if (!cameraOptions.destinationType)
      cameraOptions.destinationType = Camera.DestinationType.DATA_URL;

    navigator.camera.getPicture(function (imageData) {
      WebBridge._postBack(plugin, action, [imageData, null]);
    }, function (message) {
      WebBridge._postBack(plugin, action, [null, message]);
    }, cameraOptions);
  },
  cleanup: function() {
    var plugin = "camera";
    var action = "cleanup";
    navigator.camera.cleanup(function () {
      WebBridge._postBack(plugin, action, [true]);
    }, function (message) {
      WebBridge._postBack(plugin, action, [false, message]);
    });
  }
}, function() {
  return navigator && navigator.camera;
});