angular.module("mdlControllers")
    .controller("ctlMenu", function ($scope, $rootScope, svcBrowser, $route, $location, $routeParams) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
    });