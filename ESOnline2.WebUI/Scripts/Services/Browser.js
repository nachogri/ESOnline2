angular.module('mdlESOnlineApp')
	.service('svcBrowser', function () {
	    return {
	        setNewLocation: function (newLocation) {	            
	            window.location = newLocation;
	        },
	        openNewTab: function (url) {
	            var win = window.open(url, '_blank');
	            win.focus();
	        }
	    };
	});