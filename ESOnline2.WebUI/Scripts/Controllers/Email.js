"use strict"

angular.module('mdlControllers').directive('clienteEmails', function () {
    return {
        restrict: 'E',
        templateUrl: '/ClienteEmail/List'
    };
});

angular.module('mdlControllers')
.controller('ctlEmail', function ($scope,svcESONlineUI) {

    svcESONlineUI.tiposEmail.getAll()
            .success(function (data) {
               $scope.TiposEmail = data;
            });

    $scope.addEmail = function (cliente) {               
        var newEmail = {};
        newEmail.ID = 0;        
        newEmail.Casilla = $scope.NuevaCasillaEmail;
        newEmail.Tipo = $scope.NuevoTipoEmail;

        if (cliente.Emails == null) {
            cliente.Emails = [];
        }
        cliente.Emails.push(newEmail);

        $scope.NuevaCasillaEmail = "";
        $scope.NuevoTipoEmail = "";
    };

    $scope.removeEmail = function (cliente,index) {
        cliente.Emails.splice(index, 1);
    }
})