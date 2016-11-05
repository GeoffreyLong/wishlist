angular.module('userProfile').component('userProfile', {
  templateUrl: 'user-profile/user-profile.template.html',
  controller: function UserProfileController($scope, $http, $location, authService) {
    $scope.user = {};
    $scope.session = {};
    authService.getUserSession().then(function(session) {
      $scope.session = session;
    });
    $http.get($location.path()).then(function(user) {
      $scope.user = user.data;
      $scope.user.lat = $scope.user.lat.toFixed(1);
      $scope.user.lng = $scope.user.lng.toFixed(1);
      console.log($scope.user);
    }, function(err) {
    });



    $scope.checkOwnership = function() {
      var session = $scope.session;
      console.log(session);
      console.log($scope.user);
      return (session && session.user
              && (session.user.username == $scope.user.username))
    }

    $scope.editUser = function() {
      $location.path($location.path() + '/edit');
    }
  }

})
