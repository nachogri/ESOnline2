"use strict";

angular.module('mdlControllers')
    .controller('ctlAccount', function ($scope, $rootScope, svcESONlineUI, svcUtils, svcNotifications, svcBrowser) {

        $scope.User = {};
        $scope.Users = [];
        $scope.nombreBusqueda = "";
        $scope.ErrorList = "";
        $scope.RoleAdmin = true;
        $scope.RoleEmpleado = false;
        $scope.RoleVisitante = false;

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

        $scope.changeRole = function (data) {
            switch (data) {
                case "Administrador":
                    $scope.RoleAdmin = true;
                    $scope.RoleEmpleado = false;
                    $scope.RoleVisitante = false;
                    break;
                case "Empleado":
                    $scope.RoleAdmin = false;
                    $scope.RoleEmpleado = true;
                    $scope.RoleVisitante = false;
                    break;
                case "Visitante":
                    $scope.RoleAdmin = false;
                    $scope.RoleEmpleado = false;
                    $scope.RoleVisitante = true;
                    break;
                default:
                    $scope.RoleAdmin = false;
                    $scope.RoleEmpleado = false;
                    $scope.RoleVisitante = false;
                    break;
            }            
        }
        
        $scope.load();
    })

