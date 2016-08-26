var app = angular.module('mouldCatalog', []);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

/*app.filter('myFilter', function() {
  
  return function(items) {
    if (selectedProducent == "Іспанія") {
      return items = espanaMoulds;
    } debugger;
    if (selectedProducent == "Сербія") {
      return items = serbMoulds;
    }

    };
});    */

app.controller('mouldCtrl', function($scope, $http) {
    $scope.mouldProducent = ["","Сербія", "Іспанія", "Польща", "Україна"];
    $scope.mouldMaterial = ["", "дерево", "пластик", "метал"];
    $scope.mouldWidths = [14, 17];
    $scope.selectedProducent = $scope.mouldProducent[0];
    $scope.selectedMaterial = $scope.mouldMaterial[0];
    // $scope.selectedWidth = $scope.mouldWidths[0];
    $scope.allMoulds = [];
    $scope.viewMoulds = [];
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    };
    


    $http.get("assets/json/injac_katalog.json").then(function(response) {
        $scope.serbMoulds = response.data;
        angular.forEach($scope.serbMoulds, function(obj) {
            obj.producent = 'Сербія';
            obj.material = "дерево";
        });
        $scope.allMoulds = $scope.serbMoulds;
        // debugger;
        // $scope.mouldWidths = $scope.serbMoulds.width;
    });

    $http.get("assets/json/garcia_katalog.json").then(function(response) {
        $scope.espanaMoulds = response.data;
        angular.forEach($scope.espanaMoulds, function(obj) {
            obj.producent = 'Іспанія';
            obj.material = "дерево";
        });


        $scope.allMoulds = $scope.allMoulds.concat($scope.espanaMoulds);
        /*$scope.mouldWidths = $scope.mouldWidths.concat($scope.espanaMoulds.width);
        console.log ($scope.serbMoulds.width); */

    });

    






});