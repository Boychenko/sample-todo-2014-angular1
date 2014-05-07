using Microsoft.AspNet.Identity;

namespace Todo.Identity
{
    public class AppUserValidator : UserValidator<AuthenticateUser>
    {
        public AppUserValidator(UserManager<AuthenticateUser, string> manager)
            : base(manager)
        {
            AllowOnlyAlphanumericUserNames = false;
            RequireUniqueEmail = true;
        }

    }
}