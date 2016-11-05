angular.module('userEdit').component('userEdit', {
  templateUrl: 'user-edit/user-edit.template.html',
  controller: function UserEditController($scope, $location, $http, NgMap) {
    var re = new RegExp("\/user\/(.*)\/edit");
    var userId = re.exec($location.path())[1];    

    console.log(userId);
    $http.get("/user/" + userId).then(function(user) {
      $scope.user = user.data;
      console.log($scope.user);
      $scope.clonedUser = JSON.parse(JSON.stringify($scope.user));
    }, function(err) {
    });

    $scope.checkEquality = function(){
      // If either is undefined then just say they are equal 
      // This will avoid the initial flash at the beginning
      if (!$scope.user || !$scope.clonedUser) return true;
      return (JSON.stringify($scope.user) === JSON.stringify($scope.clonedUser));
    }


    $scope.saveChanges = function() {
      // Send everything to the backend
      // Photos are moved from /tmp to the regular img directory

      // Validate the forms and the photos 
      // If valid then send the updated / new store to the servers
      if (checkForms()){
        console.log($scope.user);
        var userData = $scope.user;
        $http.post('user', {
          data: userData
        }).then(function(data) {
          var re = new RegExp("\/user\/(.*)\/edit");
          var storeId = re.exec($location.path())[1];    
          $location.path("/user/" + storeId);
        }, function(err) {
          // TODO error handling
          console.log(err);
          alert("There was an error");
        });
      }
    }

    var checkForms = function() {
      // return if the errors is empty
      if ($.isEmptyObject($scope.userForm.$error)){
        return true;
      }

      // If there is an error, loop over all the error fields to display the errors 
      angular.forEach($scope.userForm.$error, function (field) {
        angular.forEach(field, function(errorField){
          errorField.$setTouched();
        })
      });
      alert("See Form Errors!");
      return false;
    };

    $scope.resetChanges = function() {
      $scope.user = JSON.parse(JSON.stringify($scope.clonedUser));
    }

    // Callback to set the map after map initializes
    NgMap.getMap().then(function(map) {
      $scope.map = map;
    });
    $scope.placeChanged = function() {
      // console.log(this.getPlace());
      var place = this.getPlace();
      if (place.geometry) {
        var coords = place.geometry.location;
        $scope.user.address.lat = coords.lat();
        $scope.user.address.lng = coords.lng();
      }
    }

  }
});
