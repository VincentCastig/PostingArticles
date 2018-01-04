angular.module("myApp")
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('register', {
        url: '/',
        templateUrl: './templates/register.html',
        controller: 'userController'
      })
      // .state('login', {
      //   url: '/register',
      //   templateUrl: './templates/register.html',
      //   controller: 'userController'
      // })
      // .state('logout', {
      //   url: '/logout',
      //   templateUrl: './templates/register.html',
      //   controller: 'userController'
      // })
      
      .state('post', {
        url: '/post',
        templateUrl: './templates/basic.html',
        controller: 'basicController'
      })
      


  })
