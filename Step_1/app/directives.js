

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


///////////////////////////////////////////
//Directives TALKING TO CONTROLLERS
//////////////////////////////////////////

//var app = angular.module("twitterApp", []);
//
//app.controller("AppCtrl", function() {
//  var appCtrl = this;
//  appCtrl.loadMoreTweets = function() {
//    alert("Loading tweets!");
//  };
//
//  appCtrl.deleteTweets = function() {
//    alert("deleting tweets");
//  };
//});
//
//
//// create a directive that is independent of the controller and what it calls based on the mouse enter event.
//app.directive("enter", function() {
//  return function(scope, element, attrs) {
//    element.bind("mouseenter", function() {
//      //scope.$apply parses the string and invokes it
//      //so we pass in the variable via enter as an attr on the HTML, which is assigned a function that will get called.
//      scope.$apply(attrs.enter);
//    });
//  };
//});



///////////////////////////////////////////
//Directives TALKING TO DIRECTIVES
//////////////////////////////////////////


//var app = angular.module("superApp", []);
//
//app.directive("superhero", function() {
//  return {
//    //Element
//    restrict: "E",
//
//    //this keeps the scope separate from other elements in the dome using the same superhero element.
//    scope: {},
//
//    //Sets up a controller for the directive - takes typical scope - and build an API for others to talk to.
//    controller: function($scope) {
//      //create empty array to populate
//      $scope.abilities = [];
//
//      this.addStrength = function() {
//        $scope.abilities.push("strength")
//      };
//
//      this.addSpeed = function() {
//        $scope.abilities.push("speed")
//      };
//
//      this.addFlight = function() {
//        $scope.abilities.push("flight")
//      };
//    },
//
//
//    link: function(scope, element) {
//      //this adds a class to our element - he uses foundation in the video so this gives style right away.
//      element.addClass("button");
//      element.bind("mouseenter", function() {
//        console.log(scope.abilities);
//      })
//    }
//  }
//});
//
//
////the following directives get applied as attr to the element superman that was created above.
//app.directive("strength", function() {
//  return {
//    //this lets us talk to the superhero directive via the link function - which in turn gives us access to the scope of the controllers.
//    require: "superhero",
//    link: function(scope, element, attrs, superheroCtrl) {
//      //4th item we name whatever we want then attach .function(); which calls a function from the SUPERHERO directives scope.
//      superheroCtrl.addStrength();
//    }
//  }
//});
//
//app.directive("speed", function() {
//  return {
//    require: "superhero",
//    link: function(scope, element, attrs, superheroCtrl) {
//      superheroCtrl.addSpeed();
//    }
//  }
//});
//
//app.directive("flight", function() {
//  return {
//    require: "superhero",
//    link: function(scope, element, attrs, superheroCtrl) {
//      superheroCtrl.addFlight();
//    }
//  }
//});
