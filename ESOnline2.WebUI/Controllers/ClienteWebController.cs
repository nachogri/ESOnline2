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
    public class ClienteWebController : Controller
    {
        //
        // GET: /ClienteWeb/

        [HttpGet]
        public ActionResult List()
        {
            return PartialView();
        }

        [HttpGet]
        public JsonResult GetAllTiposWeb()
        {
            return Json(Enum.GetNames(typeof(TipoWeb)), JsonRequestBehavior.AllowGet);
        }

    }
}
