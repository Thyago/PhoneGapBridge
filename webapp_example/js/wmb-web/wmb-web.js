'use strict';

/**
 * Web-Mobile Bridge Plugin - Web Module - Ponte de acesso as funções nativas de app PhoneGap
 * @version v1.0
 * @author Thyago Teixeira Clemente - thyagotc[at]gmail[dot]com
 */
var WMBWeb = (function() {
  var wmbWeb = {
    _isDeviceReady: false, //Flag para identificar se o dispositivo já está disponível para solicitações
    _pluginQueue: {}, //Fila de plugins a serem verificados quando o dispositivo estiver disponível
    _availableWebPlugins: [], //Plugins inicializados e disponíveis pra web
    _availableMobilePlugins: [], //Plugins disponíveis no dispositivo
    _origin: "file://", //Origem das mensagens Window.postMessage

    /**
     * Envio de mensagem ao modulo mobile
     * @param plugin string (Nome do plugin)
     * @param action string (Nome da ação a ser executada)
     * @param params array (Parâmetros da ação)
     * @private
     */
    _postMessage: function(plugin, action, params) {
      var messageParts = {plugin: plugin, action: action};
      if (params)
        messageParts.params = params;

      window.parent.postMessage(messageParts, this._origin);
    },

    /**
     * Aguarda por uma mansagem do modulo mobile
     * @param plugin string (Nome do plugin)
     * @param action string (Nome da ação a ser executada)
     * @param callback function (Função de retorno)
     * @private
     */
    _getMessage: function(plugin, action, callback) {
      var that = this;
      window.addEventListener('message', function listener(event) {
        //Ignorar mensagens sem plugin e action
        if (!event.data || !event.data.hasOwnProperty('plugin') || !event.data.hasOwnProperty('action')) {
          return;
        }

        //Ignorar mensagens que não sejam da origem esperada
        if (!event.origin || event.origin != that._origin) {
          return;
        }

        //Ignorar mensagens para metodos privados
        if (event.data.plugin.lastIndexOf('_', 0) === 0 || event.data.action.lastIndexOf('_', 0) === 0) {
          return;
        }

        if (event.data.plugin == plugin && event.data.action == action) {
          window.removeEventListener('message', listener, false);
          if (event.data.hasOwnProperty('error')) {
            alert("ERROR: " + event.data.error);
            console.log(event.data.error);
          }
          else  {
            if (callback) {
              callback.apply(null, event.data.params);
            }
          }
        }
      }, false);
    },

    /**
     * Inicialização executada quando o app mobile responde como pronto
     * @param availablePlugins array (Lista de plugins disponíveis no módulo mobile)
     * @private
     */
    _init: function (availableMobilePlugins) {
      this._availableMobilePlugins = availableMobilePlugins;
      this._isDeviceReady = true;

      //Registra os plugins disponíveis
      for (var plugin in this._pluginQueue) {
        this.registerPlugin(plugin, this._pluginQueue[plugin]);
      }
      this._pluginQueue = {};

      //Cria um evento de inicialização, notificando o app web sobre a disponibilidade de plugins no dispositivo
      var event; // The custom event that will be created
      var name = "onWMBLoad";
      if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(name, true, true);
      } else {
        event = document.createEventObject();
        event.eventType = name;
      }
      event.eventName = name;

      if (document.createEvent) {
        document.dispatchEvent(event);
      } else {
        document.fireEvent(event.eventType, event);
      }
    },

    /**
     * Registra um plugin WMB e o torna publico
     * @param plugin string (Nome do plugin)
     * @param data Object (Lógica do plugin)
     */
    registerPlugin: function(plugin, data) {
      if (!this.hasOwnProperty(plugin)) {
        if (this._isDeviceReady) { //Inicializa o plugin quando o dispositivo estiver pronto
          if (this._availableMobilePlugins.indexOf(plugin) >= 0) {
            this[plugin] = data;
            this[plugin].wmb = this;
            this[plugin].plugin = plugin;
            this._availableWebPlugins.push(plugin);
            if (data.hasOwnProperty('_onDeviceReady') && data._onDeviceReady)
              data._onDeviceReady();
          }
        }
        else { //Se o dispositivo não estiver pronto, guarda na fila
          this._pluginQueue[plugin] = data;
        }
      }
    }
  };

  //Adds the global functions that will act as plugin
  wmbWeb.global = {
    /**
     * Solicita informação de aviso quando o dispositivo móvel estiver disponível e retorna os plugins disponíveis
     * @param callback function (Função de retorno)
     * @private
     */
    isDeviceReady: function(callback) {
      //Se o documento pai não pertence a origem correta, não há conexão movel disponível
      try {
        if (window.parent.location.host != wmbWeb._origin)
          return;
      } catch (err) {
        //se ocorrer um erro, o documento pai é de outro dominio
      }

      try {
        wmbWeb._getMessage("global", "isDeviceReady", callback);
        wmbWeb._postMessage("global", "isDeviceReady");
      } catch (err) {
        //se ocorrer erro, a origem é diferente da esperada
      }
    }
  };

  //Registro do plugin base "app"
  wmbWeb.registerPlugin('app', {
    /**
     * Carrega uma url externa no navegador padrão
     * @param url string
     * @param options array
     * @returns {boolean}
     */
    loadExternalUrl: function (url, options) {
      if (options == undefined)
        options = {};
      options.openExternal = true;
      wmbWeb._postMessage("app", "loadUrl", [url, options]);
      return true;
    },

    /**
     * Carrega uma url
     * @param url string
     * @param options array
     * @returns {boolean}
     */
    loadUrl: function (url, options) {
      if (options == undefined)
        options = {};
      wmbWeb._postMessage("app", "loadUrl", [url, options]);
      return true;
    }
  });

  //Verifica se o dispositivo está disponível
  wmbWeb.global.isDeviceReady(function(availablePlugins) { wmbWeb._init(availablePlugins) });

  return wmbWeb;
}());