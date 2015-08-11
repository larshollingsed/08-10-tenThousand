fark.factory('dice', ['$http', function($http) {
  var x = {
    dice: [
      {id: 1, face: Math.floor(Math.random() * 6)+ 1, held: false, image: null},
      {id: 2, face: Math.floor(Math.random() * 6)+ 1, held: false, image: null},
      {id: 3, face: Math.floor(Math.random() * 6)+ 1, held: false, image: null},
      {id: 4, face: Math.floor(Math.random() * 6)+ 1, held: false, image: null},
      {id: 5, face: Math.floor(Math.random() * 6)+ 1, held: false, image: null},
      {id: 6, face: Math.floor(Math.random() * 6)+ 1, held: false, image: null}
    ],
    submitted: [],
    score: 0
  };
  
  x.addDie = function() {
    x.dice.push({cube: "new", face: Math.floor(Math.random() * 6) + 1});
  }
  
  // x.score = function (dice) {
  //   return $http.post('/angular_score', {submitted: dice}).success(function(data){
  //     x.dice;
  //   })
  // }
  return x;
}])
