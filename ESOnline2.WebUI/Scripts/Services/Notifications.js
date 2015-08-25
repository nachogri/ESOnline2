angular.module('mdlESOnlineApp')
	.service('svcNotifications', function () {
	    return {
	        alert: function (message) {
	            return bootbox.alert(message);
	        },
	        confirm: function (message) {
	            return confirm(message);
	        },
	        deleteConfirm: function (message, title, svcESONlineUI, callback) {
	            return bootbox.dialog({
	                message: message,
	                title: title,
	                buttons: {
	                    success: {
	                        label: "Cancelar",
	                        className: "btn",
	                    },
	                    danger: {
	                        label: "Eliminar!",
	                        className: "btn-danger",
	                        callback: function () {
	                            callback();
	                        }
	                    }
	                }
	            });
	        }
	    };
	});