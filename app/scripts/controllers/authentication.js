'use strict';

angular.module('roquettesApp')
  .controller('AuthenticationCtrl', function ($scope, $location, $cookies) {
      console.log("### auth ctrller : ", $location["$$hash"].split("&")[0].split("=")[1]);
      $cookies.avop_access_token = $location["$$hash"].split("&")[0].split("=")[1];
      $location.path( "/#/" );
});
