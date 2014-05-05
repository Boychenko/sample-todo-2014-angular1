using System.Data.Entity.ModelConfiguration;

using Todo.Domain.Models;

namespace Todo.Persistence.Mappings
{
    public class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            this.HasKey(u => u.Id);

            this.HasMany(u => u.Items)
                .WithRequired(i => i.User)
                .HasForeignKey(u => u.UserId);
        }
    }
}