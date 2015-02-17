"use strict";

angular.module('mdlControllers')
    .controller('ctlProducto', function ($scope, svcESONlineUI, svcUtils, svcNotifications, svcBrowser) {

        $scope.producto = {};        
        $scope.productos = [];
        $scope.nombreBusqueda = "";
        $scope.ErrorList = "";

        $scope.load = function () {
            switch (svcUtils.getAction()) {
                case "Edit":
                    if (svcUtils.getObjectId() != "") {
                        $scope.getProducto();
                    }
                case "List":
                    $scope.getAllProductos();
            }

        };

        $scope.getAllProductos = function () {
            svcESONlineUI.productos.getAll()
                .success(function (data) {
                    $scope.productos = data;
                })
                .error(function (err) {
                    svcNotifications.alert("Ha ocurrido un error:" + err);
                });
        };

        $scope.getProducto = function () {
            svcESONlineUI.productos.get(svcUtils.getObjectId())
                .success(function (data) {
                    $scope.producto = data;                    
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
                    svcESONlineUI.productos.getByNombre($scope.nombreBusqueda)
                   .success(function (data) {
                       $scope.productos = data;
                   })
                   .error(function (err) {
                       svcNotifications.alert(err.Message || err.message);
                   });
                }
            }
        };

        $scope.save = function () {            
            svcESONlineUI.productos.create({
                producto: $scope.producto
            })
            .success(function () {
                svcBrowser.setNewLocation("/Producto/List/");
            }).error(function (data, status, headers, config) {
                handleErrors(data, $scope);
            });
        };

        $scope.update = function () {            
            svcESONlineUI.productos.update({
                producto: $scope.producto
            })
            .success(function () {
                svcBrowser.setNewLocation("/Producto/List/");
            }).error(function (data, status, headers, config) {
                handleErrors(data, $scope);
            });
        };

        $scope.delete = function () {
            if (svcNotifications.confirm('Seguro que quiere eliminar este producto?')) {
                svcESONlineUI.producto.delete($scope.producto.ID).success(function () {
                    svcBrowser.setNewLocation("/Producto/List");
                });
            }
        };

        function updateErrors(errors, $scope) {
            $scope.errors = {};
            $scope.errors.formErrors = {};
            $scope.errors.pageError = "";

            if (errors) {
                for (var i = 0; i < errors.length; i++) {
                    $scope.errors.formErrors[errors[i].Key] = errors[i].Message;
                }
            }
        }

        function handleErrors(data, $scope) {
            if (data.Errors) {
                updateErrors(data.Errors, $scope);
            } else if (data.message) {
                $scope.errors.pageError = data.message;
                svcNotifications.alert($scope.errors.pageError);
            } else if (data) {
                $scope.errors.pageError = data;
                svcNotifications.alert($scope.errors.pageError);
            } else {
                $scope.errors.pageError = "An unexpected error has occurred, please try again later.";
                svcNotifications.alert('Error', $scope.errors.pageError);
            }
        };

        $scope.load();
    })

