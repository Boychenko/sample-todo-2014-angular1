using System.Data.Entity.ModelConfiguration;

using Todo.Domain.Models;

namespace Todo.Persistence.Mappings
{
    public class ItemMap : EntityTypeConfiguration<Item>
    {
        public ItemMap()
        {
            this.HasKey(u => u.Id);

        }
    }
}