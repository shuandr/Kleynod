var app = angular.module('kleynod', ['ngRoute', 'ngSanitize']);

app.config(['$compileProvider', "$routeProvider", "$interpolateProvider",

    function($compileProvider, $routeProvider, $interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|viber|tel|mailto|chrome-extension):/);
        $routeProvider
            .when('/main', {
                templateUrl: 'main.html'
            })
            .when('/portfolio', {
                templateUrl: 'portfolio.html'
            })
            .when('/mouldings', {
                templateUrl: 'mouldings.html'
            })
            .when('/passepartout', {
                templateUrl: 'passepartout.html'
            })
            .otherwise({
                redirectTo: '/main'
            });
    }
]);


app.controller('kleynodCtrl', function($scope, $http, $route, $routeParams, $location, $timeout) {

    $http.get("assets/data/UA-data.json").then(function(response) {
        $scope.UAdata = response.data;
        $scope.data = $scope.UAdata;
        $scope.mouldProducent = $scope.data.mouldCat.mouldProducent;
        $scope.mouldMaterial = $scope.data.mouldCat.mouldMaterial;
    });
    $http.get("assets/data/EN-data.json").then(function(response) {
        $scope.ENdata = response.data;

    });

    var euroExchange = 34.5;

    $scope.setLang = "en";

    $scope.changeLang = function() {
        if ($scope.setLang == "en") {

            $scope.setLang = "ua";
            $scope.data = $scope.ENdata;
            $scope.mouldProducent = $scope.data.mouldCat.mouldProducent;
            $scope.mouldMaterial = $scope.data.mouldCat.mouldMaterial;

        } else {
            $scope.data = $scope.UAdata;
            $scope.setLang = "en";
        }
    };

    $scope.mouldWidths = [{
        value: '',
        option: 'всі'
    }, {
        value: '1',
        option: '<25 mm'
    }, {
        value: '2',
        option: '25-50 mm'
    }, {
        value: '3',
        option: '50-90 mm'
    }, {
        value: '4',
        option: '>90 mm'
    }];

    var assignWidthRange = function(obj) {
        if (obj.width <= 25) {
            obj.widthRange = '1';
        } else if (obj.width > 25 && obj.width <= 50) {
            obj.widthRange = '2';
        } else if (obj.width > 50 && obj.width <= 90) {
            obj.widthRange = '3';
        } else {
            obj.widthRange = '4';
        }

    };

    $scope.sort = function(keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    };

    $http.get("assets/data/mould_catalog.json").then(function(response) {
        $scope.allMouldsCatalog = response.data;

        $scope.allMouldsCatalog.garcia.forEach(function(obj) {
            obj.producent = 'es';
            obj.material = "w";
            obj.price *= euroExchange;
        });
        $scope.allMouldsCatalog.injac.forEach(function(obj) {
            obj.producent = 'sr';
            obj.material = "w";
            obj.price *= euroExchange;

        });
        $scope.allMouldsCatalog.framerica.forEach(function(obj) {
            obj.producent = 'us';
            obj.material = "m";
        });
        $scope.allMouldsCatalog.esel.forEach(function(obj) {
            obj.producent = 'it';
            obj.material = "w";
            obj.price *= euroExchange;
        });
        $scope.allMouldsCatalog.werrama.forEach(function(obj) {
            obj.producent = 'pl';
            obj.material = "w";
        });
        $scope.allMouldsCatalog.clever.forEach(function(obj) {
            obj.producent = 'ua';
            obj.material = "p";
            obj.price *= euroExchange;
        });

        var createArray = function() {
            var arr = [];
            for (var key in $scope.allMouldsCatalog) {
                arr.push($scope.allMouldsCatalog[key]);
            }
            var merged = [].concat.apply([], arr);
            return merged;
        }
        $scope.allMoulds = createArray();

        angular.forEach($scope.allMoulds, function(obj) {
            if (obj.width <= 25) {
                obj.widthRange = '1';
            } else if (obj.width > 25 && obj.width <= 50) {
                obj.widthRange = '2';
            } else if (obj.width > 50 && obj.width <= 90) {
                obj.widthRange = '3';
            } else {
                obj.widthRange = '4';
            }

        });
    });
});