angular
  .module('authService', [])
  .factory('authService', ["$location", "$http", "$q", "$window",
    function ($location, $http, $q, $window) {
      var session;

      function login(username, password) {
        var data = {};
        data.username = username;
        data.password = password;
        console.log(data);
        $http.post("/auth/login", data).then(function(user) {
          console.log(user);
          session.user = user;
        }, function(err) {

        });
      }

      function logout() {
        $http.get("/auth/logout").then(function (result) {
          session = null;
          $location.path("/splash");
        }, function (error) {

        });
      }

      // If we know the session object exists and don't think we need to defer
      function getSessionSynch(){
        return session;
      }

      function getSession() {
        var deferred = $q.defer();
        if (session && (session.user || session.isSessioned)) {
          deferred.resolve(session);
        }
        else {
          getSessionFromDB().then(function(session){
            console.log(session);
            if (session && (session.user || session.isSessioned)) {
              deferred.resolve(session);
            }
            else {
              deferred.reject({sessioned: false}); 
            }
          }, function(err){
            deferred.reject({sessioned: false});
          });
        }
        return deferred.promise;
      }

      // Gets the session object but doesn't update for stores
      function getUserSession() {
        var deferred = $q.defer();
        if (session && session.user && session.user.username) {
          deferred.resolve(session);
        }
        else {
          getSessionFromDB().then(function(session){
            console.log(session);
            if (session && session.user && session.user.username) {
              deferred.resolve(session);
            }
            else{
              deferred.reject({authenticated: false});
            }
          }, function(err){
            deferred.reject({authenticated: false});
          });
        }
        return deferred.promise;
      }

      function getSessionFromDB(){
        var deferred = $q.defer();

        $http.get("/auth/session").then(function (result) {
            session = result.data;
            deferred.resolve(session);
        }, function (error) {
          console.log("server out");
          deferred.reject({retrieved: false});
        });

        return deferred.promise;
      }

      function init() {
        if ($window.sessionStorage["userInfo"]) {
          userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        }
      }
      init();

      return {
        login: login,
        logout: logout,
        getSessionSynch: getSessionSynch,
        getSession: getSession,
        getUserSession: getUserSession,
      };
    }
  ]);
