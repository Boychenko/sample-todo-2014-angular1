using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Todo.Web
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            UpdateDatabase();//only for DEMO. In real life CI should do this
        }

        private static void UpdateDatabase()
        {
            var persistenceConfig = new Persistence.Migrations.Configuration();
            var migrator = new DbMigrator(persistenceConfig);
            migrator.Update();

            var identityConfig = new Identity.IdentityMigrations.Configuration();
            migrator = new DbMigrator(identityConfig);
            migrator.Update();
        }
    }
}
