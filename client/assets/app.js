var app = angular.module('myApp', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'partials/new_users.html',
    controller: 'UsersController as UC'
  })
  .when('/main', {
    templateUrl: 'partials/main.html',
    controller: 'BucketsController as BC'
  })
  .when('/user/:id', {
   templateUrl: "partials/show.html",
   controller: "UsersController as UC"
  })
  .otherwise('/')
})
