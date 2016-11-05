angular
  .module('wishlist')
  .config(['$locationProvider', '$routeProvider', '$httpProvider', 
    function config ($locationProvider, $routeProvider, $httpProvider) {

    $locationProvider.hashPrefix('!');
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
      .when('/user/:userId/edit', {
        template: '<user-edit></user-edit>',
        resolve: {
          auth: function ($q, authService) {
            return authService.getUserSession();
          }
        }
      })
      .when('/user/:userId', {
        template: '<user-profile></user-profile>',
        resolve: {
          auth: function ($q, authService) {
            return authService.getSession();
          }
        }
      })
      .otherwise({
        redirectTo: '/splash'
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
