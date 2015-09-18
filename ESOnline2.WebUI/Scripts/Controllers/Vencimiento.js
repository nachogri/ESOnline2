﻿"use strict";

angular.module("mdlControllers")
    .controller("ctlVencimiento", function ($scope, svcESONlineUI, svcUtils) {
        $scope.vencimientos = {};
        $scope.clientes = {};
        $scope.order = 'Cliente.Nombre';
        $scope.reverse = 'false';
        $scope.TableView = true;

        $scope.load = function ()
        {
            
            svcESONlineUI.vencimientos.getClientesWithVencimientos()
                .success(function (data) {                    
                    $scope.clientes = data;
                    for (var i = 0; i < $scope.clientes.length; i++) {                        
                        svcUtils.deserializeDates($scope.clientes[i].Cliente.ProductosVendidos);
                        svcUtils.deserializeDates($scope.clientes[i].Cliente.ProductosVigentes);
                        svcUtils.deserializeDates($scope.clientes[i].Cliente.ProductosVencidos);                        
                    }                    
                    $scope.reverse = false;
                    $scope.setOrder('Cliente.Nombre');
                })
                .error(function (err) {
                    svcNotifications.alert("Ha ocurrido un error:" + err);
                });

            svcESONlineUI.vencimientos.getAll()
                .success(function (data) {
                    $scope.vencimientos = data;

                    loadClientes();
                    svcUtils.deserializeDates($scope.vencimientos);                    
                })
                .error(function (err) {
                    svcNotifications.alert("Ha ocurrido un error:" + err);
                });
        };

        $scope.setOrder = function (desiredOrder) {            
            $scope.order = desiredOrder;
        }

        function loadClientes() {

            svcESONlineUI.clientes.getAll()
              .success(function (data) {
                  $scope.clientesAux = data;

                  for (var i = 0; i < $scope.vencimientos.length; i++) {
                      for (var x = 0; x < $scope.clientesAux.length; x++) {
                          if ($scope.clientesAux[x].ID == $scope.vencimientos[i].ClienteID) {
                              $scope.vencimientos[i].Cliente = $scope.clientesAux[x];
                          }
                      }
                  }
              })
              .error(function (err) {
                  svcNotifications.alert("Ha ocurrido un error:" + err);
              });                       
        }
       
        $scope.load();       
    });