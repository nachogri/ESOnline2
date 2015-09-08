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
        static readonly IClienteRepository clienteRepo = new EFClienteRepository();

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
            IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetAll();
            //IEnumerable<ProductoVendido> productosVendidos = productosVendidosRepo.GetAll().Where(p => p.FechaVencimiento <= DateTime.Today.AddMonths(12));

            foreach (ProductoVendido productoVendido in productosVendidos)
	        {
                productoVendido.Cliente=clienteRepo.Get(productoVendido.ClienteID);		                 
	        }

            
            return Json(productosVendidos, JsonRequestBehavior.AllowGet);                                    
        }

    }
}
