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
            var action= svcUtils.getAction();
            
            if (action == "Edit" && svcUtils.getObjectId() != "") {
                $scope.getCliente();
            }
            
            if (action == "List") {                
                $scope.getAllClientes();
            }                        
        };

        $scope.getAllClientes = function () {
            $("#wait").show();            
            svcESONlineUI.clientes.getAll()
                .success(function (data) {
                    $scope.clientes = data;
                    $("#wait").hide();
                })
                .error(function (err) {
                    svcNotifications.alert("Ha ocurrido un error:" + err);
                    $("#wait").hide();
                });
        };

        $scope.getCliente = function () {
            $("#wait").show();
            svcESONlineUI.clientes.get(svcUtils.getObjectId())
                .success(function (data) {
                    $scope.cliente = data;
                                              
                    svcUtils.deserializeDates($scope.cliente.ProductosVendidos);
                    svcUtils.deserializeDates($scope.cliente.ProductosVigentes);
                    svcUtils.deserializeDates($scope.cliente.ProductosVencidos);
                    $("#wait").hide();
            })
                .error(function (err) {
                    svcNotifications.alert(err.Message || err.message);
                    $("#wait").hide();
                });            
        };                   

        $scope.searchByName = function (event) {            
            if (event.which == 13) {
                $("#wait").show();
                if (String($scope.nombreBusqueda).length == 0) {
                    $scope.load();                    
                }
                else {
                    svcESONlineUI.clientes.getByNombre($scope.nombreBusqueda)
                   .success(function (data) {
                       $scope.clientes = data;
                       $("#wait").hide();
                   })
                   .error(function (err) {
                       svcNotifications.alert(err.Message || err.message);
                       $("#wait").hide();
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

