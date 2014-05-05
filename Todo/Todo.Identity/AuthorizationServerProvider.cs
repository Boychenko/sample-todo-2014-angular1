using System.Threading.Tasks;

using Microsoft.Owin.Security.OAuth;

namespace Todo.Identity
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            return base.GrantResourceOwnerCredentials(context);
        }
    }
}