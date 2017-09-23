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
  var output = executePingPong(countLimit);
  if (output === null) {
    return output;
  }
  return output.reverse();
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
function showGameRules(gameID) {
  $(".game-description").slideUp();
  $(gameID).slideDown();
}

// Disallows use of the field where the user inputs their number
function disableNumberEntry() {
  $("#game-control input[name=count-limit]").attr("disabled", "disabled");
  $("#game-control input[name=count-limit]").attr("placeholder", "Select a game mode!");
  $("#game-control input[name=count-limit]").val("");
  $("#game-control button[type=submit]").attr("disabled", "disabled");
}

// Re-allows use of the field where the user inputs their number
function enableNumberEntry() {
  $("#game-control input[name=count-limit]").removeAttr("disabled");
  $("#game-control input[name=count-limit]").attr("placeholder", "Enter a number!");
  $("#game-control input[name=count-limit]").val("");
  $("#game-control button[type=submit]").removeAttr("disabled");
}

$(document).ready(function() {
  disableNumberEntry();
  // Game select buttons
  var selectedGameMode = "";
  var addGameModeButtonClickEvent = function(modeID) {
    $(".game-modes-buttons button[name=" + modeID + "]").click(function() {
      if (selectedGameMode !== modeID) {
        selectedGameMode = modeID;
        showGameRules("#" + modeID + "-description");
        enableNumberEntry();
      }
      $('html, body').animate({
        scrollTop: $("#game-settings").offset().top
      }, 500);
      $("#game-output").slideUp(500);
    });
  }

  addGameModeButtonClickEvent("ping-pong");
  addGameModeButtonClickEvent("pong-ping");
  addGameModeButtonClickEvent("prime-pong");

  // Main game execute
  $("#game-control form").submit(function(event) {
    event.preventDefault();
    var countLimit = $("#game-control input[name=count-limit]").val();
    var gameResult = null;

    // TODO: Refactor game execution and error checks to maybe be cleaner
    $("#game-output-numbers").empty();

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

    if (selectedGameMode === "") {
      // Should never actually be seen
      $("#game-output-header").text("-- Please Select a Game Mode --");
    }
    else if (gameResult === null) {
      $("#game-output-header").text("-- Please Enter a Proper Number! --");
    }
    else if (gameResult !== null) {
      var htmlOutput = buildGameOutput(gameResult);
      $("#game-output-numbers").append(htmlOutput);
    }

    $('html, body').animate({
      scrollTop: $("#game-control").offset().top
    }, 500);
    $("#game-output").show();
  });
});
