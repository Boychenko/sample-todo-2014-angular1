using System.Diagnostics;

using Microsoft.Owin;
using Microsoft.Owin.Cors;

using Owin;

[assembly: OwinStartup(typeof(Todo.Web.Startup))]

namespace Todo.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);

            ConfigureAuth(app);
        }
    }
}