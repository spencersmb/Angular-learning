//'use strict';
//
//// Declare app level module which depends on views, and components
//angular.module('myApp', [
//  'ngRoute',
//  'myApp.view1',
//  'myApp.view2',
//  'myApp.version'
//]).
//config(['$routeProvider', function($routeProvider) {
//  $routeProvider.otherwise({redirectTo: '/view1'});
//}]);


//// Declare app level module which depends on views, and components
//Seperate controllers
//var myapp = angular.module('app', []);
//
//    myapp.controller('FirstCtrl', function($scope) {
//
//      $scope.data = {message: "Hello"};
//    });
//    myapp.controller('SecondCtrl', function($scope) {
//
//      $scope.data = {message: "Hello"};
//    });


//This allows us to bind anything with data.message to everything that has that same model using "this" keyword.
//angular.module('app', [])
//
//    .controller('FirstCtrl', function FirstCtrl() {
//      var first = this;
//
//      first.data = "First"
//    })
//
//
//    .controller('SecondCtrl', function SecondCtrl() {
//      var second = this;
//
//      second.data = "Second"
//});


//SHARING DATA BETWEEN CONTROLLERS
//DEPENDENT ON UI_ROUTER
//We can share data using a service and it gets passed to other controllers
angular.module('app', ['ui.router'])

    .config(function config($stateProvider){
      $stateProvider.state('index', {
        url: '',
        controller: 'FirstCtrl as first',
        templateUrl: "templates/first.html"
      })
      $stateProvider.state('second', {
        url: '/second',
        controller: 'SecondCtrl as second',
        templateUrl: "templates/second.html"
      })
    })

  //This is a state we use .service and create a function called greeting
  //  In our templates we bind to this message
    .service('greeting', function Greeting() {
      var greeting = this;
      greeting.message = 'Default';
    })
  //We pass greeting into the first ctrl - then we say whatever FirstCtrl is - it will match greeting function.
    .controller('FirstCtrl', function FirstCtrl(greeting) {
      var first = this;

      first.greeting = greeting;
    })
  //We pass greeting into the second ctrl - then we say whatever SecondCtrl is - it will match greeting function.
    .controller('SecondCtrl', function SecondCtrl(greeting) {
      var second = this;

      second.greeting = greeting;
    })
;


