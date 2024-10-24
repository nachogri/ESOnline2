﻿"use strict"

angular.module('mdlControllers').directive('clienteDirecciones', function () {
    return {
        restrict: 'E',
        templateUrl: '/ClienteDireccion/List'
    };
});

angular.module('mdlControllers')
.controller('ctlDireccion', function ($scope, svcESONlineUI, svcBrowser, svcUtils) {

    svcESONlineUI.tiposDireccion.getAll()
            .success(function (data) {
                $scope.TiposDireccion = data;               
                $scope.NuevoTipo = $scope.TiposDireccion[0];
            });

    $scope.addDireccion = function (cliente) {

        var newDireccion = {};
        newDireccion.ID = 0;
        newDireccion.Tipo = $scope.NuevoTipo;
        newDireccion.Descripcion = $scope.NuevaDescripcion;

        if (cliente.Direcciones == null) {
            cliente.Direcciones = [];
        }

        cliente.Direcciones.push(newDireccion);

        $scope.NuevoTipo = $scope.TiposDireccion[0];
        $scope.NuevaDescripcion = "";
    };

    $scope.removeDireccion = function (cliente, index) {
        cliente.Direcciones.splice(index, 1);
    };

    $scope.findDireccionInMap = function (direccion) {
        svcUtils.findDireccionInMap(direccion);
    }
})