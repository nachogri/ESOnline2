"use strict";

angular.module("mdlControllers")
    .controller("ctlVencimiento", function ($scope, svcESONlineUI, svcUtils) {
        $scope.vencimientos = {};
        $scope.order = 'ClienteID';
        $scope.reverse = 'false';

        $scope.load = function ()
        {
            svcESONlineUI.vencimientos.getAll()
                .success(function (data) {
                    $scope.vencimientos = data;
                    
                    svcUtils.deserializeDates($scope.vencimientos);
                })
                .error(function (err) {
                    svcNotifications.alert("Ha ocurrido un error:" + err);
                });
        };

        $scope.setOrder = function (desiredOrder) {            
            $scope.order = desiredOrder;
        }
       
        $scope.load();

    });