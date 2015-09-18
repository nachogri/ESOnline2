using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ESOnline2.Domain.Abstract;
using ESOnline2.Domain.Concrete;
using ESOnline2.Domain;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ESOnline2.WebUI.Controllers
{
    public class VencimientoController : Controller
    {
        static readonly IProductoVendidoRepository productosVendidosRepo = new EFProductoVendidoRepository();        

        [HttpGet]
        public ActionResult List()
        {
            return View();
        }
        
        [HttpGet]
        public JsonResult GetAllProductosVendidos()
        {
            return Json(productosVendidosRepo.GetAll(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllVencimientos()
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidos();            
                  
            return Json(productosVendidos, JsonRequestBehavior.AllowGet);                                    
        }

    }
}
