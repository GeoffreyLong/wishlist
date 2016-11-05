angular.module('header').component('header', {
  templateUrl: 'header/header.template.html',
  controller: function HeaderController($scope, $location) {

    $scope.routeToIndex = function() {
      $location.path('/');
    }
  }
});
