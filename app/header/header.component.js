angular.module('header').component('header', {
  templateUrl: 'header/header.template.html',
  controller: function HeaderController($scope, $location, authService) {
    $scope.session = authService.getSessionSynch();

    $scope.routeToIndex = function() {
      $location.path('/');
    }
  }
});
