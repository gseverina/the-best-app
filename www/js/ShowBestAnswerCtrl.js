(function() {
  'use strict';

  angular
    .module('ShowBestAnswerCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('ShowBestAnswerCtrl', ShowBestAnswerCtrl);

  function ShowBestAnswerCtrl($state, $ionicLoading, $cordovaSocialSharing, TheBestSvc, UserDataSvc) {

    var vm = this;
    vm.user_question = "";
    vm.best_answer = "";
    vm.teaser="";

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
      $state.go('app.askForBetterAnswer');
    };

    vm.askYourFriends = function() {
      var placeholderString= document.getElementById('askFriendsMessage').innerText.toString();
      var message = placeholderString.format(vm.user_question);
      console.log("TB_LOG: ASKING FRIENDS:"+ message);
      //var message = "I have a question for you, what is The Best " + vm.user_question + " ?";
      var subject = "'The Best' " + vm.user_question;
      var file = null;
      //var link = "thebest://app/askForAnswer?user_question=" + vm.user_question;
      var link = "android-app://com.thebest.app/thebest/app/askForAnswer?user_question=" + vm.user_question;
      TheBestSvc.urlShortener(link)
        .then(function(res){
          console.log("urlShortener Success:", res);
          $cordovaSocialSharing.share(message, subject, file, res.data.id);
        })
    };

    vm.share = function() {
      var placeholderString= document.getElementById('shareMessage').innerText.toString();
      var message = placeholderString.format(vm.user_question, vm.best_answer);
      var subject = "'The Best' " + vm.user_question;
      console.log("TB_LOG: SHARING:"+ message);
      var file = null;
      var link = "android-app://com.thebest.app/thebest/app/main";
      TheBestSvc.urlShortener(link)
        .then(function(res){
          console.log("urlShortener Success:", res);
          $cordovaSocialSharing.share(message, subject, file, res.data.id);
        })
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
