fark.controller('DiceCtrl', [
'$scope',
'dice',
'$http',
function($scope, dice, $http){
  $scope.dice = dice.dice;
  $scope.score = 0;
  $scope.submitted = []
  
  $scope.addDie = dice.addDie;
  
  $scope.getImage = dice.getImage;
  
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