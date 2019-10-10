'use strict';

/**
 * WMBWeb Notification plugin
 */
WMBWeb.registerPlugin('notification', {
  /**
   * See http://docs.phonegap.com/en/2.2.0/cordova_notification_notification.md.html#notification.alert
   * @param message
   * @param alertCallback
   * @param title
   * @param buttonLabel
   */
  alert: function (message, alertCallback, title, buttonLabel) {
    this.wmb._getMessage("notification", "alert", function () {
      if (alertCallback)
        alertCallback();
    });
    this.wmb._postMessage("notification", "alert", [message, title ? title : null, buttonLabel ? buttonLabel : null]);
  },

  /**
   * See http://docs.phonegap.com/en/2.2.0/cordova_notification_notification.md.html#notification.confirm
   * @param message
   * @param confirmCallback with buttonIndex parameter
   * @param title
   * @param buttonLabels
   */
  confirm: function (message, confirmCallback, title, buttonLabels) {
    this.wmb._getMessage("notification", "confirm", function (buttonIndex) {
      if (confirmCallback)
        confirmCallback(buttonIndex);
    });
    this.wmb._postMessage("notification", "confirm", [message, title ? title : null, buttonLabels ? buttonLabels : null]);
  },

  /**
   * See http://docs.phonegap.com/en/2.2.0/cordova_notification_notification.md.html#notification.beep
   * @param times
   */
  beep: function (times) {
    this.wmb._postMessage("notification", "beep", [times]);
  },

  /**
   * See http://docs.phonegap.com/en/edge/cordova_notification_notification.md.html#notification.vibrate and https://github.com/apache/cordova-plugin-vibration
   * @param milliseconds
   */
  vibrate: function (milliseconds) {
    this.wmb._postMessage("notification", "vibrate", [milliseconds]);
  }
});