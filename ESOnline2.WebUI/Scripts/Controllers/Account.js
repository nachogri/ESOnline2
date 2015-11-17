"use strict";

angular.module('mdlControllers')
    .controller('ctlAccount', function ($scope, $rootScope, svcESONlineUI, svcUtils, svcNotifications, svcBrowser) {

        $scope.User = {};
        $scope.Users = [];
        $scope.nombreBusqueda = "";
        $scope.ErrorList = "";

        $scope.load = function () {
            switch (svcUtils.getAction()) {
                case "Edit":
                    if (svcUtils.getObjectId() != "") {
                        $scope.getUser();
                    }
                case "List":
                    $scope.getAllUsers();
            }

        };

        $scope.getUser = function () {
            svcESONlineUI.accounts.get(svcUtils.getObjectId())
                .success(function (data) {
                    $scope.User = data;                   
                })
                .error(function (err) {
                    svcNotifications.alert(err.Message || err.message);
                });
        };

        $scope.getAllUsers = function () {            
            svcESONlineUI.accounts.getAll()
                .success(function (data) {
                    $scope.Users = data;                    
                })
                .error(function (err) {
                    svcNotifications.alert("Ha ocurrido un error:" + err);
                });
        };


        $scope.searchByName = function (event) {
            if (event.which == 13) {               
                if (String($scope.nombreBusqueda).length == 0) {
                    $scope.load();
                }
                else {
                    svcESONlineUI.accounts.getByNombre($scope.nombreBusqueda)
                   .success(function (data) {
                       $scope.Users = data;
                   })
                   .error(function (err) {
                       svcNotifications.alert(err.Message || err.message);
                   });
                }
            }
        };
        
        $scope.load();
    })

