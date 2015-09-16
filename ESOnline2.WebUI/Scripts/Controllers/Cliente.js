"use strict";

angular.module('mdlControllers')
    .controller('ctlCliente', function ($scope,$rootScope, svcESONlineUI, svcUtils, svcNotifications, svcBrowser) {

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
                                        
                    svcUtils.deserializeDates($scope.cliente.ProductosVendidos);
                    svcUtils.deserializeDates($scope.cliente.ProductosVigentes);
                    svcUtils.deserializeDates($scope.cliente.ProductosVencidos);                    
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
                svcUtils.handleErrors(data, $scope);
            });
        };

        $scope.update = function () {
            svcESONlineUI.clientes.update({
                cliente:$scope.cliente
            })
            .success(function () {
                svcBrowser.setNewLocation("/Cliente/List/");
            }).error(function (data, status, headers, config) {
                svcUtils.handleErrors(data, $scope);
            });
        };

       
        $scope.delete = function () {
            svcNotifications.deleteConfirm('Seguro que quiere eliminar este cliente?', 'Eliminar ' + $scope.cliente.Nombre, svcESONlineUI, deleteCliente);
        };

        function deleteCliente() {
            svcESONlineUI.clientes.delete($scope.cliente.ID).success(function () {
                svcBrowser.setNewLocation("/Cliente/List");
            });
        }               

        $scope.load();
    })

