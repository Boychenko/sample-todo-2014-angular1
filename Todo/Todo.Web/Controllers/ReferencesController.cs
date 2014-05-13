using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using Todo.Domain.Models;
using Todo.Web.Models.Dtos;

namespace Todo.Web.Controllers
{
    public class ReferencesController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            var result = new ReferencesResponse();
            Dictionary<int, string> priorities = new Dictionary<int, string>();
            foreach (var value in Enum.GetValues(typeof(Priority)).Cast<int>())
            {
                priorities.Add(value, ((Priority) value).ToString());
            }
            result.Priorities = priorities;
            return Ok(result);
        }
    }
}
