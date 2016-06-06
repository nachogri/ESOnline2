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
            var action = svcUtils.getAction();

            if (action == "Edit" && svcUtils.getObjectId() != "") {
                $scope.getProducto();
            }

            if (action == "List") {
                $scope.getAllProductos();
            }            
        };

        $scope.getAllProductos = function () {
            $("#wait").show();
            svcESONlineUI.productos.getAll()
                .success(function (data) {
                    $scope.productos = data;
                    $("#wait").hide();
                })
                .error(function (err) {
                    svcNotifications.alert("Ha ocurrido un error:" + err);
                    $("#wait").hide();
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
                $("#wait").show();
                if (String($scope.nombreBusqueda).length == 0) {
                    $scope.load();
                }
                else {
                    svcESONlineUI.productos.getByNombre($scope.nombreBusqueda)
                   .success(function (data) {
                       $scope.productos = data;
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
            svcNotifications.deleteConfirm('Seguro que quiere eliminar este producto?', 'Eliminar ' + $scope.producto.Nombre, svcESONlineUI, deleteProducto);
        };
        
        function deleteProducto() {            
            svcESONlineUI.productos.delete($scope.producto.ID).success(function () {
                svcBrowser.setNewLocation("/Producto/List");            
            });
        }

        $scope.load();
    })

angular.module('mdlControllers')
    .controller('ctlClienteProducto', function ($scope, $rootScope, svcESONlineUI, svcUtils, svcNotifications, svcBrowser) {
       
        $scope.productos = [];        
        $scope.anios = [];        
        $scope.ErrorList = "";        
        $scope.nuevoProductoVendido = {};
        $scope.lblVenta = "Nuevo";
        $scope.clsConfirmar = "glyphicon glyphicon-plus";
        $scope.editMode = false;

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
           
            if ($scope.editMode == false) {
                newProductoVendido.ProductoID = producto.Producto.ID;
                newProductoVendido.Producto = producto.Producto;
                newProductoVendido.FechaVenta = svcUtils.getCurrentDate();
                newProductoVendido.FechaVencimiento = svcUtils.calcularVencimiento(svcUtils.getCurrentDate(), producto.Producto.Vencimiento);                
                newProductoVendido.Fabricacion = $scope.nuevoProductoVendido.Fabricacion;
                newProductoVendido.NumeroSerie = $scope.nuevoProductoVendido.NumeroSerie;

                if (cliente.ProductosVendidos == null) {
                    cliente.ProductosVendidos = [];
                }

                if (cliente.ProductosVigentes == null) {
                    cliente.ProductosVigentes = [];
                }
                 
                cliente.ProductosVendidos.push(newProductoVendido);
                cliente.ProductosVigentes.push(newProductoVendido);
            }
            else {
                for (var i = 0; i < cliente.ProductosVendidos.length ; i++) {
                    if (cliente.ProductosVendidos[i].ID == producto.ID && producto.ID != 0) {
                        cliente.ProductosVendidos[i] = producto;
                    }
                }
            }

            $scope.nuevoProductoVendido = {};
            $scope.nuevoProductoVendido.Producto = $scope.productos[0];
            $scope.nuevoProductoVendido.Fabricacion = svcUtils.getCurrentYear();

            $scope.editMode = false;
            $scope.lblVenta = "Nuevo";
            $scope.clsConfirmar = "glyphicon glyphicon-plus";            
        };

        $scope.editProductoVendido = function (cliente, producto) {            
            $scope.nuevoProductoVendido = producto;
            $scope.editMode = true;
            $scope.lblVenta = "Editar";
            $scope.clsConfirmar = "glyphicon glyphicon-ok";
        };


        $scope.removeProductoVendido = function (cliente, producto) {
            for (var i = 0; i < cliente.ProductosVendidos.length ; i++) {                
                if (cliente.ProductosVendidos[i].ID == producto.ID && producto.ID != 0)
                {                    
                    cliente.ProductosVendidos.splice(i, 1);
                }
            }
            
            var index = cliente.ProductosVigentes.indexOf(producto);            
            if (index != -1)
            {
                cliente.ProductosVigentes.splice(index, 1);
            }

            var index = cliente.ProductosVencidos.indexOf(producto);
            if (index != -1)
            {
                cliente.ProductosVencidos.splice(index, 1);
            }                        
        };

        $scope.recargarProductoVendido = function (cliente, producto, vencido) {
            producto.FechaVencimiento = svcUtils.calcularVencimiento(svcUtils.getCurrentDate(), producto.Producto.Vencimiento);
            producto.FechaAviso = null;
            for (var i = 0; i < cliente.ProductosVendidos.length ; i++) {
                if (cliente.ProductosVendidos[i].ID == producto.ID && producto.ID != 0) {                    
                    cliente.ProductosVendidos[i] = producto;
                }
            }

            if (vencido) {
                var index = cliente.ProductosVencidos.indexOf(producto);
                if (index != -1) {
                    cliente.ProductosVencidos.splice(index, 1);
                }

                cliente.ProductosVigentes.push(producto);
            }            
        }

        $scope.alertProductoVendido = function (cliente, producto) {
            producto.FechaAviso = svcUtils.getCurrentDate();
            for (var i = 0; i < cliente.ProductosVendidos.length ; i++) {
                if (cliente.ProductosVendidos[i].ID == producto.ID && producto.ID != 0) {
                    cliente.ProductosVendidos[i] = producto;
                }
            }                        
        }
        
        
        $scope.load();                             
    })