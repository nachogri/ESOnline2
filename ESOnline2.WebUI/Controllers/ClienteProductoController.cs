using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ESOnline2.Domain.Abstract;
using ESOnline2.Domain.Concrete;
using ESOnline2.Domain.Entities;
using ESOnline2.WebUI.Controllers;

namespace ESOnline2.WebUI.Controllers
{
    public class ClienteProductoController : Controller
    {
        ProductoController productoCtrl = new ProductoController();

        [HttpGet]
        public ActionResult List()
        {
            return PartialView();
        }

        [HttpGet]
        public JsonResult GetAllProductos()
        {
            return productoCtrl.GetAllProductos();
        }

    }
}
