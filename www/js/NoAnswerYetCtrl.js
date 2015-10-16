(function() {
  'use strict';

  angular
    .module('NoAnswerYetCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('NoAnswerYetCtrl', NoAnswerYetCtrl);

  function NoAnswerYetCtrl ($state, TheBestSvc, UserDataSvc, $cordovaSocialSharing) {

    var vm = this;
    vm.newQuestion = "";

    vm.askYourFriends = function() {
      $cordovaSocialSharing.share('What is the best ' + vm.newQuestion + '?', 'The Best', null, 'http://www.thebest.com');
    };

    vm.askAgain = function() {
      $state.go('app.main');
    };

    vm.postNewQuestion = function() {
      TheBestSvc.postItem(vm.newQuestion, null)
        .then(postItemSuccess, postItemFail);
    };

    activate();

    ///

    function activate() {
      vm.newQuestion = UserDataSvc.get("app.noAnswerYet:newQuestion");
      vm.title1 = "Good one! you are the first to ask for the best " + vm.newQuestion;
      vm.title2 = "We'll let you know when we have an answer.";
      vm.title3 = "Ask your friends to get the answer quicker!";
      vm.postNewQuestion();
    }

    function postItemSuccess(res) {
      console.log("Post Item Success:", res);
    }

    function postItemFail(res) {
      console.log("Post Item Fail:", res);
    }

  }

}());
