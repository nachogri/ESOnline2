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
	            getWithVencimientos: function () {
	                return $http.get('/Cliente/GetClientesWithVencimientos');
	            },
	            getWithVencimientosToday: function () {
	                return $http.get('/Cliente/GetClientesWithVencimientosToday');
	            },
	            getWithVencimientosLastMonth: function () {
	                return $http.get('/Cliente/GetClientesWithVencimientosLastMonth');
	            },
	            getWithVencimientosLastYear: function () {
	                return $http.get('/Cliente/GetClientesWithVencimientosLastYear');
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
                getAllToday: function () {
                    return $http.get('/Vencimiento/GetAllVencimientosToday');
                },
                getAllLastMonth: function () {
                    return $http.get('/Vencimiento/GetAllVencimientosLastMonth');
                },
                getAllLastYear: function () {
                    return $http.get('/Vencimiento/GetAllVencimientosLastYear');
                },
                getAllByTimeRange: function (from, to) {
                    return $http.get('/Vencimiento/GetAllByTimeRange/'+from+'/'+to);
                },               
                getAllProductosVendidos: function () {
                    return $http.get('/Vencimiento/GetAllProductosVendidos');
                }
            },

            accounts: {
                getAll: function () {
                    return $http.get('/Account/GetAllUsers');
                },                
                getByNombre: function (id) {
                    return $http.get('/Account/GetAllGetAllUsersByName/' + id);
                },
                get: function (id) {
                    return $http.get('/Account/GetUser/' + id);
                },
                getRolesByUser: function (id) {
                    return $http.get('/Account/GetRolesByUser/' + id);
	            },
                update: function (data) {
                    return $http.post('/Account/Edit', data);
                },
                delete: function (id) {
                    return $http.delete('/Account/Delete/'+ id);
                }
            }
	    };
	});