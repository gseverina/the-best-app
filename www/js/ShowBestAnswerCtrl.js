(function() {
  'use strict';

  angular
    .module('ShowBestAnswerCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('ShowBestAnswerCtrl', ShowBestAnswerCtrl);

  function ShowBestAnswerCtrl($state, $ionicLoading, TheBestSvc, UserDataSvc) {

    var vm = this;
    vm.user_question = "";
    vm.best_answer = "";

    vm.askAgain = function() {
      $state.go('app.main');
    };

    vm.agree = function() {

    };

    vm.nah = function () {

    };

    activate();

    ////

    function activate() {
      vm.best_answer = UserDataSvc.get('best_answer');
      vm.user_question = UserDataSvc.get('user_question');
      if(!vm.best_answer || !vm.user_question) {
        $state.go('app.main');
      }
    }
  }


})();
