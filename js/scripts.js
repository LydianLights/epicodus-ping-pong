// Generates Ping Pong game list up to given limit
// Returns null if non-positive-integer is passed in
function pingPong(countLimit) {
  if (/[^\d]/.test(countLimit) || countLimit < 1) {
    return null;
  }

  return countLimit;
}







$(document).ready(function() {
  $("#game-settings form").submit(function(event) {
    event.preventDefault();
    var countLimit = $("#game-settings input[name=count-limit]").val();
    var output = pingPong(countLimit);

    if (output !== null) {
      $("#game-output li").text(output);
      $("#game-output").show();
    }
    else {
      $("#game-output").hide();
    }
  });
});
