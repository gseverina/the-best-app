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
      vm.show('voting...');
      TheBestSvc.postAction('VOTE', vm.user_question, vm.best_answer)
        .then(postActionSuccess, postActionFail)
        .finally(function(){
          vm.hide();
          $state.go('app.main');
        });
    };

    vm.nah = function () {
      $state.go('app.main');
    };

    vm.show = function($template) {
      $ionicLoading.show({
        template: $template
      });
    };

    vm.hide = function(){
      $ionicLoading.hide();
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

    function postActionSuccess(res) {
      console.log("postActionSuccess: ", res);
    }

    function postActionFail(res) {
      console.log("postActionFail: ", res);
    }
  }


})();
