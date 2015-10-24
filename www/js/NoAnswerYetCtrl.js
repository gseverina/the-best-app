(function() {
  'use strict';

  angular
    .module('NoAnswerYetCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('NoAnswerYetCtrl', NoAnswerYetCtrl);

  function NoAnswerYetCtrl ($state, TheBestSvc, UserDataSvc, $cordovaSocialSharing) {

    var vm = this;
    vm.user_querstion = "";

    vm.askYourFriends = function() {
      var message = "I have a question for you, what is The Best " + vm.user_question + " ?";
      var subject = "The Best";
      var file = null;
      var link = "http://TheBest.com/answer?q=" + vm.user_question;
      $cordovaSocialSharing.share(message, subject, file, link);
    };

    vm.askAgain = function() {
      $state.go('app.main');
    };

    vm.postNewQuestion = function() {
      TheBestSvc.postNewQuestion(vm.user_question)
        .then(postNewQuestionSuccess, postNewQuestionFail);
    };

    vm.askForBetterAnswer = function () {
      $state.go('app.askForBetterAnswer');
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
