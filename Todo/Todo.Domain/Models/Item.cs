using System;

namespace Todo.Domain.Models
{
    public class Item
    {
        public long Id { get; set; }

        public int? Priority { get; set; }

        public DateTimeOffset? DueDate { get; set; }

        public long UserId { get; set; }

        public User User { get; set; }
    }
}