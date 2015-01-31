"use strict";

angular.module('mdlControllers')
    .controller('ctlCliente', function ($scope, svcESONlineUI, svcUtils, svcNotifications,svcBrowser) {

        $scope.cliente = {};        
        $scope.cliente.Telefonos = [];
        $scope.cliente.Emails = [];
        $scope.cliente.Direcciones = [];
        $scope.cliente.Webs = [];
        $scope.clientes = [];
        $scope.nombreBusqueda = "";
        $scope.ErrorList = "";
        $scope.sizePagina = 10;
        $scope.paginaActual = 1;
        $scope.paginas = [];

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
                   
                    CalcularPaginas();
                })
                .error(function (err) {
                    svcNotifications.alert("Ha ocurrido un error:" + err);
                });
        };

        $scope.getCliente = function () {
            svcESONlineUI.clientes.get(svcUtils.getObjectId())
                .success(function (data) {
                    $scope.cliente = data;
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
                handleErrors(data,$scope);
            });
        };

        $scope.update = function () {
            svcESONlineUI.clientes.update({
                cliente:$scope.cliente
            })
            .success(function () {
                svcBrowser.setNewLocation("/Cliente/List/");
            }).error(function (data, status, headers, config) {
                handleErrors(data, $scope);
            });
        };

        $scope.delete = function () {
            if (svcNotifications.confirm('Seguro que quiere eliminar este Cliente?')) {
                svcESONlineUI.clientes.delete($scope.cliente.ID).success(function () {
                    svcBrowser.setNewLocation("/Cliente/List");
                });
            }
        };

        function updateErrors(errors,$scope) {            
            $scope.errors = {};            
            $scope.errors.formErrors = {};
            $scope.errors.pageError = "";

            if (errors) {
                for (var i = 0; i < errors.length; i++) {
                    $scope.errors.formErrors[errors[i].Key] = errors[i].Message;                    
                }
            }
        }

        function handleErrors (data,$scope) {
            if (data.Errors) {
                updateErrors(data.Errors,$scope);
            } else if (data.message) {
                $scope.errors.pageError = data.message;
                svcNotifications.alert($scope.errors.pageError);
            } else if (data) {
                $scope.errors.pageError = data;
                svcNotifications.alert($scope.errors.pageError);
            } else {
                $scope.errors.pageError = "An unexpected error has occurred, please try again later.";
                svcNotifications.alert('Error',$scope.errors.pageError);
            }            
        };       
      
        $scope.CambiarSizePagina = function (data) {
            $scope.sizePagina = data;
            CalcularPaginas();
        }

        $scope.CambiarPagina = function (data) {
            if (data > $scope.paginaActual && $scope.paginaActual < ($scope.paginas.length-1))
                $scope.paginaActual = data;

            if (data < $scope.paginaActual && $scope.paginaActual > 0)
                $scope.paginaActual = data;
        }

        function CalcularPaginas() {            
            $scope.paginas = [];
            $scope.paginas[0] = 1;
            for (var i = 2; i < ($scope.clientes.length / $scope.sizePagina) + 1 ; i++) {
                $scope.paginas[i - 1] = i;
            }
            $scope.paginaActual = 0;
        }

        $scope.load();

    })

angular.module('mdlControllers')
    .filter('offset', function () {
        return function (input, start) {
            start = parseInt(start, 10);
            return input.slice(start);
        };
    });