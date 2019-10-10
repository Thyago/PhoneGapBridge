<?php require('inc/_header.php') ?>

  <div class="row">
    <div class="col-md-12">
      <h2>Camera</h2>
      <button class="btn btn-primary act-picture disabled" data-picture-element="#picture" href="#" role="button">Obter foto</button>
      <button class="btn btn-primary act-picture-library disabled" data-picture-element="#picture" href="#" role="button">Abrir biblioteca</button>
      <hr>
      <div id="picture" class="m-t-1 m-b-1" style="max-width: 250px; max-height: 250px; position: static; overflow: auto"></div>
    </div>
  </div>

<?php require('inc/_footer.php'); ?>