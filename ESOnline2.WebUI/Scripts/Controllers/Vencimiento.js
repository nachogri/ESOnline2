﻿"use strict";

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
        $scope.showAvisos = true;
        $scope.timeRange = "Monthly";
        
        $scope.titulo = "Vencimientos último mes";


        $scope.load = function ()
        {
            $("#wait").show();                                           
            $scope.getAllLastMonth();
        };

        $scope.setOrder = function (desiredOrder) {            
            $scope.order = desiredOrder;
        }

        function loadClientes(data) {
            $("#wait").show();

            if ($scope.clientes.length != undefined) {
                for (var i = 0; i < $scope.vencimientos.length; i++) {
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].Cliente.ID == $scope.vencimientos[i].ClienteID) {
                            $scope.vencimientos[i].Cliente = data[x].Cliente;
                            break;
                        }
                    }
                }
                $("#wait").hide();
            }
            else
            {                
                //If Clientes were not properly loaded
                $scope.load();
            }        
        }
       
        $scope.findDireccionInMap = function (direccion) {            
            svcUtils.findDireccionInMap(direccion);
        }
        
        $scope.getAllToday = function () {            
            $("#wait").show();
            $scope.timeRange = "Daily";
            $scope.titulo = "Vencimientos hoy";

            if ($scope.showAvisos) {
                //Load Clientes
                svcESONlineUI.clientes.getWithAvisosToday()
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

                svcESONlineUI.vencimientos.getAllWithAvisosToday()
                   .success(function (data) {
                       $scope.vencimientos = data;

                       loadClientes($scope.clientes);
                       svcUtils.deserializeDates($scope.vencimientos);
                       //$("#wait").hide();
                   })
                   .error(function (err) {
                       svcNotifications.alert("Ha ocurrido un error:" + err);
                       $("#wait").hide();
                   });
            }
            else {
                svcESONlineUI.clientes.getWithVencimientosToday()
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

                svcESONlineUI.vencimientos.getAllToday()
                .success(function (data) {
                    $scope.vencimientos = data;

                    loadClientes($scope.clientes);

                    svcUtils.deserializeDates($scope.vencimientos);
                    //$("#wait").hide();
                })
                .error(function (err) {
                    svcNotifications.alert("Ha ocurrido un error:" + err);
                    $("#wait").hide();
                });
            }
            
        }

        $scope.getAllLastMonth = function () {
            $("#wait").show();
            $scope.timeRange = "Monthly";
            $scope.titulo = "Vencimientos último mes";

            if ($scope.showAvisos) {
                //Load Clientes
                svcESONlineUI.clientes.getWithAvisosLastMonth()
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

                //Load Vencimientos
                svcESONlineUI.vencimientos.getAllWithAvisosLastMonth()
                  .success(function (data) {
                      $scope.vencimientos = data;

                      loadClientes($scope.clientes);

                      svcUtils.deserializeDates($scope.vencimientos);
                      //$("#wait").hide();
                  })
                  .error(function (err) {
                      svcNotifications.alert("Ha ocurrido un error:" + err);
                      $("#wait").hide();
                  });
            }
            else {
                //Load Clientes
                svcESONlineUI.clientes.getWithVencimientosLastMonth()
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

                //Load Vencimientos
                svcESONlineUI.vencimientos.getAllLastMonth()
                  .success(function (data) {
                      $scope.vencimientos = data;

                      loadClientes($scope.clientes);

                      svcUtils.deserializeDates($scope.vencimientos);
                      //$("#wait").hide();
                  })
                  .error(function (err) {
                      svcNotifications.alert("Ha ocurrido un error:" + err);
                      $("#wait").hide();
                  });

            }                           
        }

        $scope.getAllLastYear = function () {            
            $("#wait").show();            
            $scope.timeRange = "Yearly";
            $scope.titulo = "Vencimientos último año";

            if ($scope.showAvisos) {
                //Load Clientes
                svcESONlineUI.clientes.getWithAvisosLastYear()
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

                svcESONlineUI.vencimientos.getAllWithAvisosLastYear()
                   .success(function (data) {
                       $scope.vencimientos = data;

                       loadClientes($scope.clientes);
                       svcUtils.deserializeDates($scope.vencimientos);
                       //$("#wait").hide();
                   })
                   .error(function (err) {
                       svcNotifications.alert("Ha ocurrido un error:" + err);
                       $("#wait").hide();
                   });
            }
            else {
                //Load Clientes
                svcESONlineUI.clientes.getWithVencimientosLastYear()
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

                //Load Vencimientos
                svcESONlineUI.vencimientos.getAllLastYear()
                .success(function (data) {
                    $scope.vencimientos = data;

                    loadClientes($scope.clientes);
                    svcUtils.deserializeDates($scope.vencimientos);
                    //$("#wait").hide();
                })
                .error(function (err) {
                    svcNotifications.alert("Ha ocurrido un error:" + err);
                    $("#wait").hide();
                });
            }
            
        }

        $scope.switchAvisosView = function () {
            $("#wait").show();
            $scope.showAvisos = !$scope.showAvisos;

            if ($scope.timeRange == "Daily")
                $scope.getAllToday();
            if ($scope.timeRange == "Monthly")
                $scope.getAllLastMonth();
            if ($scope.timeRange == "Yearly")
                $scope.getAllLastYear();
        }

        $scope.load();
    });