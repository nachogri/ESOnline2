"use strict"

angular.module('mdlControllers').directive('clienteWebs', function () {
    return {
        restrict: 'E',
        templateUrl: '/ClienteWeb/List'
    };
});

angular.module('mdlControllers')
.controller('ctlWeb', function ($scope, svcESONlineUI) {

    svcESONlineUI.tiposWeb.getAll()
            .success(function (data) {
                $scope.TiposWeb = data;
                $scope.NuevoTipoWeb = $scope.TiposWeb[0];
            });

    $scope.addWeb = function (cliente) {
        var newWeb = {};
        newWeb.ID = 0;
        newWeb.URL = $scope.NuevaURLWeb;
        newWeb.Tipo = $scope.NuevoTipoWeb;

        if (cliente.Webs == null) {
            cliente.Webs = [];
        }
        cliente.Webs.push(newWeb);

        $scope.NuevaURLWeb = "";
        $scope.NuevoTipoWeb = $scope.TiposWeb[0];
    };

    $scope.removeWeb = function (cliente, index) {
        cliente.Webs.splice(index, 1);
    }
})