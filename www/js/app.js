'use strict';

angular
  .module('TheBest', [
    'ionic',
    'ngCordova',
    'pascalprecht.translate',
    'Translations',
    'AppCtrl',
    'MainCtrl',
    'AskForAnswerCtrl',
    'NoAnswerYetCtrl',
    'ThanksForAnswerCtrl',
    'ShowBestAnswerCtrl',
    'QSuggestionsCtrl'
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider, Translations) {

    $ionicConfigProvider.views.maxCache( 0 );

    $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl as vm'
    })

    .state('app.main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'MainCtrl as vm'
        }
      }
    })

    .state('app.askForAnswer', {
      url: '/askForAnswer',
      views: {
        'menuContent': {
          templateUrl: 'templates/askForAnswer.html',
          controller: 'AskForAnswerCtrl as vm'
        }
      }
    })

    .state('app.noAnswerYet', {
      url: '/noAnswerYet',
      views: {
        'menuContent': {
          templateUrl: 'templates/noAnswerYet.html',
          controller: 'NoAnswerYetCtrl as vm'
        }
      }
    })

    .state('app.thanksForAnswer', {
    url: '/thanksForAnswer',
    views: {
      'menuContent': {
        templateUrl: 'templates/thanksForAnswer.html',
        controller: 'ThanksForAnswerCtrl as vm'
      }
    }
    })

    .state('app.showBestAnswer', {
      url: '/showBestAnswer',
      views: {
        'menuContent': {
          templateUrl: 'templates/showBestAnswer.html',
          controller: 'ShowBestAnswerCtrl as vm'
        }
      }
    })

      .state('app.result', {
      url: '/result',
      views: {
        'menuContent': {
          templateUrl: 'templates/result.html',
          controller: 'QSuggestionsCtrl as vm'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/main');

    //angular-translate configurations
    $translateProvider
      .translations('en', Translations.translationsEN)
      .translations('es', Translations.translationsES)
      .useSanitizeValueStrategy('sanitize')
      .preferredLanguage('en');
  });


