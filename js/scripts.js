// Generates Ping Pong game list (as an array) up to given limit
// Returns null if non-positive-integer is passed in
function executePingPong(countLimit) {
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

function executePongPing(countLimit) {
  return executePingPong(countLimit).reverse();
}

function executePrimePong(countLimit) {
  if (/[^\d]/.test(countLimit) || countLimit < 1) {
    return null;
  }
  var output = [];
  for (var i = 1; i <= countLimit; i++) {
    output.push(i);
  }

  // Sieve of Eratosthenes
  // Set to 0 => composite
  output[0] = 0;
  for (var i = 0; i < output.length; i++) {
    if (output[i] !== 0) {
      var currentPrime = output[i];
      for (var j = i + 1; j < output.length; j++) {
        if (output[j] % currentPrime === 0) {
          output[j] = 0;
        }
      }
    }
  }

  var primeCounter = 0;
  for (var i = 0; i < output.length; i++) {
    if (output[i] === 0) {
      output[i] = i + 1;
    }
    else {
      output[i] = "prime";
      primeCounter++;
      if (primeCounter % 3 === 0 && primeCounter % 5 === 0) {
        output[i] += " ping-pong"
      }
      else if (primeCounter % 3 === 0) {
        output[i] += " ping";
      }
      else if (primeCounter % 5 === 0) {
        output[i] += " pong";
      }
    }
  }

  return output;
}


// Builds output html to display to user using game results
function buildGameOutput(list) {
  var output = "";
  list.forEach(function(item) {
    output += '<div class="output-item well"><p>' + item + '</p></div>';
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
  var selectedGameMode = "";
  $(".game-modes-buttons button[name=ping-pong]").click(function() {
    if (selectedGameMode !== "ping-pong") {
      selectedGameMode = "ping-pong";
      showGameRules("#ping-pong-description");
    }
  });
  $(".game-modes-buttons button[name=prime-pong]").click(function() {
    if (selectedGameMode !== "prime-pong") {
      selectedGameMode = "prime-pong";
      showGameRules("#prime-pong-description");
    }
  });
  $(".game-modes-buttons button[name=pong-ping]").click(function() {
    if (selectedGameMode !== "pong-ping") {
      selectedGameMode = "pong-ping";
      showGameRules("#pong-ping-description");
    }
  });

  // Main game execute
  $("#game-control form").submit(function(event) {
    event.preventDefault();
    var countLimit = $("#game-control input[name=count-limit]").val();
    var gameResult = null;

    if (selectedGameMode === "ping-pong") {
      gameResult = executePingPong(countLimit);
      $("#game-output-header").text("-- Ping Pong Engaged --");
    }
    else if (selectedGameMode === "prime-pong") {
      gameResult = executePrimePong(countLimit);
      $("#game-output-header").text("-- Prime Pong Engaged --");
    }
    else if (selectedGameMode === "pong-ping") {
      gameResult = executePongPing(countLimit);
      $("#game-output-header").text("-- Engaged Pong Ping --");
    }
    else {
    $("#game-output-header").text("-- Please Select a Game Mode --");
    }

    if (gameResult !== null) {
      $("#game-output-numbers").empty();
      var htmlOutput = buildGameOutput(gameResult);
      $("#game-output-numbers").append(htmlOutput);
      $("#game-output").show();
      $('html, body').animate({
        scrollTop: $("#game-control").offset().top
      }, 500);
    }
    else {
      $("#game-output").hide();
    }
  });
});
