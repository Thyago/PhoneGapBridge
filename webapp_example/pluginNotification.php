<?php $pageTitle = 'Notification Plugin' ?>
<?php include_once('inc/_header.php') ?>

  <div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
    <div class="demo-options mdl-card mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop">
      <div class="mdl-card__title mdl-color--blue-300">
        <h2 class="mdl-card__title-text">Vibration</h2>
      </div>
      <div class="mdl-card__supporting-text mdl-color-text--blue-grey-100">

        <input type="number" value="1000" class="mdl-textfield__input" id="vibrate-time" placeholder="Ex: 2000"/>
        <br>
        <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-color--grey-100 act-vibrate disabled" href="#" data-upgraded=",MaterialButton,MaterialRipple">Vibrar
          1x<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a>
        <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-color--grey-100 act-vibrate disabled" data-repeat="3" href="#" data-upgraded=",MaterialButton,MaterialRipple">Vibrar
          3x<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a>
        <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-color--grey-100 act-vibrate-stop disabled" href="#" data-upgraded=",MaterialButton,MaterialRipple">Parar<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a>

      </div>
    </div>
  </div>

  <div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
    <div class="demo-options mdl-card mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop">
      <div class="mdl-card__title mdl-color--blue-300">
        <h2 class="mdl-card__title-text">Beep</h2>
      </div>
      <div class="mdl-card__supporting-text mdl-color-text--blue-grey-100">
        <input type="number" value="2" class="mdl-textfield__input" id="beep-times" placeholder="Ex: 2"/>
        <br>
        <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-color--grey-100 act-beep disabled" href="#" data-upgraded=",MaterialButton,MaterialRipple">Beep<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a>
      </div>
    </div>
  </div>

  <div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
    <div class="demo-options mdl-card mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop">
      <div class="mdl-card__title mdl-color--blue-300">
        <h2 class="mdl-card__title-text">Alert and Confirm</h2>
      </div>
      <div class="mdl-card__supporting-text mdl-color-text--blue-grey-100">
        <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-color--grey-100 act-alert disabled" href="#" data-upgraded=",MaterialButton,MaterialRipple">Alert<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a>
        <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-color--grey-100 act-confirm disabled" href="#" data-upgraded=",MaterialButton,MaterialRipple">Confirm<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a>
      </div>
    </div>
  </div>

<?php require('inc/_footer.php'); ?>