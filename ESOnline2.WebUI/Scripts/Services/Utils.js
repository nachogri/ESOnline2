﻿var s4 = function () {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

var Guid = function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

angular.module('mdlESOnlineApp')
	.service('svcUtils', function ($window) {	    
	    return {
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
	    }
	    };	    
	});