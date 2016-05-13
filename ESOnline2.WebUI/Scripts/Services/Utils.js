var s4 = function () {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

var Guid = function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

angular.module('mdlESOnlineApp')
	.service('svcUtils', function ($window, svcBrowser) {
	    return {

            /*Navigation*/
	        getObjectId: function () {
	            var absoluteUrlPath = $window.location.href;
	            var results = String(absoluteUrlPath).split("/");
	            
	            if (results != null && results.length > 0) {
	                var id = results[results.length - 1];
	              	                
	                return id;
	            }
	        },

	        getAction: function () {
	        var absoluteUrlPath = $window.location.href;

	        var results = String(absoluteUrlPath).split("/");
	            	        
	        if (results != null && results.length > 0) {
	            var action = "";
	           
	            if (results.length>5) {
	                action = results[results.length - 2];
	            }
	            else
	            {
	                action = results[results.length - 1];
	            }	            	           
	            return action;
	        }
	        },

	        /*Dates*/
	        getCurrentDate: function () {
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

	            today = mm+'/'+dd+'/'+yyyy;
	            return today;
	        },

	        getCurrentYear: function () {
	            var date = new Date();
	            return date.getFullYear();
	        },

	        calcularVencimiento: function (fecha, mesesVencimiento) {                        
	            var vencimento = new Date(fecha);
	            vencimento.setMonth(vencimento.getMonth() + mesesVencimiento);
	            return vencimento;
	        },

	        deserializeDates: function (dates) {	            
	            if (dates != undefined) {
	                for (var i = 0; i < dates.length; i++) {	                    
	                    var FechaVenta = new Date(parseInt(dates[i].FechaVenta.replace("/Date(", "").replace(")/", ""), 10));
	                    var FechaVencimiento = new Date(parseInt(dates[i].FechaVencimiento.replace("/Date(", "").replace(")/", ""), 10));

	                    dates[i].FechaVenta = FechaVenta;
	                    dates[i].FechaVencimiento = FechaVencimiento;
                    }
                }
	        },


	        /*Errors*/
	        updateErrors: function (errors, $scope) {
	            $scope.errors = {};
	            $scope.errors.formErrors = {};
	            $scope.errors.pageError = "";

	            if (errors) {
	                for (var i = 0; i < errors.length; i++) {
	                    $scope.errors.formErrors[errors[i].Key] = errors[i].Message;
	                }
	            }
	        },

	        handleErrors: function (data, $scope) {
	            if (data.Errors) {
	                this.updateErrors(data.Errors, $scope);
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
	        },
            
	        /*Misc*/
            findDireccionInMap : function (direccion) {
	            svcBrowser.openNewTab('https://www.google.com/maps/place/' + direccion);
	        }
	    };	    	    
	});