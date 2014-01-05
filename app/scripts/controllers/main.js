'use strict';

angular.module('roquettesApp')
  .controller('MainCtrl', function ($scope, $http) {

    var postUrl = '/postData';
    var buildEvent = function(time) {
        var result = {
            timestamp : time.valueOf(),
            value : 1
        };
        if ($scope.forceDate) {
            result.timestamp = $scope.forceDate.valueOf();
        }

        return result;
    };

    var displayResult = function(action, time) {
        $scope.action = action;
        $scope.time = time.format('Do MMMM YYYY, HH:mm');
        if ($scope.forceDate) {
            $scope.time = $scope.forceDate.format('Do MMMM YYYY, HH:mm');
        }
    };
    $scope.loaded = function($event) {
        jQuery($event.target).button('loading');
        var time = moment();
        var data = [{
            'stove.loaded' : [ buildEvent(time) ]
        }];
        $http.post(postUrl, data).then(function(result) {
            jQuery($event.target).button('reset');
            displayResult('Loaded', time);
            console.log('# Loaded ! >>', result);
        });
    };
      
    $scope.started = function($event) {
        jQuery($event.target).button('loading');
        var time = moment();
        var data = [{
            'stove.state' : [ buildEvent(time) ]
        }];
        $http.post(postUrl, data).then(function(result) {
            jQuery($event.target).button('reset');
            displayResult('Started', time);
            console.log('# Started ! >>', result);
        });
    };
      
    $scope.stopped = function($event) {
        jQuery($event.target).button('loading');
        var time = moment();
        var stoppedEvent = buildEvent(time);
        stoppedEvent.value = 0;
        var data = [{
            'stove.state' : [ stoppedEvent ]
        }];
        $http.post(postUrl, data).then(function(result) {
            jQuery($event.target).button('reset');
            displayResult('Stopped', time);
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
