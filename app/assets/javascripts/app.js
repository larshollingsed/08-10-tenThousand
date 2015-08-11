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

    $stateProvider.state('newGame', {
        url: '/newgame',
        templateUrl: 'game/_newgame.html',
        controller: 'PlayerCtrl'
    })

  $urlRouterProvider.otherwise('game');
}])




// Math.floor(Math.random() * 6) + 1