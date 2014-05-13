using System.Threading.Tasks;

using Todo.Domain.Models;

namespace Todo.Domain.Contracts
{
    public interface IUnitOfWork
    {
        IRepository<Item> ItemRepository { get; }
        Task Commit();
    }
}