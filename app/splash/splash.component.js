angular.module('splash').component('splash', {
  templateUrl: 'splash/splash.template.html',
  controller: function LoginController($scope, authService) {
    $scope.user = {};
    $scope.user.username = "Geoff";
    $scope.user.password = "Password";

    authService.login($scope.user.username, $scope.user.password);
  }
});
