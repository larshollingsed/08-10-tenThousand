fark.factory('players', ['$http', function($http) {
  var x = {
    players: [],
    totalPoints: 10000
  };
  
  // adds blank player objects to players.players
  x.changeNumber = function(number) {
    for (y = 0; y < number; y++) {
      x.players.push({id: null, name: null, order: 0, total: 0})
    }
  }
  
  // sorts the players by total score and returns the name of the winner
  x.winner = function() {
    var winners = x.players.sort(function(a, b) {
      return b.total - a.total
    })
    return winners[0].name
  }
  
  return x
  
}])