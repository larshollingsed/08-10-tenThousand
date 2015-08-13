fark.controller('PlayerCtrl', [
  '$scope',
  '$scope',
  'players',
  'dice',
  function($scope, $scope, players, dice) {
    $scope.players = players.players;
    $scope.turn = 0;
    $scope.playerTurn = $scope.players[$scope.turn];
    
    $scope.playerNumber = function() {
      players.changeNumber($scope.numberOfPlayers);
    }
    
    $scope.endTurn = function() {
      $scope.playerTurn.total = $scope.playerTurn.total + $scope.round + $scope.score;
      playerSelector();
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
    
    
    //supposed to add another blank field on newgame when at end of players TODO
    // $scope.change = function(){
        
    //   var count = $scope.players.length,
    //   valid = 0;
    //
    //   $scope.players.forEach(function(value){
    //     if (value.text){
    //       valid++;
    //     }
    //   });
    //
    //   if (valid == count){
    //     $scope.players.push({text:''});
    //   }
    // }
                
    $scope.createPlayers = function() {
      players.create($scope.players)
      .then(function(data) {
        $scope.players = data.data
      })
    }
    
    var playerSelector = function() {
      $scope.turn = $scope.turn + 1;
      if ($scope.turn == $scope.players.length) {
        $scope.turn = 0;
      }
      $scope.playerTurn = $scope.players[$scope.turn];
    }
    
  }])