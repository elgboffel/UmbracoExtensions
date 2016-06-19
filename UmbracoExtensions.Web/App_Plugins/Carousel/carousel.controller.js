angular.module("umbraco").controller("Our.CarouselController",
    function ($scope, assetsService, $http, dialogService) {

        var defaultItem = { heading: "", text: "" };

        if (!$scope.model.value) {
            $scope.model.value = [];
        }

        if ($scope.model.value.length > 0) {
            $scope.selected = $scope.model.value[0];
        }

        $scope.select = function (index) {
            $scope.selected = index;
        };

        $scope.remove = function ($index) {
            $scope.model.value.splice($index, 1);
        };

        $scope.add = function () {
            $scope.model.value.splice($scope.model.value.length + 1, 0, angular.copy(defaultItem));
            $scope.selected = $scope.model.value[$scope.model.value.length-1];
        };

        $scope.sortableOptions = {
            handle: ".icon-navigation",
            axis: "y",
            delay: 150,
            distance: 5
        };

        // Load css asset
        assetsService.loadCss("/App_Plugins/Carousel/carousel.css");
});