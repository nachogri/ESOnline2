"use strict"

angular.module('mdlControllers').directive('clienteTelefonos', function () {
    return {
        restrict: 'E',
        templateUrl: '/ClienteTelefono/List'
    };
});

angular.module('mdlControllers').controller('ctlTelefono', function ($scope, svcESONlineUI) {

    svcESONlineUI.tiposTelefono.getAll()
            .success(function (data) {
                $scope.TiposTelefono = data;
                $scope.NuevoTipoTelefono = $scope.TiposTelefono[0];
            });

    $scope.addTelefono = function (cliente) {
        var newTelefono = {};
        newTelefono.ID = 0;
        newTelefono.Numero = $scope.NuevoNumeroTelefono;
        newTelefono.Tipo = $scope.NuevoTipoTelefono;
        if (cliente.Telefonos == null) {
            cliente.Telefonos = [];
        }
        cliente.Telefonos.push(newTelefono);

        $scope.NuevoNumeroTelefono = "";
        $scope.NuevoTipoTelefono = $scope.TiposTelefono[0];
    };

    $scope.removeTelefono = function (cliente, index) {
        cliente.Telefonos.splice(index, 1);
    }

});