﻿"use strict";

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
                    
                    deserializeDates();
                    calculateVencimientos();                    
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
            if (svcNotifications.confirm('Seguro que quiere eliminar este Cliente?')) {
                svcESONlineUI.clientes.delete($scope.cliente.ID).success(function () {
                    svcBrowser.setNewLocation("/Cliente/List");
                });
            }
        };
       

        function deserializeDates() {
            if ($scope.cliente.ProductosVendidos != undefined) {                
                for (var i = 0; i < $scope.cliente.ProductosVendidos.length; i++) {
                    var FechaVenta = new Date(parseInt($scope.cliente.ProductosVendidos[i].FechaVenta.replace("/Date(", "").replace(")/", ""), 10));
                    var FechaVencimiento = new Date(parseInt($scope.cliente.ProductosVendidos[i].FechaVencimiento.replace("/Date(", "").replace(")/", ""), 10));

                    $scope.cliente.ProductosVendidos[i].FechaVenta = FechaVenta;
                    $scope.cliente.ProductosVendidos[i].FechaVencimiento = FechaVencimiento;
                }
            }
        };

        function calculateVencimientos() {
            var today = new Date();            
            var vencimiento = new Date();
            $scope.cliente.ProductosVigentes = [];
            $scope.cliente.ProductosVencidos = [];

            for (var i = 0; i < $scope.cliente.ProductosVendidos.length; i++) {                
                vencimiento = $scope.cliente.ProductosVendidos[i].FechaVencimiento;
                if (vencimiento < today) {                    
                    $scope.cliente.ProductosVencidos.push($scope.cliente.ProductosVendidos[i]);                    
                }
                else {                    
                    $scope.cliente.ProductosVigentes.push($scope.cliente.ProductosVendidos[i]);
                }
            }            
        }

        $scope.load();
    })

