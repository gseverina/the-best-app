(function() {
  'use strict';

  angular.module('Translations', [])
    .constant('Translations', {
      //English
      translationsEN: {
        HEADLINE: 'HI!',
        MAIN : {
          TITLE: 'The best:'
        }
      },
      //Spanish
      translationsES: {
        HEADLINE: 'HOLA!',
        MAIN : {
          TITLE: 'El mejor:'
        }
      }
    });

})();

