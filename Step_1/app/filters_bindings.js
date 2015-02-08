//'use strict';
//
//// Default Declare app level module which depends on views, and components
//angular.module('testComp', [
//  'ngRoute',
//  'myApp.view1',
//  'myApp.view2',
//  'myApp.version'
//]).
//config(['$routeProvider', function($routeProvider) {
//  $routeProvider.otherwise({redirectTo: '/view1'})
//
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
//angular.module('app', ['ui.router'])
//
//    .config(function config($stateProvider){
//      $stateProvider.state('index', {
//        url: '',
//        controller: 'FirstCtrl as first',
//        templateUrl: "templates/first.html"
//      })
//      $stateProvider.state('second', {
//        url: '/second',
//        controller: 'SecondCtrl as second',
//        templateUrl: "templates/second.html"
//      })
//    })
//
//  //This is a state we use .service and create a function called greeting
//  //  In our templates we bind to this message
//    .service('greeting', function Greeting() {
//      var greeting = this;
//      greeting.message = 'Default';
//    })
//  //We pass greeting into the first ctrl - then we say whatever FirstCtrl is - it will match greeting function.
//    .controller('FirstCtrl', function FirstCtrl(greeting) {
//      var first = this;
//
//      first.greeting = greeting;
//    })
//  //We pass greeting into the second ctrl - then we say whatever SecondCtrl is - it will match greeting function.
//    .controller('SecondCtrl', function SecondCtrl(greeting) {
//      var second = this;
//
//      second.greeting = greeting;
//    })
//;

//Define method on the scope
//var myApp = angular.module('myApp', []);
//
//myApp.factory('Data', function() {
//  return {message: "I'm data from a service"};
//});
//
//myApp.filter('reverse', function(Data) {
//  //takes in DATA that gets displayed from Firstctrl
//
//  return function(text) {
//    //this return takes in text from the input and then reverses it
//    return text.split("").reverse().join("") + Data.message;
//  };
//});
//
//function FirstCtrl($scope, Data){
//  $scope.data = Data;
//}
//
//function SecondCtrl($scope, Data){
//  $scope.data = Data;
//
//  $scope.reversedMessage = function(message) {
//    return message.split("").reverse().join("");
//  };
//}
//
//myApp.controller("FirstCtrl", FirstCtrl);
//
//myApp.controller("SecondCtrl", SecondCtrl);
//


//define a filter
//var myApp = angular.module('myApp', []);
//myApp.factory('Data', function() {
//  return {message: "Message"};
//});
//
////we can inject the data model here to display after the reversed text
//myApp.filter('reverse', function(Data) {
//  return function(text) {
//    return text.split("").reverse().join("") + Data.message;
//  };
//});
//
//function FirstCtrl(Data){
//  var firstCtrl = this;
//  firstCtrl.data = Data;
//}
//
//function SecondCtrl(Data){
//  var secondCtrl = this;
//  secondCtrl.data = Data;
//
//  //dont need this code technically
//  //secondCtrl.reversedMessage = function(message) {
//  //  return message.split("").reverse().join("");
//  //};
//}
//
//myApp.controller("FirstCtrl", FirstCtrl);
//
//myApp.controller("SecondCtrl", SecondCtrl);




//ng-repeat and filters

var myApp = angular.module('myApp', []);

myApp.factory('Avengers', function() {
  var Avengers = {};
  Avengers.cast = [
    {
      name: "Robert Downey Jr.",
      character: "Tony Stark / Iron Man"
    },
    {
      name: "Chris Evans",
      character: "Steve Rogers / Captain America"
    },
    {
      name: "Mark Ruffalo",
      character: "Bruce Banner / The Hulk"
    },
    {
      name: "Chris Hemsworth",
      character: "Thor"
    },
    {
      name: "Scarlett Johansson",
      character: "Natasha Romanoff / Black Widow"
    },
    {
      name: "Jeremy Renner",
      character: "Clint Barton / Hawkeye"
    },
    {
      name: "Tom Hiddleston",
      character: "Loki"
    },
    {
      name: "Clark Gregg",
      character: "Agent Phil Coulson"
    },
    {
      name: "Cobie Smulders",
      character: "Agent Maria Hill"
    },
    {
      name: "Stellan Skarsgard",
      character: "Selvig"
    },
    {
      name: "Samuel L. Jackson",
      character: "Nick Fury"
    },
    {
      name: "Gwyneth Paltrow",
      character: "Pepper Potts"
    },
    {
      name: "Paul Bettany",
      character: "Jarvis (voice)"
    },
    {
      name: "Alexis Denisof",
      character: "The Other"
    },
    {
      name: "Tina Benko",
      character: "NASA Scientist"
    }
  ];
  return Avengers;
});

function AvengersCtrl(Avengers) {

  var avengersCtrl = this;
  avengersCtrl.avengers = Avengers;
}

myApp.controller("AvengersCtrl", AvengersCtrl);
