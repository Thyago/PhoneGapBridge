<?php $pageTitle = 'Camera Plugin' ?>
<?php include_once('inc/_header.php') ?>

  <div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
    <div class="demo-options mdl-card mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop">
      <div class="mdl-card__title mdl-color--blue-300">
        <h2 class="mdl-card__title-text">Camera</h2>
      </div>
      <div class="mdl-card__supporting-text mdl-color-text--blue-grey-100">
        <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-color--grey-100 act-picture disabled" href="#" data-picture-element="#picture" data-upgraded=",MaterialButton,MaterialRipple">Obter foto<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a>
        <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-color--grey-100 act-picture-library disabled" href="#" data-picture-element="#picture" data-upgraded=",MaterialButton,MaterialRipple">Abrir biblioteca<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a><br>
        <hr>
        <div id="picture"></div>
      </div>
    </div>
  </div>


<?php require('inc/_footer.php'); ?>