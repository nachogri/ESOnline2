using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ESOnline2.Domain.Abstract;
using ESOnline2.Domain.Concrete;
using ESOnline2.Domain;

namespace ESOnline2.WebUI.Controllers
{
    public class ProductoController : Controller
    {
        static readonly IProductoRepository productoRepo = new EFProductoRepository();

        public ProductoController()
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
        public JsonResult GetAllProductos()
        {
            return Json(productoRepo.GetAll(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetProducto(int id)
        {
            return Json(productoRepo.Get(id), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetProductosByNombre(string id)
        {
            return Json(productoRepo.GetAll().Where(c => c.Nombre.ToLower().Contains(id.ToLower())), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreateProducto(Producto producto)
        {
            if (ModelState.IsValid)
            {
                producto = productoRepo.Add(producto);
                return Json(new { Status = "Successful" }, JsonRequestBehavior.AllowGet);
            }
            else
                return JsonErrorResponse(JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateProducto(Producto producto)
        {
            if (ModelState.IsValid)
            {
                if (!productoRepo.Update(producto))
                    return Json(new { Status = "Not found" }, JsonRequestBehavior.AllowGet);
                else
                    return Json(new { Status = "Successful" }, JsonRequestBehavior.AllowGet);
            }
            else
                return JsonErrorResponse(JsonRequestBehavior.AllowGet);
        }

        [HttpDelete]
        public JsonResult DeleteProducto(int id)
        {
            Producto producto = productoRepo.Get(id);
            if (producto == null)
                return Json(new { Status = "Not found" }, JsonRequestBehavior.AllowGet);
            else
            {
                productoRepo.Remove(id);
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
