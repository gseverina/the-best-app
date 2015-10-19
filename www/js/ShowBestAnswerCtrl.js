(function() {
  'use strict';

  angular
    .module('ShowBestAnswerCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('ShowBestAnswerCtrl', ShowBestAnswerCtrl);

  function ShowBestAnswerCtrl($state, $ionicLoading, TheBestSvc, UserDataSvc) {

    var vm = this;
    vm.question = "";
    vm.best_answer = "";

    vm.askAgain = function() {
      $state.go('app.main');
    };

    activate();

    ////

    function activate() {
      vm.best_answer = UserDataSvc.get('best_answer');
      vm.question = UserDataSvc.get('user_question');
    }
  }


})();
