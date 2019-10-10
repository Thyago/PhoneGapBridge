'use strict';

WebBridge.registerPlugin("pushNotification", {
  _onDeviceReady: function() {
    var push = PushNotification.init({
      android: {
        senderID: WebBridge._settings.push_sender_id,
        forceShow: true
      },
      ios: {
        alert: "true",
        badge: true,
        sound: 'false',
        gcmSandbox: true
      },
      windows: {}
    });

    push.on('registration', function (data) {
      var oldRegId = localStorage.getItem('registrationId');
      if (oldRegId !== data.registrationId) {
        localStorage.setItem('registrationId', data.registrationId);
      }
      WebBridge._postBack("pushNotification", "onRegistration", [data]);
    });
    push.on('notification', function (data) {
      WebBridge._postBack("pushNotification", "onNotification", [data]);
    });
    push.on('error', function (e) {
      WebBridge._postBack("pushNotification", "onError", [e.message]);
    });
  },
  getRegistrationId: function() {
    var plugin = "pushNotification";
    var action = "getRegistrationId";
    WebBridge._postBack(plugin, action, [String(localStorage.getItem('registrationId'))]);
  }
}, function () {
  return PushNotification && PushNotification.init ? true : false;
});