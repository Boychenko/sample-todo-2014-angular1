using System;
using System.Collections.Generic;
using System.Net;

namespace Todo.Web.Models.Dtos
{
    public class ListResponse<T>
    {
        public List<T> List { get; set; }

        public int Total { get; set; }

        public int PageSize { get; set; }

        public int Page { get; set; }        
    }
}