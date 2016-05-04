using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using ESOnline2.WebUI.Infrastructure;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using ESOnline2.Domain;

namespace ESOnline2.WebUI
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {        
        protected void Application_Start()
        {            
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);            
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();

            ControllerBuilder.Current.SetControllerFactory(new NinjectControllerFactory());          

            //System.Data.Entity.Database.SetInitializer(new System.Data.Entity.DropCreateDatabaseIfModelChanges<ESOnline2.Domain.ESOnlineDBEntities>());                      

            WebMatrix.WebData.WebSecurity.InitializeDatabaseConnection("ESOnlineDBEntitiesMembership", "UserProfile", "UserId", "UserName", false);                                        
        }

        protected void Application_End()
        {            
        }

        protected void Session_OnStart()
        {           
        }

        protected void Session_OnEnd()
        {        
        }

        protected void Application_BeginRequest(Object sender, EventArgs e)
        {
            
        }

        protected void Application_EndRequest(Object sender, EventArgs e)
        {
            //var entityContext = HttpContext.Current.Items["ESOnlineDBEntities"] as ESOnlineDBEntities;
            //if (entityContext != null)
            //    entityContext.Dispose();
        }

    }
}