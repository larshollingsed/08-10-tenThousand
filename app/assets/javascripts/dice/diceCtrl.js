fark.controller('DiceCtrl', [
'$scope',
'dice',
function($scope, dice){
  $scope.dice = dice.dice;
  $scope.score = 0;
  $scope.round = 0
  $scope.submitted = []
  $scope.diceRemaining = 6
  
  $scope.addDie = dice.addDie;
  
  $scope.getImage = dice.getImage;
  
  var rollDice = function() {
    for (y = 0, $scope.dice = []; y < $scope.diceRemaining; y++) {
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
  
  
  $scope.scoreAndRoll = function() {
    $scope.round = $scope.round + $scope.score
    $scope.score = 0
    $scope.diceRemaining = $scope.diceRemaining - $scope.submitted.length
    $scope.submitted = []
    rollDice();
  }


}])