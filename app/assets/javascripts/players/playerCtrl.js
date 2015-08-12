fark.controller('PlayerCtrl', [
  '$scope',
  'players',
  function($scope, players) {
    $scope.players = players.players
    
    $scope.playerNumber = function() {
      players.changeNumber($scope.numberOfPlayers);
    }
    
    $scope.change = function(){
        
      var count = $scope.players.length,
      valid = 0;
        
      $scope.players.forEach(function(value){
        if (value.text){
          valid++;      
        }                
      });
        
      if (valid == count){
        $scope.players.push({text:''});
      }
    }
                
    $scope.createPlayers = function() {
      players.create($scope.players)
      .then(function(data) {
        $scope.players = data.data
      })
    }
    $scope.playersInThisGame = $scope.players.length
    
    var playerSelector = function() {
      
    }
    //   var player_names = []
    //   for (x = 0; x < $scope.players.length; x++) {
    //     player_names.push($scope.players[x]);
    //   }
    //   players.create(player_names);
    // }
    
  }])