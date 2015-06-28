"use strict";

angular.module('mdlControllers')
    .controller('ctlCliente', function ($scope, svcESONlineUI, svcUtils, svcNotifications, svcBrowser) {

        $scope.cliente = {};        
        $scope.cliente.Telefonos = [];
        $scope.cliente.Emails = [];
        $scope.cliente.Direcciones = [];
        $scope.cliente.Webs = [];
        $scope.cliente.ProductosVendidos = [];
        $scope.clientes = [];
        $scope.nombreBusqueda = "";
        $scope.ErrorList = "";        

        $scope.load = function () {
            switch (svcUtils.getAction()) {
                case "Edit":
                    if (svcUtils.getObjectId() != "") {
                        $scope.getCliente();
                    }
                case "List":
                    $scope.getAllClientes();                
            }
            
        };

        $scope.getAllClientes = function () {
            svcESONlineUI.clientes.getAll()
                .success(function (data) {
                    $scope.clientes = data;                                       
                })
                .error(function (err) {
                    svcNotifications.alert("Ha ocurrido un error:" + err);
                });
        };

        $scope.getCliente = function () {
            svcESONlineUI.clientes.get(svcUtils.getObjectId())
                .success(function (data) {
                    $scope.cliente = data;
            })
                .error(function (err) {
                    svcNotifications.alert(err.Message || err.message);
            });
        };                   

        $scope.searchByName = function (event) {
            if (event.which == 13) {
                if (String($scope.nombreBusqueda).length == 0) {
                    $scope.load();
                }
                else {
                    svcESONlineUI.clientes.getByNombre($scope.nombreBusqueda)
                   .success(function (data) {
                        $scope.clientes = data;
                   })
                   .error(function (err) {
                        svcNotifications.alert(err.Message || err.message);
                    });                   
                }
            }
        };

        $scope.save = function () {            
            svcESONlineUI.clientes.create({
                cliente:$scope.cliente                
            })
            .success(function () {
                svcBrowser.setNewLocation("/Cliente/List/");
            }).error(function (data, status, headers, config) {                
                handleErrors(data,$scope);
            });
        };

        $scope.update = function () {
            svcESONlineUI.clientes.update({
                cliente:$scope.cliente
            })
            .success(function () {
                svcBrowser.setNewLocation("/Cliente/List/");
            }).error(function (data, status, headers, config) {
                handleErrors(data, $scope);
            });
        };

        $scope.delete = function () {
            if (svcNotifications.confirm('Seguro que quiere eliminar este Cliente?')) {
                svcESONlineUI.clientes.delete($scope.cliente.ID).success(function () {
                    svcBrowser.setNewLocation("/Cliente/List");
                });
            }
        };

        function updateErrors(errors,$scope) {            
            $scope.errors = {};            
            $scope.errors.formErrors = {};
            $scope.errors.pageError = "";

            if (errors) {
                for (var i = 0; i < errors.length; i++) {
                    $scope.errors.formErrors[errors[i].Key] = errors[i].Message;                    
                }
            }
        }

        function handleErrors (data,$scope) {
            if (data.Errors) {
                updateErrors(data.Errors,$scope);
            } else if (data.message) {
                $scope.errors.pageError = data.message;
                svcNotifications.alert($scope.errors.pageError);
            } else if (data) {
                $scope.errors.pageError = data;
                svcNotifications.alert($scope.errors.pageError);
            } else {
                $scope.errors.pageError = "An unexpected error has occurred, please try again later.";
                svcNotifications.alert('Error',$scope.errors.pageError);
            }            
        };                                    
        $scope.load();
    })

