using System.Web;
using System.Web.Optimization;

namespace Todo.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/library").Include(
                      "~/Scripts/jquery-{version}.js",
                      "~/Scripts/angular.js",
                      "~/Scripts/angular-route.js",
                      "~/Scripts/angular-resource.js",
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.matchmedia.addListener.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                      "~/Scripts/toastr.js",
                      "~/Scripts/underscore.js"));

            bundles.Add(new ScriptBundle("~/bundles/todoApp").Include(
                      "~/app/js/common/common.js",
                      "~/app/js/common/config.exceptionHandler.js",
                      "~/app/js/common/config.js",
                      "~/app/js/common/directives/directives.js",
                      "~/app/js/common/filters/filters.js",
                      "~/app/js/common/services/logger.js",
                      "~/app/js/common/services/modalService.js",
                      "~/app/js/common/services/routeResolver.js",
                      "~/app/js/common/services/routeConfigurator.js",
                      "~/app/js/common/services/modal-tpls.js",
                      "~/app/js/common/services/common.js",
                      "~/app/js/todo/todo.js",
                      "~/app/js/todo/services/datalayer/dataservice.item.js",
                      "~/app/js/todo/services/datalayer/dataservice.references.js",
                      "~/app/js/todo/services/datalayer/dataservice.js",
                      "~/app/js/todo/services/session.js",
                      "~/app/js/todo/services/auth.js",
                      "~/app/js/todo/directives/directives.js",
                      "~/app/js/todo/controllers/itemListController.js",
                      "~/app/js/todo/controllers/loginController.js",
                      "~/app/js/todo/controllers/registerController.js",
                      "~/app/js/todo/config.route.js",
                      "~/app/js/todo/config.authToken.js",
                      "~/app/js/todo/config.authErrorHandler.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/toastr.css",
                      "~/Content/site.css"));
        }
    }
}
