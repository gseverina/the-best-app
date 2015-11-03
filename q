[1mdiff --git a/www/js/MainCtrl.js b/www/js/MainCtrl.js[m
[1mindex 731d53f..e98fdff 100644[m
[1m--- a/www/js/MainCtrl.js[m
[1m+++ b/www/js/MainCtrl.js[m
[36m@@ -5,7 +5,7 @@[m
     .module('MainCtrl', ['TheBestSvc','UserDataSvc'])[m
     .controller('MainCtrl', MainCtrl);[m
 [m
[31m-  function MainCtrl($state, $ionicLoading, $ionicHistory, $timeout, TheBestSvc, UserDataSvc) {[m
[32m+[m[32m  function MainCtrl($state, $ionicLoading, $ionicHistory, $timeout, $http, TheBestSvc, UserDataSvc) {[m
     var vm = this;[m
     vm.timerPromise;[m
     vm.name = "Actor";[m
[1mdiff --git a/www/templates/askForAnswer.html b/www/templates/askForAnswer.html[m
[1mindex 1d5dd91..ae3ef93 100644[m
[1m--- a/www/templates/askForAnswer.html[m
[1m+++ b/www/templates/askForAnswer.html[m
[36m@@ -4,7 +4,7 @@[m
     <div class="card">[m
       <form name="vm.search" ng-submit="vm.submit()">[m
 [m
[31m-        <div class="row-wrap">[m
[32m+[m[32m        <div class="row-wrap" ng-hide="vm.writing">[m
           <div class="item item-text-wrap text-center">[m
             <h2 translate="ANSWER_THIS"></h2>[m
             <h2 class="assertive">{{vm.user_question}}</h2>[m
[1mdiff --git a/www/templates/askForBetterAnswer.html b/www/templates/askForBetterAnswer.html[m
[1mindex cfcb328..8965a4d 100644[m
[1m--- a/www/templates/askForBetterAnswer.html[m
[1m+++ b/www/templates/askForBetterAnswer.html[m
[36m@@ -3,7 +3,7 @@[m
     <div class="card">[m
       <form name="vm.search" ng-submit="vm.submit()">[m
 [m
[31m-        <div class="row-wrap">[m
[32m+[m[32m        <div class="row-wrap" ng-hide="vm.writing">[m
           <div class="item item-text-wrap text-center">[m
             <h1 translate="MAIN.TITLE">The Best</h1>[m
             <h1 class="assertive">{{vm.user_question}}</h1>[m
warning: LF will be replaced by CRLF in www/js/MainCtrl.js.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in www/templates/askForAnswer.html.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in www/templates/askForBetterAnswer.html.
The file will have its original line endings in your working directory.
