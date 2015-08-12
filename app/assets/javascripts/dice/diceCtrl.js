fark.controller('DiceCtrl', [
'$scope',
'dice',
function($scope, dice){
  // adds the dice.factory to this controller 
  $scope.dice = dice.dice;
 // sets the score to 0
  $scope.score = 0;
  // sets the round points to 0
  $scope.round = 0
  // sets the submitted dice to empty
  $scope.submitted = []
  // sets beginning number of dice to 6
  $scope.diceRemaining = 6
  
  $scope.addDie = dice.addDie;
  
  // gets image string from dice face number
  $scope.getImage = dice.getImage;
  
  // move to factory?
  var rollDice = function() {
    for (y = 0, $scope.dice = []; y < $scope.diceRemaining; y++) {
      $scope.dice.push({id: y + 1, face: Math.floor(Math.random() * 6) + 1})
    }
  }
  
  // var scoreTheseDice = dice.scoreTheseDice($scope.submitted)
  
  // scores submitted dice
  $scope.scoreDice = function() {
    // iterates through all JS dice objects and if they are checked (held)
    // adds them to the $scope.submitted array (as their face value)
    for (y = 0, $scope.submitted = []; y < $scope.dice.length; y++) {
      if ($scope.dice[y].held === true) {
        $scope.submitted.push($scope.dice[y].face)
      }
    }
    // if there are submitted dice
    if ($scope.submitted.length > 0) {
      // sends the dice face array to the dice.factory
      dice.scoreTheseDice($scope.submitted)
        .then(function(data) {
          // $promise is the score of the dice face values submitted
          $scope.score = data.data
        })
    } else {
      // if no dice submitted, score is 0
      $scope.score = 0
    }
  }
  
  // TODO SRP this!
  // submit selected dice, score and roll remaining dice again
  $scope.scoreAndRoll = function() {
    // adds newly scored dice to accumulated round score
    $scope.round = $scope.round + $scope.score
    // resets $scope.score(immediate score for dice) to 0
    $scope.score = 0
    // removes submitted dice from total rolled dice
    $scope.diceRemaining = $scope.diceRemaining - $scope.submitted.length
    // resets submitted dice
    $scope.submitted = []
    // if all dice have been submitted and scored then gives the player 6 new
    if ($scope.diceRemaining == 0) {
      $scope.diceRemaining = 6
    }
    // rolls them
    rollDice();
  }


}])