<?php require('inc/_header.php') ?>

  <div class="row">
    <div class="col-md-6">
      <h2>Notification</h2>
      <p>Vibration:</p>
      <div class="input-group">
        <input type="number" value="1000" class="form-control" id="vibrate-time" placeholder="Ex: 2000"/>
        <span class="input-group-btn">
          <button type="button" class="btn btn-primary act-vibrate disabled" role="button">Vibrar 1x</button>
        </span>
        <span class="input-group-btn">
          <button type="button" class="btn btn-primary act-vibrate disabled" data-repeat="5" role="button">Vibrar 5x</button>
        </span>
        <span class="input-group-btn">
          <button type="button" class="btn btn-primary act-vibrate-stop disabled" role="button">Parar</button>
        </span>
      </div>
    </div>
    <div class="col-md-6">
      <p>Beep:</p>
      <div class="input-group">
        <input type="number" value="2" class="form-control" id="beep-times" placeholder="Ex: 2"/>
        <span class="input-group-btn">
          <button type="button" class="btn btn-primary act-beep disabled" role="button">Beep</button>
        </span>
      </div>
    </div>
    <div class="col-md-6">
      <p>Alert and Confirm:</p>
      <div class="input-group">
        <span class="input-group-btn">
          <button type="button" class="btn btn-primary act-vibrate disabled" role="button">Vibrar 1x</button>
        </span>
        <span class="input-group-btn">
          <button type="button" class="btn btn-primary act-vibrate disabled" data-repeat="5" role="button">Vibrar 5x</button>
        </span>
        <span class="input-group-btn">
          <button type="button" class="btn btn-primary act-vibrate-stop disabled" role="button">Parar</button>
        </span>
      </div>
    </div>
  </div>

<?php require('inc/_footer.php'); ?>