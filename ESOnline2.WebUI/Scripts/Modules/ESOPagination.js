﻿"use strict";

angular.module('mdlESOPagination').directive('paginationControl', function () {
    return {
        restrict: 'E',
        templateUrl: "/Pagination/Control",
        controller: function ($scope, Paginator) {
            $scope.paginator = Paginator;                
            }       
        }
});

angular.module('mdlESOPagination').directive('paginationControlsm', function () {
    return {
        restrict: 'E',
        templateUrl: "/Pagination/Controlsm",
        controller: function ($scope, Paginator) {
            $scope.paginator = Paginator;
        }
    }
});

angular.module('mdlESOPagination')
    .filter('paginate', function (Paginator) {
        return function (input, rowsPerPage) {
            if (!input || !input.length) {
                return input;
            }

            if (rowsPerPage) {                
                Paginator.rowsPerPage = rowsPerPage;
            }
            
            Paginator.itemCount = input.length;
                                    
            return input.slice(parseInt(Paginator.page * Paginator.rowsPerPage), parseInt((Paginator.page + 1) * Paginator.rowsPerPage + 1) - 1);
        }
    })

    .filter('forLoop', function () {
        return function (input, start, end) {
            input = new Array(end - start);
            for (var i = 0; start < end; start++, i++) {
                input[i] = start;
            }

            return input;
        }
    })

    .service('Paginator', function ($rootScope) {
        this.page = 0;
        this.rowsPerPage = 50;
        this.itemCount = 0;

        this.setPage = function (page) {
            if (page > this.pageCount()) {
                return;
            }

            this.page = page;
        };

        this.nextPage = function () {
            
            if (this.isLastPage()) {
                return;
            }           
            this.page++;
        };

        this.previousPage = function () {
            if (this.isFirstPage()) {
                return;
            }

            this.page--;
        };

        this.firstPage = function () {
            this.page = 0;
        };

        this.lastPage = function () {
            this.page = this.pageCount() - 1;
        };

        this.isFirstPage = function () {
            return this.page == 0;
        };

        this.isLastPage = function () {
            return this.page == this.pageCount() - 1;
        };

        this.pageCount = function () {
            return Math.ceil(parseInt(this.itemCount) / parseInt(this.rowsPerPage));
        };

        this.setRowsPerPage = function (data) {
            this.rowsPerPage = data;
            this.page = 0;
        };
    })
