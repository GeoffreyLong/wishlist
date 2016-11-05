angular
  .module('wishlist')
  .config(['$locationProvider', '$routeProvider', '$httpProvider', 
    function config ($locationProvider, $routeProvider, $httpProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
      .when('/splash', {
        template: '<splash></splash>'
      })
      .when('/', {
        template: '<index></index>',
        resolve: {
          auth: function ($q, authService) {
            return authService.getSession();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
    },
  ])
  .run(["$rootScope", "$location", "$window",
    function ($rootScope, $location, $window) {
      $rootScope.$on("$routeChangeSuccess", function (userInfo) {
        console.log("Route Change Success for " + $location.url());
      });

      $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        console.log("Route Change Error for " + $location.url());
        if (eventObj.sessioned === false) {
          $location.path("/splash");
        }
        // Only kids need to be authed
        if (eventObj.authenticated === false) {
          $location.path("/login");
        }
      });
    }
  ]);
