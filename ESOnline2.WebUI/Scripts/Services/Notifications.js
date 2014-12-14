angular.module('mdlESOnlineApp')
	.service('svcNotifications', function () {
	    return {
	        alert: bootbox.alert,
	        confirm: function (message) {
	            return confirm(message);
	        }
	    };
	});