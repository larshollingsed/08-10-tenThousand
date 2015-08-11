var fark = angular.module('farkle', ['templates', 'ui.router'])

fark.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('game', {
      url: '/game',
      templateUrl: 'game/_game.html',
      controller: 'DiceCtrl'
    })

  $urlRouterProvider.otherwise('game');
}])

fark.controller('DiceCtrl', [
'$scope',
'dice',
'$http',
function($scope, dice, $http){
  $scope.dice = dice.dice;
  $scope.score = 0;
  $scope.submitted = []
  
  $scope.addDie = dice.addDie;
  
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
    scoreTheseDice()
  }

  // move to factory
  var scoreTheseDice = function () {
    return $http.post('/angular_score', {submitted: $scope.submitted}).success(function(data){
      $scope.score = data
    })
  }
}])


// Math.floor(Math.random() * 6) + 1