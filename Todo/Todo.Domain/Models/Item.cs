using System;

namespace Todo.Domain.Models
{
    public class Item
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public Priority Priority { get; set; }

        public DateTime DueDate { get; set; }

        public long UserId { get; set; }

        public User User { get; set; }

        public bool Completed { get; set; }
    }
}