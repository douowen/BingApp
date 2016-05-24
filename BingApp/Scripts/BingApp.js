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

    $location.path('/').search('');
}]);

BingApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!').html5Mode(true);
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

BingApp.controller('HomeController', ['$scope', '$location', '$rootScope', '$timeout', function HomeController($scope, $location, $rootScope, $timeout) {
    $scope.searchItem = "";
    $scope.goSearch = function (keyword, path) {
        $scope.searchItem = angular.copy(keyword);
        $timeout(function () {
            $rootScope.$broadcast('getSearchKeyword', { item: keyword });
        }, 100);
        $location.path(path).search({ keyword: keyword });
    };
}]);

BingApp.controller('WebController', ['$scope', '$location', '$rootScope', '$timeout',
    function WebController($scope, $location, $rootScope, $timeout) {
    $rootScope.$on('getSearchKeyword', function (event, args) {
        $scope.keyword = args.item;
    });
    
    $scope.goSearch = function (keyword, path) {
        $location.path(path).search({ keyword: keyword });
        $timeout(function () {
            $rootScope.$broadcast('getSearchKeyword', { item: keyword });
        }, 100);
    };

    $scope.goHome = function () {
        $location.path('/');
    };
}]);

BingApp.controller('ImagesController', ['$scope', '$location', '$rootScope', '$timeout',
    function ImagesController($scope, $location, $rootScope, $timeout) {
        $scope.$on('getImageKeyword', function (event, args) {
            $scope.keyword = args.item;
        });

        $scope.goSearch = function (keyword, path) {
            $location.path(path).search({ keyword: keyword });
            $timeout(function () {
                $rootScope.$broadcast('getImageKeyword', { item: keyword });
            }, 100);
        };

        $scope.goHome = function () {
            $location.path('/');
        };
    }]);

BingApp.directive('autofocus', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $element) {
            $timeout(function () {
                $element[0].focus();
            });
        }
    }
}]);