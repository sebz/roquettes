'use strict';

angular.module('roquettesApp')
  .controller('MainCtrl', function ($scope, $http) {
      var postUrl = "/postData";
      $scope.loaded = function() {
            var data = [{
                "stove.events.loaded" : [{
                    timestamp : moment().valueOf(),
                    value : "1"
                }]
            }];
          $http.post(postUrl, data).then(function(result) {
            console.log("# Loaded ! >>", result);
          });
      };
      
      $scope.started = function() {
            var data = [{
                "stove.events.started" : [{
                    timestamp : moment().valueOf(),
                    value : "1"
                }]
            }];
          $http.post(postUrl, data).then(function(result) {
            console.log("# Started ! >>", result);
          });
      };
      
      $scope.stopped = function() {
            var data = [{
                "stove.events.stopped" : [{
                    timestamp : moment().valueOf(),
                    value : "1"
                }]
            }];
          $http.post(postUrl, data).then(function(result) {
            console.log("# Stopped ! >>", result);
          });
      };
    /*$http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });*/
});
