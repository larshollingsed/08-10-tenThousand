fark.factory('players', ['$http', function($http) {
  var x = {
    players: []
  };
  
  x.changeNumber = function(number) {

    for (y = 0; y < number; y++) {
      x.players.push({id: null, name: null, round: 0, total: 0})
    }
  }
  
  x.create = function (new_players) {
    return $http.post('/create_players', {new_players: new_players}).success(function(data){
      return data
    })
  }
  
  
  return x
  
}])