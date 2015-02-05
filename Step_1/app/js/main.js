/**
 * Created by spencer on 2/4/2015.
 */
//updated to no longer use global function to represent controller.
angular.module('app', [])
    .controller('FirstCtrl', function($scope) {
        //var first = this;

        $scope.data = {message: "Hello"};
    });