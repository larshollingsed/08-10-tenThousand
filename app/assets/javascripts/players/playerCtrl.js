fark.controller('PlayerCtrl', [
  '$scope',
  'players',
  'dice',
  function($scope, players, dice) {
    // gets list of players from factory
    $scope.players = players.players;
    // starts turn at the beginning of players
    $scope.turn = 0;
    // sets the player object to $scope.turn
    $scope.playerTurn = $scope.players[$scope.turn];
    // sets endgame to false
    $scope.endgame = false;
    // sets endgame total points
    $scope.totalPoints = players.totalPoints;
    
    // allows user to set number of players
    $scope.playerNumber = function() {
      players.changeNumber($scope.numberOfPlayers);
    }
    
    // ends a player's turn
    $scope.endTurn = function() {
      // adds the accumulated scores to the player's total
      $scope.playerTurn.total += $scope.round + $scope.score;
      // checks to see if the player has exceeded the endgame total points
      if ($scope.playerTurn.total >= $scope.totalPoints) {
        // if so, sends endgame to true and alerts the remaining players
        $scope.endgame = true;
        alert("Final round!")
      }
      // advances to next player
      playerSelector();
      // resets the round
      $scope.resetRoll();
    }
    
    // randomizes player order
    $scope.randomizePlayers = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain players to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining player...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current player.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }
                
    $scope.createPlayers = function() {
      players.create($scope.players)
      .then(function(data) {
        $scope.players = data.data
      })
    }
    
    // gets the winner's name from the factory
    $scope.playerWinner = players.winner;
    
    // advances to the next player
    var playerSelector = function() {
      // adds one to the current turn
      $scope.turn++
      // checks to see if it's the last player in the rotation
      if ($scope.turn == $scope.players.length) {
        // if no player has met the endgame points, starts the rotation over
        if ($scope.endgame == false) {
          $scope.turn = 0;
          // if it is the end of the rotation and a player has accumulated the
          // endgame points, declares a winner
        } else if ($scope.endgame == true) {
          var winner = players.winner()
          alert(winner + " has won the game!!")
        }  
      }
      // uses the turn number to choose the player object
      $scope.playerTurn = $scope.players[$scope.turn];
    }
    
  }])