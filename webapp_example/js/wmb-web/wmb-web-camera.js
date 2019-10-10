'use strict';

/**
 * WMBWeb Camera plugin
 */
WMBWeb.registerPlugin("camera", {
  /**
   * See http://docs.phonegap.com/en/edge/cordova_camera_camera.md.html#camera.getPicture
   * @param callbackSuccess
   * @param callbackError
   * @param cameraOptions Check http://docs.phonegap.com/en/edge/cordova_camera_camera.md.html#cameraOptions
   */
  getPicture: function (callbackSuccess, callbackError, cameraOptions) {
    if (cameraOptions == undefined)
      cameraOptions = {};

    this.wmb._getMessage("camera", "getPicture", function (imageData, errorMessage) {
      if (imageData) {
        callbackSuccess("data:image/jpg;base64," + imageData);
      }
      else if (errorMessage) {
        callbackError(errorMessage);
      }
    });
    this.wmb._postMessage("camera", "getPicture", [cameraOptions]);
  },

  /**
   * See http://docs.phonegap.com/en/2.2.0/cordova_camera_camera.cleanup.md.html#camera.cleanup
   * @param callbackSuccess
   * @param callbackError
   */
  cleanup: function (callbackSuccess, callbackError) {
    this.wmb._getMessage("camera", "cleanup", function(isSuccess, errorMessage) {
      if (isSuccess && callbackSuccess)
        callbackSuccess();
      if (!isSuccess && callbackError)
        callbackError(errorMessage);
    });
    this.wmb._postMessage("camera", "cleanup", []);
  }
});