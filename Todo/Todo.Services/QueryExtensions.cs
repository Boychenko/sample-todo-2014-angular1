using System.Linq;

using Todo.Domain.BusinessObjects.Query;

namespace Todo.Services
{
    public static class QueryExtensions
    {
        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> queryable, Paging paging)
        {
            if (paging.PageSizeValue > 0)
            {
                queryable = queryable.Skip(paging.SkipCount).Take(paging.PageSizeValue);
            }
            return queryable;
        }
    }
}