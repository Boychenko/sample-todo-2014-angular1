using Microsoft.AspNet.Identity;

namespace Todo.Identity
{
    public class AppPasswordValidator : PasswordValidator
    {
        public AppPasswordValidator()
        {
            RequiredLength = 6;
            RequireNonLetterOrDigit = true;
            RequireDigit = true;
            RequireLowercase = true;
            RequireUppercase = true;
        }
    }
}