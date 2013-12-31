'use strict';

angular.module('roquettesApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main',
            controller: 'MainCtrl'
        })
        .when('/token', {
            templateUrl: 'partials/main',
            controller: 'AuthenticationCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
  });
