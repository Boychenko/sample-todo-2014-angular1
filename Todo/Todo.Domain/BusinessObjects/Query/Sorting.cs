using System;

namespace Todo.Domain.BusinessObjects.Query
{
    public class Sorting
    {
        public Sorting()
        {
            Asc = true;
        }

        public string Field { get; set; }
        public bool Asc { get; set; }
    }
}