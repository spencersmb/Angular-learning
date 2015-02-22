

///////////////////////////////////////////
//Isolate Scope
//////////////////////////////////////////


//
//var app = angular.module("choreApp", []);
//
//app.controller("ChoreCtrl", function() {
//  var choreCtrl = this;
//  choreCtrl.logChore = function(chore) {
//    alert(chore + " is done!");
//  };
//});
//
//
//app.directive("kid", function() {
//  return {
//    restrict: "E",
//    scope: {
//      //& for expression binding
//      done: "&"
//    },
//    //ng-model binds string chore with {{chore}}
//    // concat div ng-click is bound as an attr to the kid element in the html - which then calls the choreCtrl.logChore function and passes in the Chore object.
//    //chore:chore - first is the property(chore) - mapped to the 2nd chore value
//    template: '<input type="text" ng-model="taskA">' +
//    ' {{taskA}}' +
//    ' <div class="button" ng-click="done({taskB:taskA})">I\'m done!</div>'
//  };
//});




///////////////////////////////////////////
//Isolate Scope @
//////////////////////////////////////////

//var app = angular.module("drinkApp", []);
//
//app.controller("AppCtrl", function() {
//  var appctrl = this;
//  appctrl.ctrlFlavor = "blackberry";
//});
//
////what this directive does it bind itself to the controller above using the attr flavor and adds a div with whatever is bound to the input via the html
//app.directive("drink", function() {
//  return {
//    scope: {
//      // pass whatever is on flavor as a string and as the scope - then you have access to it on the scope inside the directive- and we bind it inside the div here.
//      flavor: "@"
//    },
//    template: '<div>{{flavor}}</div>'
//  };
//});



///////////////////////////////////////////
//Isolate Scope =
//////////////////////////////////////////

//var app = angular.module("drinkApp", []);
//
//app.controller("AppCtrl", function() {
//  var appctrl = this;
//  appctrl.ctrlFlavor = "blackberry";
//});
//
////this directive adds the input inside that div and binds flavor to ng-model. This allows flavor to pass an object which is the app.ctrl.ctrlFlavor which is then bound to the first input in the html.
//app.directive("drink", function() {
//  return {
//    scope: {
//      //expects to bind itself to an object not a string. This binding goes both ways
//      flavor: "="
//    },
//    template: '<input type="text" ng-model="flavor">'
//  };
//});




///////////////////////////////////////////
//Isolate Scope &
//////////////////////////////////////////

var app = angular.module("phoneApp", []);

app.controller("AppCtrl", function() {
  var appctrl = this;
  appctrl.callHome = function(message) {
    alert(message);
  };
});

app.directive("phone", function() {
  return {
    scope: {
      dial: "&"
    },
    template: '<input type="text" ng-model="value">' +
    '<div class="button" ng-click="dial({message:value})">Call home!</div>'
  };
});