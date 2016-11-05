angular.module('header').component('header', {
  templateUrl: 'header/header.template.html',
  controller: function HeaderController($scope, $location, authService, $http) {
    $scope.session = authService.getSessionSynch();
    authService.getUserSession().then(function(session) {
      $scope.session = session; 
    });
    $scope.user = {};

    $scope.routeToIndex = function() {
      $location.path('/');
    }

    $("#loginForm").hide();
    $("#signupForm").hide();

    $scope.logout = function() {
      authService.logout();
      $scope.session.user = undefined;
      $scope.user = {};
    }

    $scope.showLogin = function(ev) {
      $("#login").toggleClass('clicked');
      $("#loginForm").toggle('hide');
      if ($("#login").hasClass('clicked')) {
        $("#signup").removeClass('clicked');
        $("#signupForm").hide();
      }
    }

    $scope.showSignup = function(ev) {
      $("#signup").toggleClass('clicked');
      $("#signupForm").toggle('hide');
      if ($("#signup").hasClass('clicked')) {
        $("#login").removeClass('clicked');
        $("#loginForm").hide();
      }
    }

    $scope.loginClick = function() {
      if ($scope.user.username.length >= 5 && $scope.user.password.length >= 5) {
        $http.post('/auth/login', {"username": $scope.user.username, 
                              "password": $scope.user.password}).then(function(data) {
            console.log(data.data);
            if (data.data) {
              authService.getUserSession().then(function(session) {
                $scope.session = session; 
              });
              $("#loginForm").hide();
              $("#signupForm").hide();
              $location.path('/user/' + data.data._id);
            }
            else {
              alert("Please check your username and password");
            }
          }, function (err) {
            alert("Error in logging in");
        });
      }
      else {
        alert("Both Username and Password must be at least 5 characters long");
      }
    }
    $scope.signupClick = function() {
      if ($scope.user.password !== $scope.user.passwordCheck) {
        alert("Passwords don't match");
      }
      else {
        if ($scope.user.username.length >= 5 && $scope.user.password.length >= 5) {
          $http.post('/newuser', {"username": $scope.user.username, 
                                "password": $scope.user.password}).then(function(data) {
              // TODO Should log in too
              console.log(data.data);
              authService.getUserSession().then(function(session) {
                $scope.session = session; 
              });
              $("#loginForm").hide();
              $("#signupForm").hide();
              $location.path('/user/' + data.data + '/edit');
            }, function (err) {
              alert("Error in creating username. May already exist");
          });
        }
        else {
          alert("Both Username and Password must be at least 5 characters long");
        }

      }
    }
  }

});
