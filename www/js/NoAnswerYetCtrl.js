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
      TheBestSvc.postNewQuestion(vm.newQuestion)
        .then(postNewQuestionSuccess, postNewQuestionFail);
    };

    activate();

    ///

    function activate() {
      vm.user_question = UserDataSvc.get("user_question");
      vm.title1 = "Good one! you are the first to ask for the best " + vm.user_question;
      vm.title2 = "We'll let you know when we have an answer.";
      vm.title3 = "Ask your friends to get the answer quicker!";
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
