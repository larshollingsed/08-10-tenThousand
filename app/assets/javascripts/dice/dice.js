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
  
  x.getImage = function(face) {
    if (face === 1) {
      return "one.png";
    } else if (face === 2) {
      return "two.png";
    } else if (face === 3) {
      return "three.png";
    } else if (face === 4) {
      return "four.png";
    } else if (face === 5) {
      return "five.png";
    } else if (face === 6) {
      return "six.png";
    }
  }
  
  // x.score = function (dice) {
  //   return $http.post('/angular_score', {submitted: dice}).success(function(data){
  //     x.dice;
  //   })
  // }
  return x;
}])
