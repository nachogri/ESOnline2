"use strict"

angular.module('mdlControllers').directive('clienteDirecciones', function () {
    return {
        restrict: 'E',
        templateUrl: '/ClienteDireccion/List'
    };
});

angular.module('mdlControllers')
.controller('ctlDireccion', function ($scope, svcESONlineUI) {
  

    svcESONlineUI.tiposDireccion.getAll()
            .success(function (data) {
                $scope.TiposDireccion = data;
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

        $scope.NuevoTipo = "";
        $scope.NuevaDescripcion = "";
    };

    $scope.removeDireccion = function (cliente, index) {
        cliente.Direcciones.splice(index, 1);
    }
})