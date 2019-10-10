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

<?php require('inc/_header.php') ?>

<div class="row">
  <div class="col-md-6">
    <form method="post" action="pagePush.php" class="push-form">
      <h2>Push</h2>
      <div class="input-group">
        <input type="hidden" name="registration_id"/>
        <input type="text" name="title" placeholder="Push Title"/>
        <input type="text" name="message" placeholder="Push Message"/>
        <span class="input-group-btn">
          <button type="submit" class="btn btn-primary act-push-send disabled" role="button">Send</button>
        </span>
      </div>
    </form>
  </div>
</div>

  <?php if ($result): ?>
  <script type="text/javascript">
    $(document).ready(function() {
      WMBWeb.notification.alert("Message <?php echo $result['success'] ? 'success' : 'failed' ?>!");
    });
  </script>
  <?php endif ?>

<?php require('inc/_footer.php'); ?>