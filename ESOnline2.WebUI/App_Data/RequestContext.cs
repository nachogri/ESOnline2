using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ESOnline2.Domain;

namespace ESOnline2.WebUI.Data
{
    internal static class RequestContext
    {
        internal static ESOnlineDBEntities Current
        {
            get
            {
                if (!HttpContext.Current.Items.Contains("ESOnlineDBEntities"))
                {
                    HttpContext.Current.Items.Add("ESOnlineDBEntities", new ESOnlineDBEntities());
                }
                return HttpContext.Current.Items["ESOnlineDBEntities"] as ESOnlineDBEntities;
            }
        }
    }
}