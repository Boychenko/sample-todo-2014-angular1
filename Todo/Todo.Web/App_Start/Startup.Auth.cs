using System;
using System.Diagnostics;

using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;

using Owin;

using Todo.Identity;

namespace Todo.Web
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {
            app.UsePerOwinContext(IdentityContext.Create);
            app.UsePerOwinContext<AppUserManager>(AppUserManager.Create);

            app.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                Provider = new AuthorizationServerProvider()
            });

            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }
    }
}