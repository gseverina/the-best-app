(function() {
  'use strict';

  angular
    .module('BootstrapCtrl', [])
    .controller('BootstrapCtrl', BootstrapCtrl);

  function BootstrapCtrl ($state, $timeout, $ionicLoading, $http, TheBestSvc, UserDataSvc) {

    var vm = this;
    $timeout(activate, 1000);

    /////

    vm.show = function(template) {
      $ionicLoading.show({
        template: template
      });
    };

    vm.hide = function(){
      $ionicLoading.hide();
    };

    function activate() {
      console.log("activate: BootstrapCtrl");
      //vm.show('loading...');

      //handling sessionId...
      var device_id = UserDataSvc.get('device_id');
      TheBestSvc.postSession(device_id)
        .then(postSessionSuccess, postSessionFail)
        .finally(postSessionFinally);
    }

    function getBestAnswerSuccess(res) {
      console.log("getBestAnswerSuccess: ", res);
      var go = "";
      if(res.data.answers.length == 0) {
        //Question does not exists...
        go = 'app.noAnswerYet';
      } else {
        if(res.data.answers[0].a == null) {
          //Question exists but no answer yet...
          UserDataSvc.put('show_best_answer', 'no');
          go = 'app.noAnswerYet';
        } else {
          //there is best answer...
          UserDataSvc.put('show_best_answer', 'yes');
          UserDataSvc.put('best_answer', res.data.answers[0].a);
          go = 'app.askForAnswer';
        }
      }
      console.log("going to: ", go);
      $state.go(go);
    }

    function getBestAnswerFail(res) {
      console.log("getBestAnswerFail: ", res);
    }

    function postSessionSuccess(res) {
      console.log("postSessionSuccess: ", res);
      UserDataSvc.put('sessionId', res.data.sessionId);
    }

    function postSessionFail(res){
      console.log("postSessionFail: ", res);
      UserDataSvc.put('sessionId', 'undefined');
    }

    function postSessionFinally() {
      var sessionId = 'undefined';

      sessionId = UserDataSvc.get('sessionId');
      $http.defaults.headers.common['X-Session-Id'] = sessionId;

      processExternalLoad();
    }

    function processExternalLoad() {
      //var url = "thebest://app/askForAnswer?user_question=celular";
      var url =  window.localStorage.getItem("external_load");
      console.log("stored url: " + url);
      if(url) {
        window.localStorage.clear();

        url = decodeURI(url);

        var aux = url.split("thebest://");
        var params = aux[1].replace("/",".").split("?");
        var to = params[0];

        if(to === "app.askForAnswer") {
          aux = params[1].split('=');
          var name = aux[0];
          var value = aux[1];
          var stateParams = {
            user_question: value
          };

          UserDataSvc.put("user_question", value);
          TheBestSvc.getBestAnswer(value)
            .then(getBestAnswerSuccess, getBestAnswerFail)
            .finally(function(){
              vm.hide();
            });

          console.log("going to: ", to);
          $state.go(to, stateParams);
          vm.hide();
          return;
        }

        vm.hide();
        console.log("going to: app.main");
        $state.go('app.main');
        return;
      }
      vm.hide();
      console.log("going to: app.main");
      $state.go('app.main');
    }

  }

})();

