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
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidos(0,false);            
                  
            return Json(productosVendidos, JsonRequestBehavior.AllowGet);                                    
        }

        [HttpGet]
        public JsonResult GetAllVencimientosToday()
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidos(1, false);

            return Json(productosVendidos, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllVencimientosLastMonth()
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidos(30, false);

            return Json(productosVendidos, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllVencimientosLastYear()
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidos(365, false);

            return Json(productosVendidos, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllVencimientosByTimeRange(DateTime fromDate, DateTime toDate )
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidosByTimeRange(fromDate,toDate);

            return Json(productosVendidos, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult GetAllVencimientosWithAvisos()
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidos(0, true);

            return Json(productosVendidos, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllVencimientosWithAvisosToday()
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidos(1, true);

            return Json(productosVendidos, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllVencimientosWithAvisosLastMonth()
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidos(30, true);

            return Json(productosVendidos, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllVencimientosWithAvisosLastYear()
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidos(365, true);

            return Json(productosVendidos, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllVencimientosWithAvisosByTimeRange(DateTime fromDate, DateTime toDate)
        {
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetProductosVencidosByTimeRange(fromDate, toDate);

            return Json(productosVendidos, JsonRequestBehavior.AllowGet);
        }
        
    }
}
