'use strict';

angular.module('roquettesApp')
  .controller('MainCtrl', function ($scope, $http) {

    var postUrl = '/postData';
    var buildEvent = function() {
        var result = {
            timestamp : moment().valueOf(),
            value : 1
        };
        if ($scope.forceDate) {
            result.timestamp = $scope.forceDate.valueOf();
        }

        return result;
    };
    $scope.loaded = function($event) {
        jQuery($event.target).button('loading');
        var data = [{
            'stove.loaded' : [ buildEvent() ]
        }];
        $http.post(postUrl, data).then(function(result) {
            jQuery($event.target).button('reset');
            console.log('# Loaded ! >>', result);
        });
    };
      
    $scope.started = function($event) {
        jQuery($event.target).button('loading');
        var data = [{
            'stove.state' : [ buildEvent() ]
        }];
        $http.post(postUrl, data).then(function(result) {
            jQuery($event.target).button('reset');
            console.log('# Started ! >>', result);
        });
    };
      
    $scope.stopped = function($event) {
        jQuery($event.target).button('loading');
        var stoppedEvent = buildEvent();
        stoppedEvent.value = 0;
        var data = [{
            'stove.state' : [ stoppedEvent ]
        }];
        $http.post(postUrl, data).then(function(result) {
            jQuery($event.target).button('reset');
            console.log('# Stopped ! >>', result);
        });
    };
}).directive('datetimepicker', function() {
    return {
        restrict : 'E',
        replace : true,
        require : 'ng-model',
        templateUrl: 'partials/datetimepicker.html',
        link : function (scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                language: 'fr'
            });
            element.on('change.dp', function (e) {
                console.log('Date:',e.date);
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(e.date);
                });
            });
        }
    };
});
