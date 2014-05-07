using System.Data.Entity;

using Microsoft.AspNet.Identity.EntityFramework;

using Todo.Identity.Mappings;

namespace Todo.Identity
{
    public class IdentityContext : IdentityDbContext<AuthenticateUser>
    {
        public static IdentityContext Create()
        {
            return new IdentityContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("identity");
            modelBuilder.Configurations.Add(new UserMap());
            base.OnModelCreating(modelBuilder);
        }
    }
}