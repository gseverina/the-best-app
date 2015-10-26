(function() {
  'use strict';

  angular
    .module('BootstrapCtrl', [])
    .controller('BootstrapCtrl', BootstrapCtrl);

  function BootstrapCtrl ($state, $timeout, $ionicLoading, TheBestSvc, UserDataSvc) {

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
      //var url = "thebest://app/askForAnswer?user_question=celular";
      vm.show('looking for the best...');
      var url =  window.localStorage.getItem("external_load");

      console.log("stored url: " + url);
      if(url) {
        var aux = url.split("thebest://");
        var params = aux[1].replace("/",".").split("?");
        var to = params[0];

        window.localStorage.clear();

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

          //$state.go(to, stateParams);
          return;
        }
      }

      vm.hide();
      $state.go('app.main');
    }

    function getBestAnswerSuccess(res) {
      console.log("getBestAnswerSuccess: ", res);
      var go = "";
      if(res.data == null) {
        //Question does not exists...
        go = 'app.noAnswerYet';
      } else {
        if(res.data.a == null) {
          //Question exists but no answer yet...
          UserDataSvc.put('show_best_answer', 'no');
          go = 'app.noAnswerYet';
        } else {
          //there is best answer...
          UserDataSvc.put('show_best_answer', 'yes');
          UserDataSvc.put('best_answer', res.data.a);
          go = 'app.askForAnswer';
        }
      }
      $state.go(go);
    }

    function getBestAnswerFail(res) {
      console.log("getBestAnswerFail: ", res);
      $state.go('app.main');
    }

  }

})();

