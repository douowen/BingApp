var BingApp = angular.module('BingApp', ['ngRoute']);

BingApp.controller('BingShareController', ['$scope', '$location', function BingShareController($scope, $location) {
    $scope.title = 'Bing';
    $scope.showNav = false;
    $scope.isActive = function (route) {
        return route === $location.path();
    };
    console.log($scope.showNav);
    $scope.mouseOverNav = function (arg) {
        $scope.showNav = true;
    }

    $scope.mouseLeaveNav = function () {
        $scope.showNav = false;
    }
}]);

BingApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
    when('/', {
        templateUrl: 'bingApp/home',
        controller: 'HomeController'
    })
    .when('/search', {
        templateUrl: 'bingApp/web',
        controller: 'WebController'
    })
    .when('/images', {
        templateUrl: 'bingApp/images',
        controller: 'ImagesController'
    })
    .when('/videos', {
        templateUrl: 'bingApp/videos',
        controller: 'VideosController'
    })
    .when('/maps', {
        templateUrl: 'bingApp/maps',
        controller: 'MapsController'
    })
    .when('/news', {
        templateUrl: 'bingApp/news',
        controller: 'NewsController'
    })
    .when('/explore', {
        templateUrl: 'bingApp/explore',
        controller: 'ExploreController'
    })
    .when('/history', {
        templateUrl: 'bingApp/history',
        controller: 'HistoryController'
    });
}]);

BingApp.controller('HomeController', ['$scope', function HomeController($scope) {

}]);
