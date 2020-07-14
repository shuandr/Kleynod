var app = angular.module('kleynod', ['ngRoute', 'ngSanitize']);



app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});




app.controller('kleynodCtrl', function($scope, $http) {
   


    $http.get("assets/data/data.json").then(function(response) {
        $scope.data = response.data;

    });




});

