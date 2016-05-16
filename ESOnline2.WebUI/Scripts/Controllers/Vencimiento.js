"use strict";

angular.module("mdlControllers")
    .controller("ctlVencimiento", function ($scope, svcESONlineUI, svcNotifications, svcUtils) {
        $scope.vencimientos = {};
        $scope.clientes = {};
        $scope.order = 'Cliente.Nombre';
        $scope.reverse = 'false';
        $scope.TableView = true;
        $scope.NoVencimientos = false;
        $scope.showTelefonos = true;
        $scope.showDirecciones = true;


        $scope.load = function ()
        {
            $("#wait").show();
            svcESONlineUI.vencimientos.getClientesWithVencimientos()
                .success(function (data) {
                    if (data.length == 0)
                        $scope.NoVencimientos = true;
                    else
                        $scope.NoVencimientos = false;

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
                    $("#wait").hide();
                })
                .error(function (err) {
                    svcNotifications.alert("Ha ocurrido un error:" + err);
                    $("#wait").hide();
                });           
        };

        $scope.setOrder = function (desiredOrder) {            
            $scope.order = desiredOrder;
        }

        function loadClientes() {
            $("#wait").show();            
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
            $("#wait").hide();
        }
       
        $scope.findDireccionInMap = function (direccion) {            
            svcUtils.findDireccionInMap(direccion);
        }
        
        $scope.load();        
    });