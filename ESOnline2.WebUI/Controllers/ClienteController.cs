using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using ESOnline2.Domain.Abstract;
using ESOnline2.Domain.Concrete;
using ESOnline2.Domain;

namespace ESOnline2.WebUI.Controllers
{
    public class ClienteController : Controller
    {
        static readonly IClienteRepository clienteRepo = new EFClienteRepository();

        public ClienteController()
        {

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
            return Json(clienteRepo.GetAll(),JsonRequestBehavior.AllowGet);
        }
      
        [HttpGet]
        public JsonResult GetCliente(int id)
        {
            return Json(clienteRepo.Get(id),JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetClientesByNombre(string id)
        {
            return Json(clienteRepo.GetAll().Where(c => c.Nombre.ToLower().Contains(id.ToLower()) || c.Apellido.ToLower().Contains(id.ToLower())),JsonRequestBehavior.AllowGet);
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
                 return Json(new { Status = "Not found" },JsonRequestBehavior.AllowGet); 
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
