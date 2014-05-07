using Microsoft.AspNet.Identity.EntityFramework;

using Todo.Domain.Models;

namespace Todo.Identity
{
    public class AuthenticateUser : IdentityUser
    {
        public User User { get; set; }
        public long UserId { get; set; }
    }
}