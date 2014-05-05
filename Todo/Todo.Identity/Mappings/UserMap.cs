using System.Data.Entity.ModelConfiguration;

using Todo.Domain.Models;

namespace Todo.Identity.Mappings
{
    public class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            this.HasKey(u => u.Id);
            this.Ignore(u => u.Items);
            this.ToTable("Users", "dbo");
        }
    }
}