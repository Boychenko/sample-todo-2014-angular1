using System.Data.Entity;

using Microsoft.AspNet.Identity.EntityFramework;

using Todo.Identity.Mappings;

namespace Todo.Identity
{
    public class IdentityContext : IdentityDbContext<AuthenticateUser>
    {
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("identity");
            modelBuilder.Configurations.Add(new UserMap());
            base.OnModelCreating(modelBuilder);
        }
    }
}