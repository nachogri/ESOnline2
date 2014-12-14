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
    public class ClienteDireccionController : Controller
    {
        //
        // GET: /ClienteDireccion/
        [HttpGet]
        public ActionResult List()
        {
            return PartialView();
        }

        [HttpGet]
        public JsonResult GetAllTiposDireccion()
        {
            return Json(Enum.GetNames(typeof(TipoDireccion)), JsonRequestBehavior.AllowGet);
        }

    }
}
