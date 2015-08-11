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
  
  // var scoreTheseDice = dice.scoreTheseDice($scope.submitted)
  
  $scope.scoreDice = function() {
    for (y = 0, $scope.submitted = []; y < $scope.dice.length; y++) {
      if ($scope.dice[y].held === true) {
        $scope.submitted.push($scope.dice[y].face)
      }
    }
    if ($scope.submitted.length > 0) {
      dice.scoreTheseDice($scope.submitted)
        .then(function(data) {
          $scope.score = data.data
        })
    } else {
      $scope.score = 0
    }
  }

  // move to factory

}])