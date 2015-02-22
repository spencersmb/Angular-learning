
angular.module('Eggly', [])

.controller('MainCtrl', function ($scope) {

    $scope.categories = [
      {"id": 0, "name": "Development"},
      {"id": 1, "name": "Design"},
      {"id": 2, "name": "Exercise"},
      {"id": 3, "name": "Humor"}
    ];

    $scope.bookmarks = [
      {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
      {"id": 1, "title": "Egghead.io", "url": "http://angularjs.org", "category": "Development" },
      {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
      {"id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
      {"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
      {"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
      {"id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
      {"id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
      {"id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
    ];

    $scope.emptyName = {'name': ''};

    var emptyName = $scope.emptyName;

    $scope.currentCategory = emptyName;


    //both of these are methods
    //accepts cat param and changes the scope cat to the param
    function setCurrentCategory(category){
      $scope.currentCategory = category;

      //cancel creating or editing if we switch category states
      cancelCreating();
      cancelEditing();

    }


    //return true or false - if category doesnt == '' and the name clicked === the currentCategory
    function isCurrentCategory(category){
      return $scope.currentCategory !== emptyName && category.name === $scope.currentCategory.name;
    }


    //now the function is available to the view - up until this - it's private.
    //when you use the click option it updates the global variable currentCategory and now isCUrrent runs true.
    $scope.setCurrentCategory = setCurrentCategory;
    $scope.isCurrentCategory = isCurrentCategory;

    //-------------------------------------------------------------------------------------------------
    // CRUD - CREATE UPDATE AND DELETE
    //-------------------------------------------------------------------------------------------------


    function resetCreateForm (){
      //reset the newbookmark object to a pristine condition
      $scope.newBookmark = {
        title: "",
        url: "",
        category: $scope.currentCategory.name
      }
    }

    function resetCategoryForm (){
      //reset the newbookmark object to a pristine condition
      $scope.newCategory = {
        name: ""
      }
    }

    function createBookmark(bookmark){
      //uses length to create unique ID - something not done in production typically
      //already is an object when it gets passed into this function
      bookmark.id = $scope.bookmarks.length;
      console.log(bookmark);
      $scope.bookmarks.push(bookmark);


      //creating method
      resetCreateForm();

    }

    //$scope.categories.push({id: 4, name: "spencer"});

    function createNewCat(category){
      category.id = $scope.categories.length;
      console.log('object ' + category);
      $scope.categories.push(category);
      console.log($scope.categories);

      //reset form
      resetCategoryForm();
    }



    //Create bookmark method
    function setEditedBookmark(bookmark){
      //angular makes a copy of the bookmark temporarily to let us edit it without changing the global scope live.
      $scope.editedBookmark = angular.copy(bookmark);
    }

    function updateBookmark(bookmark) {
      //get index of bookmark we are editing
      //loop over bookmarks
      var index = _.findIndex($scope.bookmarks, function (b) {

        //this compares our results to the bookmark.id we clicked
        return b.id == bookmark.id;
      });

      //set index with the new variable returned
      //this gets us the item we clikced on in the data
      $scope.bookmarks[index] = bookmark;

      //after update - reset everything
      $scope.editedBookmark = null;
      $scope.isEditing = false;
    }

    //on load this is always false - but once you click edit - editedbookmark no longer == null
    // This also allows us to have access to the editedbookmark object and its id of the item we selected.
    //HOW DOES THE BOOKMARK ID get passed into this function
    //It must either take in the object on state change or 2 way data-binding somehow

    //return true false statement
    function isSelectedBookmark( bookmarkID ){
      //if edit bookmark doesnt == null & the scope editBoomkark.id === the selected bookmark
      return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkID;
    }


    function deleteBookmark(bookmark) {
      //loop over the bookmarks object and compare ID's or the object passed in and all the bookmarks.
      //if its true it will remove it
      _.remove($scope.bookmarks, function(b){
        return b.id == bookmark.id
      });
    }

    //make avail to scope
    $scope.createBookmark = createBookmark;
    $scope.editedBookmark = null;
    $scope.setEditedBookmark = setEditedBookmark;
    $scope.updateBookmark = updateBookmark;
    $scope.isSelectedBookmark = isSelectedBookmark;
    $scope.deleteBookmark = deleteBookmark;

    $scope.createNewCat = createNewCat;

    //---------------------------------------------------------------------
    // CREATING AND EDITING STATES
    //---------------------------------------------------------------------

    $scope.isCategoryCreating = false;
    $scope.isCreating = false;
    $scope.isEditing = false;

    function startCreating() {
      $scope.isCreating = true;
      $scope.isEditing = false;
      $scope.isCategoryCreating = false;

      //reset form on init
      resetCreateForm();
    }

    function createCategory() {
      $scope.isEditing = false;
      $scope.isCreating = false;
      $scope.isCategoryCreating = true;

      //resetCategoryform
      resetCategoryForm();
    }

    function cancelCategory() {
      $scope.isCategoryCreating = false;

      //resetCategoryform
      resetCategoryForm();
    }

    function startEditing() {
      $scope.isCreating = false;
      $scope.isEditing = true;
      $scope.isCategoryCreating = false;
    }

    function cancelCreating() {
      $scope.isCreating = false;
    }

    function cancelEditing() {

      $scope.editedBookmark = null;
      $scope.isEditing = false;

    }


    //return true if currentCategory is defined and we are not editing
    //you must check for category becuase you must be in a category to edit it
    function shouldShowCreating() {
      return $scope.currentCategory !== emptyName && !$scope.isEditing;
    }

    function shouldShowEditing() {
      return $scope.isEditing && !$scope.isCreating;
    }

    function shouldShowCategory(){
      return $scope.isCategoryCreating !== false && !$scope.isCreating && !$scope.isEditing;
    }

    $scope.startCreating = startCreating;
    $scope.startEditing = startEditing;
    $scope.cancelEditing = cancelEditing;
    $scope.cancelCreating = cancelCreating;
    $scope.shouldShowCreating = shouldShowCreating;
    $scope.shouldShowEditing = shouldShowEditing;

    $scope.createCategory = createCategory;
    $scope.cancelCategory = cancelCategory;
    $scope.shouldShowCategory = shouldShowCategory;



    console.log($scope.isCreating);
    console.log($scope.isEditing);
    console.log($scope.isCategoryCreating);
    console.log($scope.shouldShowCategory());

  })
;