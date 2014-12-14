angular.module('mdlESOnlineApp')
	.service('svcBrowser', function () {
	    return {
	        setNewLocation: function (newLocation) {
	            window.location = newLocation;	            
	        }
	    };
	});