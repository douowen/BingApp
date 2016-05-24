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

BingApp.controller('HomeController', ['$scope', '$location', '$rootScope', '$timeout',
    function HomeController($scope, $location, $rootScope, $timeout) {
    var afterFirstClick = false;
    $scope.showOverlay = false;
    $scope.searchItem = "";
    $scope.goSearch = function (keyword, path) {
        if (keyword.length > 0) {
            $scope.searchItem = angular.copy(keyword);
            $timeout(function () {
                $rootScope.$broadcast('getSearchKeyword', { item: keyword });
            }, 100);
            $location.path(path).search({ keyword: keyword });
        }
    };

    $scope.clickInput = function () {
        afterFirstClick = true;
        $scope.showOverlay = true;
    };

    $scope.focusInput = function () {
        if (afterFirstClick) {
            $scope.showOverlay = true;
        }
    };

    $scope.blurInput = function () {
        $scope.showOverlay = false;
    };
    
}]);

BingApp.controller('WebController', ['$scope', '$location', '$rootScope', '$timeout', 'WebResultService',
    function WebController($scope, $location, $rootScope, $timeout, WebResultService) {
        //Get searchResults data by calling the http get function in WebResultService
        //WebResultService.getWebSearchResults(args, function (response) {
        //    $scope.searchResults = response.data;
        //});
        $scope.showResults = false;

        $scope.searchResults = [
            {
                title: 'Microsoft Office',
                url: 'https://products.office.com', 
                descr: 'From desk to web for Macs and PCs, Office delivers the tools to get work done.'
            },
            {
                title: 'Microsoft Windows Update',
                url: 'https://windowsupdate.microsoft.com',
                descr: 'Latest bug fixes for Microsoft Windows, including fixes for some possible Dos attacks.'

            },
             {
                 title: 'Microsoft - Official Home Page',
                 url: 'https://www.microsoft.com',
                 descr: 'At Microsoft our mission and values are to help people and businesses throughout the world realize their full potential.'
             },

        ];

    $rootScope.$on('getSearchKeyword', function (event, args) {
        $scope.keyword = args.item;
        $scope.showResults = true;
    });
    
    $scope.goSearch = function (keyword, path) {
        if (keyword.length > 0) {
            $location.path(path).search({ keyword: keyword });
            $timeout(function () {
                $rootScope.$broadcast('getSearchKeyword', { item: keyword });
            }, 100);
        } else {
            $location.path('/').search('');
        }
    };

    $scope.goHome = function () {
        $location.path('/').search('');
    };
}]);

BingApp.controller('ImagesController', ['$scope', '$location', '$rootScope', '$timeout',
    function ImagesController($scope, $location, $rootScope, $timeout) {
        $scope.showResults = false;
        $scope.detailImageSrc = "";
        $scope.showOverlay = false;
        $scope.imagesResults = [
            {
                src: '/Content/Image/imageSample1.jpg'
            },
            {
                src: '/Content/Image/imageSample2.jpg'
            },
            {
                src: '/Content/Image/imageSample3.jpg'
            }
        ];
        $scope.$on('getImageKeyword', function (event, args) {
            $scope.keyword = args.item;
            $scope.showResults = true;
        });

        $scope.goSearch = function (keyword, path) {
            if (keyword.length > 0) {
                $location.path(path).search({ keyword: keyword });
                $timeout(function () {
                    $rootScope.$broadcast('getImageKeyword', { item: keyword });
                }, 100);
            } else {
                $location.path(path).search('');
            }
        };

        $scope.goHome = function () {
            $location.path('/').search('');
        };

        $scope.openImage = function (src) {
            $scope.detailImageSrc = src;
            $scope.showOverlay = true;
        };

        $scope.closeImageOverlay = function () {
            $scope.showOverlay = false;
        };
    }]);

BingApp.controller('VideosController', ['$scope', '$location', '$rootScope', '$timeout',
    function VideosController($scope, $location, $rootScope, $timeout) {

    }]);

BingApp.controller('MapsController', ['$scope', '$location', '$rootScope', '$timeout',
    function MapsController($scope, $location, $rootScope, $timeout) {

    }]);

BingApp.controller('NewsController', ['$scope', '$location', '$rootScope', '$timeout',
    function NewsController($scope, $location, $rootScope, $timeout) {

    }]);

BingApp.controller('ExploreController', ['$scope', '$location', '$rootScope', '$timeout',
    function ExploreController($scope, $location, $rootScope, $timeout) {

    }]);

BingApp.controller('HistoryController', ['$scope', '$location', '$rootScope', '$timeout',
    function HistoryController($scope, $location, $rootScope, $timeout) {

    }]);

/* Auto focus on input search box */
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

BingApp.directive('hitEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.hitEnter);
                });
                event.preventDefault();
            }
        });
    };
});

/* Bing App Services */
/* I made the fake service for the sake of getting search results json data by calling http get to
   specific API functions*/
BingApp.service('WebResultService', ['$http', function WebResultService($http) {
    this.getWebSearchResults = function (args, callback) {
        $http.get('', { params: { args: args } }).then(callback);
    };

    this.getImagesSearchResults = function (args) {
        $http.get('', { params: { args: args } }).then(callback);
    };

    this.getVideosSearchResults = function (args) {
        $http.get('', { params: { args: args } }).then(callback);
    };
}]);


