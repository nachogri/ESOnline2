"use strict";

angular.module('mdlControllers').directive('clienteProductos', function () {
    return {
        restrict: 'E',
        templateUrl: '/ClienteProducto/List'
    };
});

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
                svcUtils.handleErrors(data, $scope);
            });
        };

        $scope.update = function () {            
            svcESONlineUI.productos.update({
                producto: $scope.producto
            })
            .success(function () {
                svcBrowser.setNewLocation("/Producto/List/");
            }).error(function (data, status, headers, config) {
                svcUtils.handleErrors(data, $scope);
            });
        };

        $scope.delete = function () {
            if (svcNotifications.confirm('Seguro que quiere eliminar este producto?')) {                
                svcESONlineUI.productos.delete($scope.producto.ID).success(function () {
                    svcBrowser.setNewLocation("/Producto/List");
                });
            }
        };

        $scope.load();
    })

angular.module('mdlControllers')
    .controller('ctlClienteProducto', function ($scope, $rootScope, svcESONlineUI, svcUtils, svcNotifications, svcBrowser) {
       
        $scope.productos = [];        
        $scope.anios = [];        
        $scope.ErrorList = "";        
        $scope.nuevoProductoVendido = {};

        $scope.load = function () {           
            $scope.getAllProductos();
            $scope.getAnios();            
        };

        $scope.getAllProductos = function () {
            svcESONlineUI.productos.getAll()
                .success(function (data) {
                    $scope.productos = data;
                    $scope.nuevoProductoVendido.Producto = data[0];
                })
                .error(function (err) {
                    svcNotifications.alert("Ha ocurrido un error:" + err);
                });
        };

        $scope.getAnios = function () {            
            var anioDesde = svcUtils.getCurrentYear() - 10;
            var anioHasta = svcUtils.getCurrentYear() + 2;

            for (var i = anioDesde; i < anioHasta; i++) {
                $scope.anios.push(i);
            }
            $scope.nuevoProductoVendido.Fabricacion = svcUtils.getCurrentYear();
        };

        $scope.addProductoVendido = function (cliente, producto) {            
            var newProductoVendido = {};            
           
            newProductoVendido.ProductoID = producto.Producto.ID;
            newProductoVendido.Producto = producto.Producto;           
            newProductoVendido.FechaVenta = svcUtils.getCurrentDate();
            newProductoVendido.FechaVencimiento = svcUtils.calcularVencimiento(svcUtils.getCurrentDate(), producto.Producto.Vencimiento);
            newProductoVendido.Fabricacion = $scope.nuevoProductoVendido.Fabricacion;
            newProductoVendido.NumeroSerie = $scope.nuevoProductoVendido.NumeroSerie;
                        
            if (cliente.ProductosVendidos == null) {
                cliente.ProductosVendidos = [];
            }

            cliente.ProductosVendidos.push(newProductoVendido);

            $scope.nuevoProductoVendido = {};
            $scope.nuevoProductoVendido.Producto = $scope.productos[0];
            $scope.nuevoProductoVendido.Fabricacion = svcUtils.getCurrentYear();

            $rootScope.$broadcast("updatedProductos");
        };

        $scope.removeProductoVendido = function (cliente, producto) {
            var index=cliente.ProductosVendidos.indexOf(producto);
            cliente.ProductosVendidos.splice(index, 1);
            $rootScope.$broadcast("updatedProductos");
        };
        
        $scope.load();                             
    })