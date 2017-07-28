var cesar = angular.module('caesar', ['chart']);

cesar.controller('ctrl1', ['$scope', '$http', function($scope, $http) {
    $scope.frq = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	
	$scope.breakCaesar = function(){
		if($scope.text){
		var data = {"text" : $scope.text};
		var res = $http.post('/json_guess/', data)
		.then(
			function successCallback(response){
				//$scope.tekst = response.data.text;
				$scope.offset = response.data.offset;
				$scope.announcement = "Our spies collected needed information: cipher offset is: " + response.data.offset;
				$scope.announcement_info = "(even spies can be wrong)";
			},
			function errorCallback(response){
				alert("Something went wrong. Please check logs.");
			}
		);
		}
	};	

    $scope.encrypt = function() {
		if(!Number.isInteger($scope.offset)){
			alert("not a number");
			return;
		}
		var actual_offset = $scope.offset%26;
		if(actual_offset == 0){
			$scope.tekst = $scope.text;
			return;
		}
        var data = {"text" : $scope.text,
					"offset" : actual_offset};
		var res = $http.post('/json/', data)
		.then(
			function successCallback(response){
				$scope.tekst = response.data.text;
			},
			function errorCallback(response){
				alert("Something went wrong. Please check server logs.");
			}
		);		
    };
	$scope.decrypt = function() {
		if(!Number.isInteger($scope.offset)){
			alert("not a number");
			return;
		}
		var actual_offset = $scope.offset%26;
		if(actual_offset == 0){
			$scope.tekst = $scope.text;
			return;
		}
        var data = {"text" : $scope.text,
					"offset" : -$scope.offset};
		var res = $http.post('/json/', data)
		.then(
			function successCallback(response){
				$scope.tekst = response.data.text;
			},
			function errorCallback(response){
				alert("Something went wrong. Please check server logs.");
			}
		);		
    };
	// update frequencies chart with every textarea update
	$scope.textUpdate = function() {
		var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
					'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

		var temp = 0;
			for(var i=0; i<26; i++){
				if($scope.text.match(new RegExp(alphabet[i], "i"))){
					$scope.frq[i] = ($scope.text.match(new RegExp(alphabet[i], "ig")).length);
				} else {
					$scope.frq[i] = 0;
				}
			}
	}

}])
