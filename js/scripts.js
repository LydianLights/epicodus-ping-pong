$(document).ready(function() {
  $("#game-settings form").submit(function(event) {
    event.preventDefault();
    var countLimit = $("#game-settings input[name=count-limit]").val();
    var output = countLimit;

    $("#game-output li").text(output);
    $("#game-output").show();
  });
});
