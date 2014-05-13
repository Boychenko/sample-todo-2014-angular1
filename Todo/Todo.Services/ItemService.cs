using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

using Todo.Domain.BusinessObjects;
using Todo.Domain.BusinessObjects.Query;
using Todo.Domain.Contracts;
using Todo.Domain.Contracts.Services;
using Todo.Domain.Models;

namespace Todo.Services
{
    public class ItemService : IItemService
    {

        private readonly IUnitOfWork _uow;

        public ItemService(IUnitOfWork uow)
        {
            if(uow == null)
            {
                throw new ArgumentNullException("uow");
            }
            _uow = uow;
        }

        public async Task<QueryResponse<Item>> Get(long userId, BaseQuery request)
        {
            var query = ForUser(userId);
            query = ApplyOrderBy(query, request.Sortings);
            Paging paging = request.Paging;
            int count = await query.CountAsync();

            paging.FixPageForCount(count);

            return new QueryResponse<Item>
            {
                Total = count,
                Page = paging.PageValue,
                PageSize = paging.PageSizeValue,
                List = await query.ApplyPaging(paging).ToListAsync()
            };

        }

        public async Task<Item> Get(long userId, long id)
        {
            return await ForUser(userId).SingleAsync(i => i.Id == id);
        }

        public async Task<Item> Create(long userId, Item item)
        {
            item.UserId = userId;
            item.DueDate = item.DueDate.Date;
            _uow.ItemRepository.Add(item);
            await _uow.Commit();
            return item;
        }

        public async Task<Item> Update(long userId, Item item)
        {
            item.UserId = userId;
            item.DueDate = item.DueDate.Date;
            _uow.ItemRepository.Update(item);
            await _uow.Commit();
            return item;
        }

        public async Task Delete(long userId, long id)
        {
            var item = await ForUser(userId).SingleOrDefaultAsync(i => i.Id == id);
            if(item != null)
            {
                _uow.ItemRepository.Remove(item);
                await _uow.Commit();
            }
        }

        private IQueryable<Item> ApplyOrderBy(IQueryable<Item> query, List<Sorting> sortings)
        {
            if(sortings == null || sortings.Count == 0)
            {
                return query.OrderBy(i => i.Id);
            }
            var first = sortings.FirstOrDefault();
            foreach (var sorting in sortings)
            {
                switch (sorting.Field.ToLowerInvariant())
                {
                    case "priority":
                        query = PriorityOrder(query, sorting.Asc, sorting != first);
                        break;
                    case "duedate":
                        query = DueDateOrder(query, sorting.Asc, sorting != first);
                        break;
                    default:
                        throw new ArgumentException("Not supported order field " + sorting.Field);
                }
            }
            return query;
        }

        private IQueryable<Item> PriorityOrder (IQueryable<Item> query, bool asc, bool alreadyOrdered)
        {
            if(alreadyOrdered)
            {
                var ordered = (IOrderedQueryable<Item>)query;
                query = asc ? ordered.ThenBy(i => i.Priority) : ordered.ThenByDescending(i => i.Priority);
            }
            else
            {
                query = asc ? query.OrderBy(i => i.Priority) : query.OrderByDescending(i => i.Priority);
            }
            return query;
        }

        private IQueryable<Item> DueDateOrder (IQueryable<Item> query, bool asc, bool alreadyOrdered)
        {
            if(alreadyOrdered)
            {
                var ordered = (IOrderedQueryable<Item>)query;
                query = asc ? ordered.ThenBy(i => i.DueDate) : ordered.ThenByDescending(i => i.DueDate);
            }
            else
            {
                query = asc ? query.OrderBy(i => i.DueDate) : query.OrderByDescending(i => i.DueDate);
            }
            return query;
        }

        private IQueryable<Item> ForUser(long userId)
        {
            return _uow.ItemRepository.Where(i => i.UserId == userId);
        }
    }
}