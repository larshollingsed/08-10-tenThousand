fark.controller('DiceCtrl', [
'$scope',
'$scope',
'dice',
  'players',
function($scope, $scope, dice, players){
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
  // gets image string from die face number
  $scope.getImage = dice.getImage;
  
  // move to factory?
  var rollDice = function() {
    for (y = 0, $scope.dice = []; y < $scope.diceRemaining; y++) {
      $scope.dice.push({id: y + 1, face: Math.floor(Math.random() * 6) + 1})
    }
  }
  
  var scorable = function() {
    var allDice = []
    for (y = 0; y < $scope.dice.length; y++) {
      allDice.push($scope.dice[y].face)
    }
     dice.scoreTheseDice(allDice)
      .then(function(data) {
        if (data.data == 0) {
          alert("unscorable! :(");
          $scope.round = 0;
          $scope.unscorable = true;
        }
      })
  }
  
  $scope.$watch('dice', function(newVal, oldVal) {
    scorable()
  })
  
  $scope.resetRoll = function() {
    $scope.dice = dice.rollDice(6);
    $scope.diceRemaining = 6;
    $scope.score = 0;
    $scope.round = 0;
    $scope.submitted = [];
  }
  
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
    $scope.dice = dice.rollDice($scope.diceRemaining)
  }


}])