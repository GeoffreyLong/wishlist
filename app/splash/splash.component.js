angular.module('splash').component('splash', {
  templateUrl: 'splash/splash.template.html',
  controller: function LoginController($scope, authService, $location) {
    $scope.user = {};
    $scope.user.username = "Geoff";
    $scope.user.password = "Password";

    $scope.goToIndex = function() {
      $location.url("/");
    }
  }
});
