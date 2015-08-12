fark.controller('DiceCtrl', [
'$scope',
'$rootScope',
'dice',
  'players',
function($scope, $rootScope, dice, players){
  // adds the dice.factory to this controller 
  $scope.dice = dice.dice;
 // sets the score to 0
  $scope.score = 0;
  // sets the round points to 0
  $rootScope.round = 0
  // sets the submitted dice to empty
  $rootScope.submitted = []
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
    for (y = 0, $rootScope.submitted = []; y < $scope.dice.length; y++) {
      if ($scope.dice[y].held === true) {
        $rootScope.submitted.push($scope.dice[y].face)
      }
    }
    // if there are submitted dice
    if ($rootScope.submitted.length > 0) {
      // sends the dice face array to the dice.factory
      dice.scoreTheseDice($rootScope.submitted)
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
    $rootScope.round = $rootScope.round + $scope.score
    // resets $scope.score(immediate score for dice) to 0
    $scope.score = 0
    // removes submitted dice from total rolled dice
    $scope.diceRemaining = $scope.diceRemaining - $rootScope.submitted.length
    // resets submitted dice
    $rootScope.submitted = []
    // if all dice have been submitted and scored then gives the player 6 new
    if ($scope.diceRemaining == 0) {
      $scope.diceRemaining = 6
    }
    // rolls them
    rollDice();
  }


}])