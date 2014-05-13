using System.Data.Entity.ModelConfiguration;

using Todo.Domain.Models;

namespace Todo.Persistence.Mappings
{
    public class ItemMap : EntityTypeConfiguration<Item>
    {
        public ItemMap()
        {
            this.HasKey(i => i.Id);
            this.Property(i => i.Title).IsRequired().HasMaxLength(250);
        }
    }
}