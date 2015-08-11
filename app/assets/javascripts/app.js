var fark = angular.module('farkle', ['templates', 'ui.router'])

fark.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('game', {
      url: '/game',
      templateUrl: 'game/_game.html',
      controller: 'DiceCtrl'
    })

  $urlRouterProvider.otherwise('game');
}])




// Math.floor(Math.random() * 6) + 1