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
                svcESONlineUI.productos.delete($scope.producto.ID).success(function () {
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

angular.module('mdlControllers')
    .controller('ctlClienteProducto', function ($scope, svcESONlineUI, svcUtils, svcNotifications, svcBrowser) {
       
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
            var anioDesde = getCurrentYear() - 10;
            var anioHasta = getCurrentYear() + 2;

            for (var i = anioDesde; i < anioHasta; i++) {
                $scope.anios.push(i);
            }
            $scope.nuevoProductoVendido.Fabricacion = getCurrentYear();
        };

        $scope.addProductoVendido = function (cliente, producto) {            
            var newProductoVendido = {};            
           
            newProductoVendido.ProductoID = producto.Producto.ID;
            newProductoVendido.Producto = producto.Producto;           
            newProductoVendido.FechaVenta = getCurrentDate();            
            newProductoVendido.FechaVencimiento = calcularVencimiento(getCurrentDate(),producto.Producto.Vencimiento);
            newProductoVendido.Fabricacion = $scope.nuevoProductoVendido.Fabricacion;
            newProductoVendido.NumeroSerie = $scope.nuevoProductoVendido.NumeroSerie;
                        
            if (cliente.ProductosVendidos == null) {
                cliente.ProductosVendidos = [];
            }

            cliente.ProductosVendidos.push(newProductoVendido);

            $scope.nuevoProductoVendido = {};
            $scope.nuevoProductoVendido.Producto = $scope.productos[0];
            $scope.nuevoProductoVendido.Fabricacion = getCurrentYear();
        };

        $scope.removeProductoVendido = function (cliente, index) {
            cliente.ProductosVendidos.splice(index, 1);
        };
        
        $scope.load();

        function calcularVencimiento(fecha, mesesVencimiento) {                        
            var vencimento = new Date(fecha);
            vencimento.setMonth(vencimento.getMonth() + mesesVencimiento);
            return vencimento;
        }

        $scope.formatDate = function (data) {
                        
            if (data.length) {
                var date = new Date(parseInt(data.substr(6)));
            } else {
                var date = data;
            }
            
            return data;
        }

        function getCurrentDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();

          
            if(dd<10) {
                dd='0'+dd
            } 

            if(mm<10) {
                mm='0'+mm
            } 

            today = mm + '/' + dd + '/' + yyyy;
            return today;
        }

        function getCurrentYear() {
            var date = new Date();
            return date.getFullYear();
        }
    })