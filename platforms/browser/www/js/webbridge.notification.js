'use strict';

WebBridge.registerPlugin("notification", {
  alert: function(message, title, buttonName) {
    var plugin = "notification";
    var action = "alert";
    navigator.notification.alert(message, function() {
      WebBridge._postBack(plugin, action, []);
    }, title, buttonName);
  },
  confirm: function(message, title, buttonLabels) {
    var plugin = "notification";
    var action = "confirm";
    navigator.notification.confirm(message, function(buttonIndex) {
      WebBridge._postBack(plugin, action, [buttonIndex]);
    }, title, buttonLabels);
  }
}, function () {
  return navigator && navigator.notification;
});