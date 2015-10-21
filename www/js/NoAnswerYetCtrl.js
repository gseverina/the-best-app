(function() {
  'use strict';

  angular
    .module('NoAnswerYetCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('NoAnswerYetCtrl', NoAnswerYetCtrl);

  function NoAnswerYetCtrl ($state, TheBestSvc, UserDataSvc, $cordovaSocialSharing) {

    var vm = this;
    vm.user_querstion = "";

    vm.askYourFriends = function() {
      $cordovaSocialSharing.share('What is the best ' + vm.user_question + '?', 'The Best', null, 'http://www.thebest.com');
    };

    vm.askAgain = function() {
      $state.go('app.main');
    };

    vm.postNewQuestion = function() {
      TheBestSvc.postNewQuestion(vm.user_question)
        .then(postNewQuestionSuccess, postNewQuestionFail);
    };

    activate();

    ///

    function activate() {
      vm.user_question = UserDataSvc.get("user_question");
      if(!vm.user_question) {
        $state.go("app.main");
      }
      vm.postNewQuestion();
    }

    function postNewQuestionSuccess(res) {
      console.log("postNewQuestionSuccess:", res);
    }

    function postNewQuestionFail(res) {
      console.log("postNewQuestionFail:", res);
    }

  }

})();
