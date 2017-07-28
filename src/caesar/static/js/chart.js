angular.module('chart', ['chart.js']).controller("BarCtrl", ['$scope', function ($scope) {
  $scope.labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
					'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  $scope.series = ['letters'];
  $scope.data = $scope.frq;
  $scope.height_chart = window.innerHeight*0.1;
}]);
