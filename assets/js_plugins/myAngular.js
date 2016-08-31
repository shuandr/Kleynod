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
    // $scope.mouldWidths = ['', 14,15,17,20,22,24,29,32,42,49,63,70,72,87,90,92];
    $scope.mouldWidths = [
    {value: '1'|'2'|'3'|'4', option:'всі'}, 
    {value: '1', option:'<25 mm'}, 
    {value: '2', option:'25-50 mm'}, 
    {value: '3', option:'50-90 mm'}, 
    {value: '4', option:'>90 mm'}
    ];
    // $scope.mouldWidths = ['', '<25', '>25' & '<50', '>50' & '<90', '>90'];
    $scope.selectedProducent = $scope.mouldProducent[0];
    $scope.selectedMaterial = $scope.mouldMaterial[0];
    // $scope.selectedWidth = $scope.mouldWidths[0];
    $scope.allMoulds = [];
    


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
        angular.forEach($scope.allMoulds, function(obj) {
            if(obj.width <=25){
                obj.widthRange = '1';
            } else if(obj.width >25 && obj.width <=50 )  {
                obj.widthRange = '2';
            } else if (obj.width >50 && obj.width <=90 )  {
                obj.widthRange = '3';
            } else {
                obj.widthRange = '4';
            } 

        });
    });
// debugger;
    






});