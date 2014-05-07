using System;
using System.Globalization;
using System.Security.Claims;
using System.Security.Principal;

using Microsoft.AspNet.Identity;

namespace Todo.Identity
{
    public static class IdentityExtentions
    {
        public static long GetAppUserId(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirstValue(AppClaimTypes.Id);
            return Int64.Parse(claim, CultureInfo.InvariantCulture);
        }
    }
}