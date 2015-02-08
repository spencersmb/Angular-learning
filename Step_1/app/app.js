

///////////////////////////////////////////
//Directives
//////////////////////////////////////////

//var app = angular.module("superhero", []);

//memorive this syntax
//return object
//"E" element
//This creates a new HTML5 element like NAV or FOOTER
//app.directive("superman", function() {
//  return {
//    restrict: "E",
//    template: "<div>Here I am to save the day</div>"
//  };
//});


////CREATE AN ATTRIBUTE
//app.directive("superman", function() {
//  return {
//    //C for class,
//    //Behaviors are best used as attributes
//    restrict: "A",
//    link: function(){
//      alert("I am working");
//    }
//  };
//});

///////////////////////////////////////////
//BEHAVIORS
//////////////////////////////////////////

//var app = angular.module("behaviorApp", []);
//
//app.directive("enter", function() {
//  return function(scope, element, attrs) {
//    element.bind("mouseenter", function() {
//      element.addClass(attrs.enter);
//    });
//  };
//});
//
//app.directive("leave", function() {
//  return function(scope, element, attrs) {
//    element.bind("mouseleave", function() {
//      element.removeClass(attrs.enter);
//    });
//  };
//});


//DIRECTIVES TALKING TO DIRECTIVES

var app = angular.module("twitterApp", []);

app.controller("AppCtrl", function() {
  var appCtrl = this;
  appCtrl.loadMoreTweets = function() {
    alert("Loading tweets!");
  };

  appCtrl.deleteTweets = function() {
    alert("deleting tweets");
  };
});

app.directive("enter", function() {
  return function(scope, element, attrs) {
    element.bind("mouseenter", function() {
      scope.$apply(attrs.enter);
    });
  };
});


