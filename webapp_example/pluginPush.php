<?php
$result = null;
if ($_POST["title"] && $_POST["message"] && $_POST['registration_id']) {
  // API access key from Google API's Console
  define( 'API_ACCESS_KEY', 'AIzaSyAVxKEVSghKY2X1uWWu9nsMmpHk3SkJ7Zs' );
  $registrationIds = array( $_POST['registration_id'] );
  // prep the bundle
  $msg = array
  (
    'message' 	=> $_POST['title'],
    'title'		=> $_POST['message'],
    'pageId'  => 'notifications',
    //'subtitle'	=> 'This is a subtitle. subtitle',
    //'tickerText'	=> 'Ticker text here...Ticker text here...Ticker text here',
    'vibrate'	=> 1,
    'sound'		=> 1,
    'largeIcon'	=> 'large_icon',
    'smallIcon'	=> 'small_icon'
  );
  $fields = array
  (
    'registration_ids' 	=> $registrationIds,
    'collapse_key' => 'score_update',
    'priority'  => 'high',
    'data'			=> $msg
    //'to'        => 'gcm-device-token'
  );

  $headers = array
  (
    'Authorization: key=' . API_ACCESS_KEY,
    'Content-Type: application/json'
  );

  $ch = curl_init();
  curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
  curl_setopt( $ch,CURLOPT_POST, true );
  curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
  curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
  curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
  curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
  $result = json_decode(curl_exec($ch), true);
  curl_close( $ch );
}
?>


<?php $pageTitle = 'Push Notifications Plugin' ?>
<?php include_once('inc/_header.php') ?>

  <div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
    <div class="demo-options mdl-card mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop">
      <div class="mdl-card__title mdl-color--blue-300">
        <h2 class="mdl-card__title-text">Create Push Notification</h2>
      </div>
      <div class="mdl-card__supporting-text mdl-color-text--blue-grey-100">
        <form method="post" action="pluginPush.php" class="push-form">
          <input type="hidden" name="registration_id" />
          <input type="text" class="mdl-textfield__input" name="title" value="Push Title"/><br>
          <input type="text" class="mdl-textfield__input" name="message" value="Push Message"/><br>
          <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-color--grey-100 act-push-send disabled" href="#" data-upgraded=",MaterialButton,MaterialRipple">Send<span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></a>
        </form>
      </div>
    </div>
  </div>


<?php if ($result): ?>
  <?php if (isset($result['success']) && $result['success']): ?>
  <script type="text/javascript">
    $(document).ready(function() {
      WMBWeb.notification.alert("Message <?php echo $result['success'] ? 'success' : 'failed' ?>!");
    });
  </script>
  <?php else: ?>
    <?php echo var_dump($result) ?>
  <?php endif ?>
<?php endif ?>

<?php require('inc/_footer.php'); ?>