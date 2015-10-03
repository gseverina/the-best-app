angular.module('controllers', ['services'])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    var vm = this;

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('MainCtrl', ['$state', function($state) {
    var vm = this;
    vm.title = "What is the best:";
    vm.name = "Actor";
    vm.items = [];
    vm.searchText = "";
    vm.writing = false;

    vm.onChange = function() {
      vm.items = [
        {"text": "cars"},
        {"text": "make"}
      ];
    };

    vm.slectedItem = function(item) {
      vm.searchText = item.name;
      vm.search.$valid = true;
      vm.submit();
    };

    vm.submit = function() {
      $state.go('app.result');
    };

  }])

  .controller('QSuggestionsCtrl', function(QSuggestions) {

    var vm = this;
    vm.searchText = "";
    vm.suggestions = [];

    activate();

    function activate() {
      //QSuggestions.get(success, fail);
      QSuggestions.getAll('c').success(function(data) {
        console.log("success", data);
        vm.suggestions = data;
      });
    }

    vm.onChange = function() {
      vm.suggestions = QSuggestions.getText(vm.searchText);
      console.log("-->", vm.searchText);
    }

    function success(res) {
      console.log("success", res);
      vm.suggestions = res;
    }

    function fail() {
      console.log("fail");
      vm.suggestions = {"suggestions": [{"text": "ERROR"}]};
    }

  });
