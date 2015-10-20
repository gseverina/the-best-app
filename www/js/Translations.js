(function() {
  'use strict';

  angular.module('Translations', [])
    .constant('Translations', {
      //English
      translationsEN: {
        HEADLINE: 'HI!',
        MAIN : {
          TITLE: 'The Best:'
        }
      },
      //Spanish
      translationsES: {
        HEADLINE: 'HOLA!',
        MAIN : {
          TITLE: 'El Mejor:'
        }
      }
    });

})();

