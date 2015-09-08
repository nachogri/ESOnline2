angular.module('mdlESOnlineApp')
	.service('svcESONlineUI', function ($http) {
	    return {
	        clientes: {	            
	            getAll: function () {
	                return $http.get('/Cliente/GetAllClientes');
	            },
	            get: function (id) {
	                return $http.get('/Cliente/GetCliente/' + id);
	            },
	            getByNombre: function (id) {
	                return $http.get('/Cliente/GetClientesByNombre/' + id);
	            },
	            create:
                    function (data) {
                        return $http.post('/Cliente/CreateCliente', data);
                    },
	            update:
                    function (data) {
                        return $http.post('/Cliente/UpdateCliente', data);
                    },
	            delete: function (id) {
	                return $http.delete('/Cliente/DeleteCliente/' + id);
	            }            
	        },

	        tiposTelefono: {
	            getAll: function () {
	                return $http.get('ClienteTelefono/GetAllTiposTelefono');
	            }
	        },
	 
	        tiposEmail: {
	            getAll: function () {
	                return $http.get('ClienteEmail/GetAllTiposEmail');
	            }
	        },
	 
	        tiposDireccion: {
	            getAll: function () {
	                return $http.get('ClienteDireccion/GetAllTiposDireccion');
	        }
	        },

	        tiposWeb: {
	            getAll: function () {
	                return $http.get('ClienteWeb/GetAllTiposWeb');
	            }
	        },

            productos: {	            
	            getAll: function () {
	                return $http.get('/Producto/GetAllProductos');
	            },
	            get: function (id) {
	                return $http.get('/Producto/GetProducto/' + id);
	            },
	            getByNombre: function (id) {
	                return $http.get('/Producto/GetProductosByNombre/' + id);
	            },
	            create:
                    function (data) {
                        return $http.post('/Producto/CreateProducto', data);
                    },
	            update:
                    function (data) {
                        return $http.post('/Producto/UpdateProducto', data);
                    },
	            delete: function (id) {
	                return $http.delete('/Producto/DeleteProducto/' + id);
	            }            
            },

            vencimientos: {
                getAll: function () {
                    return $http.get('/Vencimiento/GetAllVencimientos');
                },
                getAllProductosVendidos: function () {
                    return $http.get('/Vencimiento/GetAllProductosVendidos');
                }
            }
	    };
	});