using System.Collections.Generic;

namespace Todo.Domain.Models
{
    public class User
    {
        public long Id { get; set; }

        public ICollection<Item> Items { get; set; }
    }
}