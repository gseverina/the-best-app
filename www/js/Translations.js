(function() {
  'use strict';

  angular.module('Translations', [])
    .constant('Translations', {
      //English
      translationsEN: {
        HEADLINE: 'HI!',
        SEARCH: 'Search',
        GO:'Go!',
        ANSWER_THIS: 'Answer this while we get you to The Best',
        WHAT_IS_THE_BEST: 'What is The Best',
        MAIN : {
          TITLE: 'The Best:'
        }
      },
      //Spanish
      translationsES: {
        HEADLINE: 'HOLA!',
        SEARCH: 'Buscar',
        GO:'Ir!',
        ANSWER_THIS: 'Responde ésto mientras buscamos The Best:',
        WHAT_IS_THE_BEST: 'Cuál es The Best',
        MAIN : {
          TITLE: 'El Mejor:'
        }
      }
    });

})();
