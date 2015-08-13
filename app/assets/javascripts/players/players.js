fark.factory('players', ['$http', function($http) {
  var x = {
    players: []
  };
  
  x.changeNumber = function(number) {

    for (y = 0; y < number; y++) {
      x.players.push({id: null, name: null, order: 0, total: 0})
    }
  }
  
  x.winner = function() {
    var winners = x.players.sort(function(a, b) {
      return b.total - a.total
    })
    return winners[0].name
  }
  
  x.create = function (new_players) {
    return $http.post('/create_players', {new_players: new_players}).success(function(data){
      return data
    })
  }
  
  
  return x
  
}])