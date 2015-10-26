(function() {
  'use strict';

  angular
    .module('BootstrapCtrl', [])
    .controller('BootstrapCtrl', BootstrapCtrl);

  function BootstrapCtrl ($state, $timeout) {

    var vm = this;

    $timeout(activate, 1000);

    /////

    function activate() {
      //var url = "thebest://app/askForAnswer?user_question=celular";
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
          $state.go(to, stateParams);
          return;
        }
      }

      $state.go('app.main');
    }

  }

})();

