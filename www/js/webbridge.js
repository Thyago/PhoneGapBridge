'use_strict';

var WebBridge = (function() {
  var webBridge = {
    _settings: {
      default_url: null,
      push_sender_id: null
    },
    _iframeEl: null,
    _isInit: false,
    _isDeviceReady: false,
    _isIframeLoaded: false,
    _registeredPluginChecker: {}, //List of registered plugin scripts and their availability checker callback function
    _availablePlugins: [], //Registered plugins that are available

    init: function(iframe_id, settings) {
      this._iframeEl = document.getElementById(iframe_id);
      for (var attrname in settings) {
        if (this._settings[attrname] !== undefined) {
          this._settings[attrname] = settings[attrname];
        }
      }

      if (!this._isInit) {
        this._bindEvents();
        this._isInit = true;
      }

      this._iframeEl.src = this._settings.default_url;
    },

    _bindEvents: function() {
      var that = this;

      //On iframe load
      webBridge._iframeEl.addEventListener("load", function listener(e) {
        window.removeEventListener('load', listener, false);
        that._isIframeLoaded = true;
        if (that._isDeviceReady) { //Trigger is device ready message
          that.app.deviceReady();
        }
      }, false);

      document.addEventListener('deviceready', function () {
        for (var plugin in that._registeredPluginChecker) {
          if (that._registeredPluginChecker[plugin]()) {
            that._availablePlugins.push(plugin);
            if (that[plugin]._onDeviceReady)
              that[plugin]._onDeviceReady();
          }
        }
        that._isDeviceReady = true;
        if (that._isIframeLoaded) { //Trigger is device ready message
          that.app.deviceReady();
        }
      }, false);

      window.addEventListener("message", function (event) {
        //Dont allow calling a private function
        if (event.data.plugin.lastIndexOf('_', 0) === 0 || event.data.action.lastIndexOf('_', 0) === 0)
          return;

        //if (event.origin == url) {
        if (that[event.data.plugin] && that[event.data.plugin][event.data.action]) {
          that[event.data.plugin][event.data.action].apply(null, event.data.params);
        }
        else if (navigator[event.data.plugin] && navigator[event.data.plugin][event.data.action]) {
          navigator[event.data.plugin][event.data.action].apply(null, event.data.params);
        }
        else
          that._postBack(event.data.plugin, event.data.action, null, 'Unavailable.');
      }, false);
    },

    _postBack: function(plugin, action, params, error) {
      var options = {plugin: plugin, action: action, params: params};
      if (error)
        options.error = error;
      this._iframeEl.contentWindow.postMessage(options, this._settings.default_url);
    },

    registerPlugin: function(plugin, data, isAvailableCallback) {
      if (!this[plugin]) {
        this[plugin] = data;
        this._registeredPluginChecker[plugin] = isAvailableCallback;
        if (this._isDeviceReady && data._onDeviceReady) {
          data._onDeviceReady();
        }
      }
    }
  };

  webBridge.registerPlugin("app", {
    deviceReady: function() {
      var plugin = "app";
      var action = "deviceReady";
      if (webBridge._isDeviceReady && webBridge._isIframeLoaded) {
        webBridge._postBack(plugin, action, [webBridge._availablePlugins]);
      }
    }
  }, function() {
    return true;
  });

  return webBridge;
}());