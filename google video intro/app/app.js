'use strict';

// Default Declare app level module which depends on views, and components
//angular.module('myApp', [
//  'ngRoute',
//  'myApp.view1',
//  'myApp.view2',
//  'myApp.version'
//]).
//config(['$routeProvider', function($routeProvider) {
//  $routeProvider.otherwise({redirectTo: '/view1'});
//}]);

//name controllers with ctrl at the end
//$scope object is the model of the project
//No need to call a function to set or get - just use scope
//this is considered a global funciton but is not good for scaling. -Polluting.

//function NameCtrl ($scope){
//  $scope.firstName = 'John';
//  $scope.lastName = 'Smith';
//}

//the correct way to write a controller
var nameApp = angular.module('nameApp', []);
//define a controller inside the nameApp
//first arg is name, 2nd is the function
//this could get wrapped in an siaf function to keep it out of the global name space 100%
nameApp.controller( 'NameCtrl', function ($scope){
  $scope.firstName = 'John';
  $scope.lastName = 'Smith';

  //add an array of names or content
  $scope.names = ['Larry','Moe', 'Curly'];

  //detect if something has changed to get out of angular to write some custom JS to do something on change to a specific model
  $scope.$watch('lastName', function(newValue, oldValue){
    //write JS here
    console.log('new value is '+ newValue);
  });

  //define add name funtion on the scope
  //pushes new element on the name array 'name' using the id of 'enteredName'
  $scope.addName = function() {
      $scope.names.push($scope.enteredName);
      //after you enter a name fill it with white space again
      $scope.enteredName = '';
  };


  $scope.removeName = function(name) {
    //get index of name in the array
    var i= $scope.names.indexOf(name);
    //splice name with that index
    $scope.names.splice(i,1);
  }



}); //end Nameapp ctrler


//example of using objects(or json with ngrepeat)
nameApp.controller( 'CountryCtrl', function ($scope){

  $scope.countries = [
    {"name": "China", "population": 1359821000},
    {"name": "India", "population": 1205625000},
    {"name": "United States of America","population": 312247000}
  ];

});

////example http: data using promise but isnt supported for minification
//nameApp.controller( 'CountryHttpCtrl', function ($scope, $http){
//
//  //callback using success data
//  $http.get('package.json').success(function(data) {
//    $scope.countries = data;
//  });
//
//});


//example http: data using promise supported for minification
//2nd arg is an array and the first couple are strings which is what they depend on - but the variables can be whatever - you don't need dollar signs
nameApp.controller( 'CountryHttpCtrl', ['$scope', '$http', function(scope, http){
    http.get('package.json').success(function(data) {
      scope.countries = data;
    });
  scope.sortField = 'population';
  scope.reverse = true;
}]);


/////////////////////////////////////////////////////////
//country App using ngroute (changes in the url after the HASH)
/////////////////////////////////////////////////////////

//put ngRoute in the array of dependencies
var countryApp = angular.module('countryApp', ['ngRoute']);

//establish new controller dependent on routeProvider
countryApp.config(function($routeProvider) {

  //when(path, route)
  $routeProvider.
      //when url ends in hash slash
      when('/', {
        //template is the same string as in the htlm using country list controller
        templateUrl: 'country-list.html',
        //define what controller to use
        controller: 'CountryListCtrl'
      }).
      //:countryName is a variable for the country items in the list
      //this just gets the first parameter in the json file
      //example #/africa
      when('/:countryName', {
        //could also use a template string
        //template: '<h1>{{name}}</h1>'
        templateUrl: 'country-detail.html',
        controller: 'CountryDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
});

//correct way to fetch data and store it using a factory
//first arg is the name of the service that we'll use later to look up - we define it I think.

countryApp.factory('countries', function($http){

  // JAVASCRIPT WAY OF CACHING DATA
  //var cachedData;
  //
  //function getData(callback){
  //  if(cachedData) {
  //    callback(cachedData);
  //  } else {
  //    $http.get('package.json').success(function(data){
  //      cachedData = data;
  //      //preprocess data here if needed
  //      callback(data);
  //    });
  //  }
  //}

  //ANGULAR WAY OF CACHING DATA
  function getData(callback){
    $http({
      method: 'GET',
      url: 'package.json',
      cache: true
    }).success(callback);
  }

  //return object that has a function on it
  return {
    list: getData,

    find: function(name, callback){
          getData(function(data){
            var country = data.filter(function (entry){
              return entry.name === name;
            })[0];
            callback(country);
          });

    }
  };
});

//country list controller created here used to fetch data everytime
//pass in countries after the factory is built
//this originally had the http get call
countryApp.controller('CountryListCtrl', function ($scope, $http, countries){
  //country.list calls the function in the factory and passes it the function the callback once it has the data
  countries.list(function(countries){
    $scope.countries = countries;
  });
});

//country detail controller
// oringally was - - countryApp.controller('CountryDetailCtrl', function ($scope, $routeParams, $http){
countryApp.controller('CountryDetailCtrl', function ($scope, $routeParams, countries){

  //countryname is a variable
  //renders out an object and we can see that to get the name is .countryName
  //we then set the country name on the $scope.name or else the controller cant get to it for some reason
  //$scope.name = $routeParams.countryName;

  //first step is to fetch data again
  //filter function that can filter values in arrays that pass a truth test which returns a boolean
  //find the name that matches the scope and return it
  //then set it to the scope which gives the template access to it and the data
  //$http.get('package.json').success(function(data) {
  //
  //
  //  $scope.country = data.filter(function (entry){
  //    return entry.name === $scope.name;
  //  })[0];
  //});

  //set variable countryName to the callback of country.
  countries.find($routeParams.countryName, function(country){
    $scope.country = country;
  });

  console.log($routeParams);
});

//create your own filter
countryApp.filter('encodeURI', function(){
  //tells window to turn spaces into %
  return window.encodeURI;
});
