using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ESOnline2.WebUI.Controllers
{
    public class PaginationController : Controller
    {
        //
        // GET: /ClienteDireccion/
        [HttpGet]
        public ActionResult Control()
        {
            return PartialView();
        }

        [HttpGet]
        public ActionResult Controlsm()
        {
            return PartialView();
        }
    }
}
