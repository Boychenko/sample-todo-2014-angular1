using System.Collections.Generic;

namespace Todo.Web.Models.Dtos
{
    public class ReferencesResponse
    {
        public Dictionary<int, string> Priorities { get; set; }
    }
}