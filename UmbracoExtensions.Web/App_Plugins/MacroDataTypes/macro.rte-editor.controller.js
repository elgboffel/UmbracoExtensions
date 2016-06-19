angular.module("umbraco")
    .controller("Macro.RichTextEditor",
    function ($scope) {
        $scope.textInput = {
            view: 'rte',
            value: $scope.model.value,
            config: {
                editor: {
                    toolbar: ["code", "styleselect", "bold", "italic", "underline", "link"],
                    stylesheets: ["rte"],
                    dimensions: { height: 300 }
                }
            }
        };
        $scope.$watch('rte.value', function (newValue, oldValue) {
            $scope.model.value = newValue;
        });
    });