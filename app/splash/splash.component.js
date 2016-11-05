angular.module('splash').component('splash', {
  templateUrl: 'splash/splash.template.html',
  controller: function LoginController($scope) {
    $scope.user = {};
    $scope.user.username = "asdfasdf";
    $scope.user.password = "";
  }
});
