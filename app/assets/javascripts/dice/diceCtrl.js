fark.controller('DiceCtrl', [
'$scope',
'dice',
'$http',
function($scope, dice, $http){
  $scope.dice = dice.dice;
  $scope.score = 0;
  $scope.submitted = []
  
  $scope.addDie = dice.addDie;
  
  $scope.getImage = function(face) {
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
  
  $scope.rollDice = function() {
    for (y = 0, $scope.dice = []; y < $scope.number; y++) {
      $scope.dice.push({id: y + 1, face: Math.floor(Math.random() * 6) + 1})
    }
  }
  
  $scope.scoreDice = function() {
    for (y = 0, $scope.submitted = []; y < $scope.dice.length; y++) {
      if ($scope.dice[y].held === true) {
        $scope.submitted.push($scope.dice[y].face)
      }
    }
    if ($scope.submitted.length > 0) {
      scoreTheseDice()
    } else {
      $scope.score = 0
    }
  }

  // move to factory
  var scoreTheseDice = function () {
    return $http.post('/potential_score', {submitted: $scope.submitted}).success(function(data){
      $scope.score = data
    })
  }
}])