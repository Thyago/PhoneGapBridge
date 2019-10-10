'use strict';

/**
 * Phonegapbridge PushNotification plugin
 */
WMBWeb.registerPlugin("pushNotification", {
  getRegistrationId: function(callback) {
    this.wmb._getMessage("pushNotification", "getRegistrationId", callback);
    this.wmb._postMessage("pushNotification", "getRegistrationId");
  }
});