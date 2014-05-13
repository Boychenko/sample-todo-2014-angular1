using System;
using System.Collections.Generic;

using Todo.Domain.BusinessObjects.Query;

namespace Todo.Web.Models
{
    public class ListRequest
    {
        public string OrderBy { get; set; }

        public bool Asc { get; set; }

        public int PageSize { get; set; }

        public int Page { get; set; }

        public BaseQuery ToQuery()
        {
            var query = new BaseQuery() { Paging = new Paging() { Page = Page, PageSize = PageSize } };
            if(!String.IsNullOrWhiteSpace(OrderBy))
            {
                query.Sortings = new List<Sorting>() { new Sorting() { Asc = Asc, Field = OrderBy } };
            }
            return query;
        }
    }
}