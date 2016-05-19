using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ESOnline2.Domain.Abstract;
using ESOnline2.Domain.Concrete;
using ESOnline2.Domain;
using ESOnline2.WebUI.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ESOnline2.WebUI.Controllers
{
    public class VencimientoController : Controller
    {
        private IProductoVendidoRepository productosVendidosRepo;

        public VencimientoController(IProductoVendidoRepository productosVendidosRepo)
        {
            this.productosVendidosRepo = productosVendidosRepo;
        }


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
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidos(0);            
                  
            return Json(productosVendidos, JsonRequestBehavior.AllowGet);                                    
        }

        [HttpGet]
        public JsonResult GetAllVencimientosToday()
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidos(1);

            return Json(productosVendidos, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllVencimientosLastMonth()
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidos(30);

            return Json(productosVendidos, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllVencimientosLastYear()
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidos(365);

            return Json(productosVendidos, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllVencimientosFromDate(DateTime fromDate, DateTime toDate )
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidosByTimeRange(fromDate,toDate);

            return Json(productosVendidos, JsonRequestBehavior.AllowGet);
        }
    }
}
