fark.controller('PlayerCtrl', [
  '$scope',
  '$rootScope',
  'players',
  'dice',
  function($scope, $rootScope, players, dice) {
    $scope.players = players.players;
    $scope.turn = 0;
    $scope.playerTurn = $scope.players[$scope.turn];
    
    $scope.playerNumber = function() {
      players.changeNumber($scope.numberOfPlayers);
    }
    
    $scope.endTurn = function() {
      $scope.playerTurn.total = $scope.playerTurn.total + $scope.round + $scope.score;
      playerSelector();
      $scope.diceRemaining = 6;
    }
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
    $scope.playersInThisGame = $scope.players.length
    
    
    
    var playerSelector = function() {
      $scope.turn = $scope.turn + 1;
      if ($scope.turn == $scope.players.length) {
        $scope.turn = 0;
      }
      $scope.playerTurn = $scope.players[$scope.turn];
    }
    //   var player_names = []
    //   for (x = 0; x < $scope.players.length; x++) {
    //     player_names.push($scope.players[x]);
    //   }
    //   players.create(player_names);
    // }
    
  }])