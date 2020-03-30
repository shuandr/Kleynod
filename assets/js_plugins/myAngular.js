var app = angular.module('mouldCatalog', ['ngAnimate', 'ngLocale']);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

app.controller('mouldCtrl', function($scope, $http) {
    $scope.mouldProducent = ["",  "Іспанія", "Італія", "США", "Сербія"];
    $scope.mouldMaterial = ["", "дерево", "МДФ"];
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

    var euroExchange = 32;
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

    $http.get("assets/json/mould_catalog.json").then(function(response) {
        $scope.allMouldsCatalog = response.data;

        $scope.allMouldsCatalog.garcia.forEach(function(obj) {
            obj.producent = 'Іспанія';
            obj.material = "дерево";
            obj.price *= euroExchange;
        });
        $scope.allMouldsCatalog.injac.forEach(function(obj) {
            obj.producent = 'Сербія';
            obj.material = "дерево";
            obj.price *= euroExchange;

        });
        $scope.allMouldsCatalog.framerica.forEach(function(obj) {
            obj.producent = 'США';
            obj.material = "МДФ";
        });
        $scope.allMouldsCatalog.esel.forEach(function(obj) {
            obj.producent = 'Італія';
            obj.material = "дерево";
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