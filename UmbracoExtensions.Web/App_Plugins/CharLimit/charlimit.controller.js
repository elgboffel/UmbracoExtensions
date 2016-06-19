angular.module("umbraco")
    .controller("Datagraf.CharLimitEditorController",
    function ($scope) {
    	$scope.limitChars = function(){
    		var limit = parseInt($scope.model.config.limit);
    		$scope.charsLeft = function () { limit - $scope.model.value.length };
    		$scope.rows = parseInt($scope.model.config.rows);

    		if ($scope.model.value.length > limit )
    		{
    			$scope.info = "You cannot write more then " + limit  + " characters!";
    			$scope.model.value = $scope.model.value.substr( 0, limit );
    		}
    		else
    		{
    			$scope.info = ( limit - $scope.model.value.length ) + " characters left.";
    		}
    	};
    })