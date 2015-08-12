fark.factory('dice', ['$http', function($http) {
  // sets initial dice to 6 randoms
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
  
  x.rollDice = function(number) {
    x.dice.push({cube: "new", face: Math.floor(Math.random() * 6) + 1});
  }
  
  // gets image from asset pipeline based on randomly generated number
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
  
  // sends AJAX request to rails to check score for dice
  x.scoreTheseDice = function (submitted) {
    return $http.post('/potential_score', {submitted: submitted}).success(function(score){
      return score
    })
  }
  // x.score = function (dice) {
  //   return $http.post('/angular_score', {submitted: dice}).success(function(data){
  //     x.dice;
  //   })
  // }
  return x;
}])
