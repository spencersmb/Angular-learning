/**
 * Created by spencer on 2/3/2015.
 */
//function FirstCtrl($scope){
//  $scope.data = {message: "Hello"};
//}

var app = angular.module("app", []);

app.factory('Data', function () {
  return {
   message: "I'm data from a service"
  }
});

//USING THE SAME DATA ALLOWS THE FUNCTIONS TO BIND TO EACH OTHER
//THEN WE CAN BIND USING THE CONTROLLER
function FirstCtrl($scope, Data){
  $scope.data = Data;
}

function SecondCtrl($scope, Data){
  $scope.data = Data;

  //Creat a new message method and that takes in message
  //return the message object - split -revers - join
  $scope.reversedMessage = function (message) {
    return message.split("").reverse().join("");
  }
}


//Call controllers here to execute the data binding between functions
app.controller("FirstCtrl", FirstCtrl);

app.controller("SecondCtrl", SecondCtrl);



//CONTROLLER EXAMPLE
//app.controller("World", function World($scope){
//  $scope.text = 'world';
//
//});

//DIRECTIVE EXAMPLE
//app.directive('hello', function () {
//  return{
//    restrict: 'A',
//    template: '<p> Hello {{ text }} </p>',
//    controller: 'World'
//  };
//});