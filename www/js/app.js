'use strict';

//Making sure String.format is properly implemented
String.prototype.format = function() {
  var formatted = this;
  for( var arg in arguments ) {
    formatted = formatted.replace("{" + arg + "}", arguments[arg]);
  }
  return formatted;
};

function handleOpenURL(url) {
  console.log("received url: " + url);


  var injector = angular.element(document.getElementById('main')).injector();
  injector.invoke(['$rootScope',
    function($rootScope) {
      window.localStorage.setItem("external_load", url);
      $rootScope.$broadcast('external_load', url);
    }
  ]);

}

angular
  .module('TheBest', [
    'ionic',
    'ionic.service.core',
    'ionic.service.analytics',
    'ngCordova',
    'pascalprecht.translate',
    'Translations',
    'BootstrapCtrl',
    'AppCtrl',
    'MainCtrl',
    'AskForAnswerCtrl',
    'NoAnswerYetCtrl',
    'ThanksForAnswerCtrl',
    'ShowBestAnswerCtrl',
    'AskForBetterAnswerCtrl',
    'QSuggestionsCtrl'
  ])

  .run(function($ionicPlatform, $rootScope, $state, $ionicAnalytics, UserDataSvc) {
    $ionicPlatform.ready(function() {

      $ionicAnalytics.register();

      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

      var device = ionic.Platform.device();
      if(device) {
        UserDataSvc.put('device_id', device.uuid);
      } else {
        UserDataSvc.put('device_id', 'undefined');
      }

      $rootScope.$on('external_load', function(url){
        $state.go('bootstrap');
      });
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider, Translations) {

    $ionicConfigProvider.views.maxCache( 0 );

    $stateProvider

    .state('bootstrap', {
      url: '/',
      templateUrl: 'templates/bootstrap.html',
      controller: 'BootstrapCtrl as vm'
    })

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
      url: '/askForAnswer?user_question',
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
      url: '/showBestAnswer?user_question',
      views: {
        'menuContent': {
          templateUrl: 'templates/showBestAnswer.html',
          controller: 'ShowBestAnswerCtrl as vm'
        }
      }
    })

    .state('app.askForBetterAnswer', {
      url: '/askForBetterAnswer',
      views: {
        'menuContent': {
          templateUrl: 'templates/askForBetterAnswer.html',
          controller: 'AskForBetterAnswerCtrl as vm'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

    //angular-translate configurations
    $translateProvider
      .translations('en', Translations.translationsEN)
      .translations('es', Translations.translationsES)
      .useSanitizeValueStrategy('sanitize')
      .preferredLanguage(navigator.language.substr(0,2))
      .fallbackLanguage('en')
    ;
  });
