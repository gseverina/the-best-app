(function() {
  'use strict';

  angular
    .module('AskForAnswerCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('AskForAnswerCtrl', AskForAnswerCtrl);

  function AskForAnswerCtrl($state, TheBestSvc, UserDataSvc) {

    var vm = this;

    activate();

    ////

    function activate($state) {
      var question = UserDataSvc.get("app.askForAnswer:question");
      vm.title = "Answer this while we get you to the best " + question;

      TheBestSvc.getQuestion(question)
        .then(getQuestionSuccess, getQuestionFail);
    }

    function getQuestionSuccess(res) {
      console.log("success", res);
      console.log("item: ",res.data.item);
    }

    function getQuestionFail() {
      console.log("fail", res);
    }

  }

}());

