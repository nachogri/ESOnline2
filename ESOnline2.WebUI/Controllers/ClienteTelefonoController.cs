using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ESOnline2.Domain.Abstract;
using ESOnline2.Domain.Concrete;
using ESOnline2.Domain.Entities;

namespace ESOnline2.WebUI.Controllers
{
    public class ClienteTelefonoController : Controller
    {
        //
        // GET: /Telefono/

        [HttpGet]
        public ActionResult List()
        {
            return PartialView();
        }

        [HttpGet]
        public JsonResult GetAllTiposTelefono()
        {
            return Json(Enum.GetNames(typeof(TipoTelefono)), JsonRequestBehavior.AllowGet);
        }
    }
}
