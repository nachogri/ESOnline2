"use strict";

angular.module('mdlControllers')
    .controller('ctlTab', function ($scope) {
         
        $scope.Tabs = [
            { nombre: "Datos", selected: true},
            { nombre: "Productos", selected: false}        
        ]

        $scope.changeTab = function (tab) {           
            for (var i = 0; i < $scope.Tabs.length; i++) {
                if ($scope.Tabs[i].nombre==tab.nombre)
                    $scope.Tabs[i].selected = true;
                else
                    $scope.Tabs[i].selected = false;                
            }            
        }        
    })

