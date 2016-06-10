using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using ESOnline2.Domain.Abstract;
using ESOnline2.Domain.Concrete;
using ESOnline2.Domain;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using ESOnline2.WebUI.Data;

namespace ESOnline2.WebUI.Controllers
{

    public class ClienteController : Controller
    {
        private IClienteRepository clienteRepo;

        public ClienteController(IClienteRepository clienteRepo)
        {            
            this.clienteRepo = clienteRepo;
        }        
        
        [HttpGet]
        public ActionResult List()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            return View(id);
        }

        [HttpGet]
        public ActionResult New()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAllClientes()
        {            
            return Json(clienteRepo.GetAll().Where(c => c.Nombre.ToLower().StartsWith("A",StringComparison.OrdinalIgnoreCase)), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCliente(int id)
        {
            Cliente cli = clienteRepo.Get(id);
            
            JsonResult jsonResult = Json(cli, JsonRequestBehavior.AllowGet);
                        
            return jsonResult; 
        }

        [HttpGet]
        public JsonResult GetClientesByNombre(string id)
        {
            id.Replace("*", "").Replace(".","");
            return Json(clienteRepo.GetAll().Where(c => c.Nombre.ToLower().Contains(id.ToLower()) || (c.Apellido!=null && c.Apellido.ToLower().Contains(id.ToLower()))), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetClientesWithVencimientos()
        {
            List<Cliente> clientes = (List<Cliente>)clienteRepo.GetAllWithVencimientos(false).ToList();
          
            var filtered = clientes
                            .Where(c => c.ProductosVencidos.Count>=1)                            
                            .Select(c => new { Cliente = c, ProductosVendidos = c.ProductosVencidos.Count>=1});
                        
            return Json(filtered, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetClientesWithVencimientosToday()
        {
            List<Cliente> clientes = (List<Cliente>)clienteRepo.GetAllWithVencimientos(1, false).ToList();

            var filtered = clientes
                            .Where(c => c.ProductosVencidos.Count >= 1)
                            .Select(c => new { Cliente = c, ProductosVendidos = c.ProductosVencidos.Count >= 1 });

            return Json(filtered, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetClientesWithVencimientosLastMonth()
        {
            List<Cliente> clientes = (List<Cliente>)clienteRepo.GetAllWithVencimientos(30, false).ToList();

            var filtered = clientes
                            .Where(c => c.ProductosVencidos.Count >= 1)
                            .Select(c => new { Cliente = c, ProductosVendidos = c.ProductosVencidos.Count >= 1 });

            return Json(filtered, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetClientesWithVencimientosLastYear()
        {
            List<Cliente> clientes = (List<Cliente>)clienteRepo.GetAllWithVencimientos(365, false).ToList();

            var filtered = clientes
                            .Where(c => c.ProductosVencidos.Count >= 1)
                            .Select(c => new { Cliente = c, ProductosVendidos = c.ProductosVencidos.Count >= 1 });

            return Json(filtered, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetWithAvisos()
        {
            List<Cliente> clientes = (List<Cliente>)clienteRepo.GetAllWithVencimientos(true).ToList();

            var filtered = clientes
                            .Where(c => c.ProductosVencidos.Count >= 1)
                            .Select(c => new { Cliente = c, ProductosVendidos = c.ProductosVencidos.Count >= 1 });

            return Json(filtered, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetWithAvisosToday()
        {
            List<Cliente> clientes = (List<Cliente>)clienteRepo.GetAllWithVencimientos(1, true).ToList();

            var filtered = clientes
                            .Where(c => c.ProductosVencidos.Count >= 1)
                            .Select(c => new { Cliente = c, ProductosVendidos = c.ProductosVencidos.Count >= 1 });

            return Json(filtered, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetWithAvisosLastMonth()
        {
            List<Cliente> clientes = (List<Cliente>)clienteRepo.GetAllWithVencimientos(30, true).ToList();

            var filtered = clientes
                            .Where(c => c.ProductosVencidos.Count >= 1)
                            .Select(c => new { Cliente = c, ProductosVendidos = c.ProductosVencidos.Count >= 1 });

            return Json(filtered, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetWithAvisosLastYear()
        {
            List<Cliente> clientes = (List<Cliente>)clienteRepo.GetAllWithVencimientos(365, true).ToList();

            var filtered = clientes
                            .Where(c => c.ProductosVencidos.Count >= 1)
                            .Select(c => new { Cliente = c, ProductosVendidos = c.ProductosVencidos.Count >= 1 });

            return Json(filtered, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreateCliente(Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                cliente = clienteRepo.Add(cliente);
                return Json(new { Status = "Successful" }, JsonRequestBehavior.AllowGet);
            }
            else
                return JsonErrorResponse(JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateCliente(Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                if (!clienteRepo.Update(cliente))
                    return Json(new { Status = "Not found" }, JsonRequestBehavior.AllowGet);
                else
                    return Json(new { Status = "Successful" }, JsonRequestBehavior.AllowGet);
            }
            else
                return JsonErrorResponse(JsonRequestBehavior.AllowGet);
        }

        [HttpDelete]
        public JsonResult DeleteCliente(int id)
        {
            Cliente cliente = clienteRepo.Get(id);
            if (cliente == null)
                return Json(new { Status = "Not found" }, JsonRequestBehavior.AllowGet);
            else
            {
                clienteRepo.Remove(id);
                return Json(new { Status = "Successful" }, JsonRequestBehavior.AllowGet);
            }
        }

        protected JsonResult JsonErrorResponse(JsonRequestBehavior jsonRequestBehaviour)
        {

            var errorList = new List<JsonValidationError>();
            foreach (var key in ModelState.Keys)
            {
                ModelState modelState = null;
                if (ModelState.TryGetValue(key, out modelState))
                {
                    foreach (var error in modelState.Errors)
                    {
                        errorList.Add(new JsonValidationError()
                        {
                            Key = key,
                            Message = error.ErrorMessage
                        });
                    }
                }
            }

            var response = new JsonResponse()
            {
                Type = "Validation",
                Message = "These are the errors from the validation",
                Errors = errorList
            };

            Response.StatusCode = 400;
            return Json(response, jsonRequestBehaviour);
        }
    }
}
