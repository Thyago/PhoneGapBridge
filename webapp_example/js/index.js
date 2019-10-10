//Evento disparado quando o plugin estiver ativo
$(document).on('onWMBLoad', function (event) {
  refreshControls();
});

$(document).on('click', '.act-picture', function () {
  if (WMBWeb && WMBWeb.hasOwnProperty('camera')) {
    WMBWeb.camera.getPicture(function (src) {
        $("#picture").html('<img src="' + src + '" style="max-width:100%; max-height: 100%"/>');
      }, function (error) {
        alert('Failed to get picture: ' + error);
      }, {
        quality: 75,
        targetWidth: 640,
        targetHeight: 640
      }
    );
  }
});

$(document).on('click', '.act-picture-library', function () {
  if (WMBWeb && WMBWeb.camera) {
    WMBWeb.camera.getPicture(function (src) {
        $("#picture").html('<img src="' + src + '" />');
      }, function (error) {
        alert('Failed to get picture: ' + error);
      }, {
        sourceType: 0,
        quality: 75,
        targetWidth: 250,
        targetHeight: 250
      }
    );
  }
});

$(document).on('click', '.act-vibrate', function (e) {
  if (WMBWeb && WMBWeb.notification) {
    if ($(this).data('repeat')) {
      var vibTime = parseInt($('#vibrate-time').val());
      var repeat = parseInt($(this).data('repeat'));
      var pattern = [vibTime];
      for (var i = 2; i <= repeat; i += 2) {
        pattern.push(vibTime); //wait
        pattern.push(vibTime); //vibrate
      }
      WMBWeb.notification.vibrate(pattern);
    } else {
      WMBWeb.notification.vibrate(parseInt($('#vibrate-time').val()));
    }
  }
  e.preventDefault();
});

$(document).on('click', '.act-beep', function (e) {
  if (WMBWeb && WMBWeb.notification) {
    var beepTimes = parseInt($('#beep-time').val());
    WMBWeb.notification.beep(beepTimes);
  }
  e.preventDefault();
});

$(document).on('click', '.act-vibrate-stop', function (e) {
  if (WMBWeb && WMBWeb.notification) {
    WMBWeb.notification.vibrate(0);
  }
  e.preventDefault();
});

$(document).on('click', '.act-alert', function (e) {
  if (WMBWeb && WMBWeb.notification) {
    WMBWeb.notification.alert("This is an alert", function() {
      alert("Alert dismissed");
    })
  }
  e.preventDefault();
});

$(document).on('click', '.act-confirm', function (e) {
  if (WMBWeb && WMBWeb.notification) {
    WMBWeb.notification.confirm("This is a confirmation", function(buttonIndex) {
      alert("The button " + buttonIndex + " was pressed");
    }, "Confirmation", ["Button 1", "Button 2"]);
  }
  e.preventDefault();
});

$(document).on('click', '.act-push-send', function(e) {
  $(this).closest('form').trigger('submit');
  e.preventDefault();
});

$(document).on('submit', '.push-form', function(e) {
  var $this = $(this);
  e.preventDefault();
  e.stopPropagation();
  if (WMBWeb && WMBWeb.pushNotification) {
    WMBWeb.pushNotification.getRegistrationId(function (registration_id) {
      if (registration_id) {
        $this.find('input[name="registration_id"]').val(registration_id);
        $.ajax($this.attr('action'), {
          type: $this.attr('method'),
          data: $this.serialize(),
          success: function (data, textStatus, jqXHR) {
            $('#content').html(data);
          }
        });
      } else {
        alert("Failed to register");
      }
    });
  }
});

// Abrir links externos no browser
$(document).on('click', 'a[target="_blank"]:not([href="#"])', function (e) {
  if (WMBWeb && WMBWeb.hasOwnProperty('app')) {
    e.preventDefault();
    WMBWeb.app.loadExternalUrl($(this).attr('href'))
  }
});

$(document).on('click', 'a:not([href="#"]):not([target="_blank"])', function(e) {
  e.preventDefault();
  $.ajax($(this).attr('href'), {
    success: function(data, textStatus, jqXHR) {
      var $content = $('#content');
      $content.html(data);
      refreshControls($content);
    }
  });
  $('.demo-layout .demo-drawer.is-visible, .demo-layout .mdl-layout__obfuscator.is-visible').removeClass('is-visible');
});

function refreshControls($container) {
  if (!$container)
    $container = $('body');

  if (WMBWeb && WMBWeb.hasOwnProperty('camera'))
    $container.find('.act-picture.disabled, .act-picture-library.disabled').removeClass('disabled');
  else
    $container.find('.act-picture:not(.disabled), .act-picture-library:not(.disabled)').addClass('disabled');


  if (WMBWeb && WMBWeb.hasOwnProperty('notification'))
    $container.find('.act-vibrate.disabled, .act-vibrate-stop.disabled, .act-beep.disabled, .act-alert.disabled, .act-confirm.disabled').removeClass('disabled');
  else
    $container.find('.act-vibrate:not(.disabled), .act-vibrate-stop:not(.disabled), .act-beep:not(.disabled), .act-alert:not(.disabled), .act-confirm:not(.disabled)').addClass('disabled');

  if (WMBWeb && WMBWeb.hasOwnProperty('pushNotification'))
    $container.find('.act-push-send.disabled').removeClass('disabled');
  else
    $container.find('.act-push-send:not(disabled)').addClass('disabled');
}