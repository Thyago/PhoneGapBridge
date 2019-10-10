<?php
if (!(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')):
?>
    </div>
  </main>
</div>
<script src="js/material.min.js"></script>

<script type="text/javascript" src="js/jquery-2.2.1.min.js"></script>

<script type="text/javascript" src="js/wmb-web/wmb-web.js"></script>

<script type="text/javascript" src="js/wmb-web/wmb-web-notification.js"></script>
<script type="text/javascript" src="js/wmb-web/wmb-web-camera.js"></script>
<script type="text/javascript" src="js/wmb-web/wmb-web-pushNotification.js"></script>

<script type="text/javascript" src="js/index.js"></script>

</body>
</html>
<?php else: ?>
<script type="text/javascript">
$(document).ready(function() {
  refreshControls();
});
</script>
<?php endif ?>