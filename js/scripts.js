// Generates Ping Pong game list (as an array) up to given limit
// Returns null if non-positive-integer is passed in
function pingPong(countLimit) {
  if (/[^\d]/.test(countLimit) || countLimit < 1) {
    return null;
  }
  var output = [];
  for (var i = 1; i <= countLimit; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      output.push("ping-pong");
    }
    else if (i % 3 === 0) {
      output.push("ping");
    }
    else if (i % 5 === 0) {
      output.push("pong");
    }
    else {
      output.push(i);
    }
  }
  return output;
}


// Builds output html to display to user using game results
function buildGameOutput(list) {
  var output = "";
  list.forEach(function(item) {
    output += '<li>' + item + '</li>';
  });
  return output;
}

// Shows the rules for the chosen game and hides all others
function showGameRules(gameId) {
  $(".game-description").slideUp();
  $(gameId).slideDown();
}

$(document).ready(function() {
  // Game select buttons
  $(".game-buttons button[name=ping-pong]").click(function() {
    showGameRules("#ping-pong-description");
  })
  $(".game-buttons button[name=prime-pong]").click(function() {
    showGameRules("#prime-pong-description");
  })






  // Main game execute
  $("#game-control form").submit(function(event) {
    event.preventDefault();
    var countLimit = $("#game-control input[name=count-limit]").val();
    var pingPongList = pingPong(countLimit);

    $("#game-output ul").empty();
    if (pingPongList !== null) {
      var output = buildGameOutput(pingPongList);
      $("#game-output ul").append(output);
      $("#game-output").show();
    }
    else {
      $("#game-output").hide();
    }
  });
});
