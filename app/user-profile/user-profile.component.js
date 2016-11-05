angular.module('userProfile').component('userProfile', {
  templateUrl: 'user-profile/user-profile.template.html',
  controller: function UserProfileController($scope, $http, $location, authService) {
    $scope.user = {};
    $http.get($location.path()).then(function(user) {
      $scope.user = user.data;
      $scope.user.lat = $scope.user.lat.toFixed(1);
      $scope.user.lng = $scope.user.lng.toFixed(1);
      console.log($scope.user);
    }, function(err) {
    });



    $scope.checkOwnership = function() {
      var session = authService.getSessionSynch();
      console.log(session);
      console.log($scope.user);
      return (session && session.user
              && (session.user.username == $scope.user.username))
    }

    $scope.editUser = function() {
      // NOTE I think it would look cool to do this "in page" but for now we are routing
      //      To avoid template complexity
      //      We could do this in page either by ng-ifs with a flag
      //      Or by forcing the template heavy via JS I think
      //      That's a later problem though
      $location.path($location.path() + '/edit');
    }
  }

})
