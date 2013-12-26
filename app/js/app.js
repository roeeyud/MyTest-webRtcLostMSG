'use strict';
var myTestApp = angular.module('myTestApp', [
  'ngRoute',
  'myTestControllers',
  'myTestDirectives'
]);

myTestApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
            templateUrl: 'partials/app.html',
            controller: 'appCtrl'
        }).otherwise({
            redirectTo: '/'
        });
  }]);
