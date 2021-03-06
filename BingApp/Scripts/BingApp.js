﻿var BingApp = angular.module('BingApp', ['ngRoute']);

BingApp.service('eventService', ['$rootScope', function (rootScope) {
    this.broadcastEvent = function (evt, args) {
        args ? rootScope.$broadcast(evt, angular.copy(args)) : rootScope.$broadcast(evt, args);
    };
}]);

BingApp.controller('BingShareController', ['$scope', '$location', '$timeout', 'eventService', '$route',
    function BingShareController($scope, $location, $timeout, eventService, $route) {
        $location.path('/').search('');
        $scope.showWeb = false;
        $scope.showNav = false;
        $scope.subnavs = [];
        $scope.route = '';


        $scope.isActive = function (route) {
            return route === $location.path();
        };
    
        $scope.$on('toggleWebNav', function (event, arg) {
            if (arg.show) {
                console.log("testwebnav");
                $scope.showWeb = true;
            } else {
                $scope.showWeb = false;
            } 
        });

        $scope.mouseOverNav = function (arg) {
            $scope.showNav = true;
            $scope.route = arg;
            switch (arg) {
                case '/images':
                    $scope.subnavs = [
                        {
                            text: 'Search for national parks',
                            keyword: 'national parks'
                        },
                        {
                            text: 'Search for funny GIFs',
                            keyword: 'funny facts'
                        }
                    ];
                    break;
                case '/videos':
                    $scope.subnavs = [
                        {
                            text: 'Top music videos',
                            keyword: 'top music videos'
                        },
                        {
                            text: 'In theater movies',
                            keyword: 'in theater movies'
                        },
                        {
                            text: 'Most watched TV shows',
                            keyword: 'most watched tv shows'
                        }

                    ];
                    break;
                case '/news':
                    $scope.subnavs = [
                        {
                            text: 'Search local news',
                            keyword: 'local'
                        },
                        {
                            text: 'Search US news',
                            keyword: 'US'
                        },
                        {
                            text: 'Find entertainmant news',
                            keyword: 'entertainment'
                        }
                    ];
                    break;
            }
        }

        $scope.mouseLeaveNav = function () {
            $scope.showNav = false;
        };

        $scope.mouseOverSubnav = function () {
            $scope.showNav = true;
        };

        $scope.mouseLeaveSubnav = function () {
            $scope.showNav = false;
            $scope.subnavs = [];
        };

        $scope.goTo = function (route, keyword) {
            switch (route) {
                case '/images':
                    if ($route.current.loadedTemplateUrl !== "bingApp/images") {
                        $location.path('/images').search(keyword);
                    }
                    $timeout(function (e) {
                        eventService.broadcastEvent('getImageKeyword', { item: keyword });
                    }, 100);
                    break;
                case '/videos':
                    if ($route.current.loadedTemplateUrl !== "bingApp/videos") {
                        $location.path('/videos').search(keyword);
                    }
                    $timeout(function (e) {
                        eventService.broadcastEvent('getVideoKeyword', { item: keyword });
                    }, 100);
            }
        };
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

BingApp.controller('HomeController', ['$scope', '$location', '$timeout', 'eventService',
    function HomeController($scope, $location, $timeout, eventService) {
        var afterFirstClick = false;
        eventService.broadcastEvent('toggleWebNav', { show: false });
        $scope.showOverlay = false;
        $scope.searchItem = "";

        $scope.goSearch = function (keyword, path) {
            if (keyword.length > 0) {
                $scope.searchItem = angular.copy(keyword);
                $timeout(function () {
                    eventService.broadcastEvent('getSearchKeyword', { item: keyword });
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

BingApp.controller('WebController', ['$scope', '$location', '$timeout', 'WebResultService', 'eventService',
    function WebController($scope, $location, $timeout, WebResultService, eventService) {
        //Get searchResults data by calling the http get function in WebResultService
        //WebResultService.getWebSearchResults(args, function (response) {
        //    $scope.searchResults = response.data;
        //});
        eventService.broadcastEvent('toggleWebNav', { show: true });

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

    $scope.$on('getSearchKeyword', function (event, args) {
        $scope.keyword = args.item;
        $scope.showResults = true;
    });
    
    $scope.goSearch = function (keyword, path) {
        if (keyword.length > 0) {
            $location.path(path).search({ keyword: keyword });
            $timeout(function () {
                eventService.broadcastEvent('getSearchKeyword', { item: keyword });
            }, 100);
        } else {
            $location.path('/').search('');
        }
    };

    $scope.goHome = function () {
        $location.path('/').search('');
    };
}]);

BingApp.controller('ImagesController', ['$scope', '$location', '$timeout', 'eventService',
    function ImagesController($scope, $location, $timeout, eventService) {
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

        eventService.broadcastEvent('toggleWebNav', { show: true });

        $scope.$on('getImageKeyword', function (event, args) {
            $scope.keyword = args.item;
            $scope.showResults = true;
        });

        $scope.goSearch = function (keyword, path) {
            if (keyword.length > 0) {
                $location.path(path).search({ keyword: keyword });
                $timeout(function () {
                    eventService.broadcastEvent('getImageKeyword', { item: keyword });
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

BingApp.controller('VideosController', ['$scope', '$location', '$timeout', 'eventService',
    function VideosController($scope, $location, $timeout, eventService) {
        eventService.broadcastEvent('toggleWebNav', { show: true });
        $scope.showResults = false;

        $scope.$on('getVideoKeyword', function (event, args) {
            $scope.keyword = args.item;
            $scope.showResults = true;
        });

        $scope.goSearch = function (keyword, path) {
            if (keyword.length > 0) {
                $location.path(path).search({ keyword: keyword });
                $timeout(function () {
                    eventService.broadcastEvent('getVideoKeyword', { item: keyword });
                }, 100);
            } else {
                $location.path(path).search('');
            }
        };

        $scope.goHome = function () {
            $location.path('/').search('');
        };
    }]);

BingApp.controller('MapsController', ['$scope', '$location', '$timeout', 'eventService',
    function MapsController($scope, $location, $timeout, eventService) {
        eventService.broadcastEvent('toggleWebNav', { show: true });
    }]);

BingApp.controller('NewsController', ['$scope', '$location', '$timeout', 'eventService',
    function NewsController($scope, $location, $timeout, eventService) {
        eventService.broadcastEvent('toggleWebNav', { show: true });
    }]);

BingApp.controller('ExploreController', ['$scope', '$location', '$timeout', 'eventService',
    function ExploreController($scope, $location, $timeout, eventService) {
        eventService.broadcastEvent('toggleWebNav', { show: true });
    }]);

BingApp.controller('HistoryController', ['$scope', '$location', '$timeout',
    function HistoryController($scope, $location, $timeout) {

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


