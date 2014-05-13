using System.Collections.Generic;
using System.Threading.Tasks;

using Todo.Domain.BusinessObjects;
using Todo.Domain.BusinessObjects.Query;
using Todo.Domain.Models;

namespace Todo.Domain.Contracts.Services
{
    public interface IItemService
    {
        Task<QueryResponse<Item>> Get(long userId, BaseQuery request);

        Task<Item> Get(long userId, long id);

        Task<Item> Create(long userId, Item item);
        
        Task<Item> Update(long userId, Item item);

        Task Delete(long getAppUserId, long id);
    }
}