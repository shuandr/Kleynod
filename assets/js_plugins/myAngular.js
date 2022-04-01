var app = angular.module('kleynod', ['ngRoute', 'ngSanitize']);



app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

app.config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|viber|tel|mailto|chrome-extension):/);
}]);


app.controller('kleynodCtrl', function($scope, $http) {



    $http.get("assets/data/UA-data.json").then(function(response) {
        $scope.UAdata = response.data;
        $scope.data = $scope.UAdata;

    });
    $http.get("assets/data/EN-data.json").then(function(response) {
        $scope.ENdata = response.data;

    });

    $scope.setLang = "en";

    $scope.changeLang = function() {
        if ($scope.setLang == "en") {
           
            $scope.data = $scope.ENdata;
            $scope.setLang = "ua";

        } else {
            $scope.data = $scope.UAdata;
            $scope.setLang = "en";
        }
    };




});