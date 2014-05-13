using System.Collections.Generic;

using Todo.Domain.BusinessObjects.Query;

namespace Todo.Domain.BusinessObjects.Query
{
    public class BaseQuery
    {
        public Paging Paging { get; set; }
        public List<Sorting> Sortings { get; set; }
        public BaseQuery()
        {
            Sortings = new List<Sorting>();
            Paging = new Paging();
        }
    }
}