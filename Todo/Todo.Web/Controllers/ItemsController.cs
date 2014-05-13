using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

using Todo.Domain;
using Todo.Domain.Contracts.Services;
using Todo.Domain.Models;
using Todo.Identity;
using Todo.Web.Models;
using Todo.Web.Models.Dtos;

namespace Todo.Web.Controllers
{
    [Authorize]
    public class ItemsController : ApiController
    {
        private readonly IItemService _itemService;

        private readonly IMapper<Item, ItemDto> _mapper;

        public ItemsController(IItemService itemService, IMapper<Item, ItemDto> mapper)
        {
            _itemService = itemService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get([FromUri]ListRequest request)
        {
            var result = await _itemService.Get(User.Identity.GetAppUserId(), request.ToQuery());
            var response = new ListResponse<ItemDto>()
            {
                Page = result.Page,
                PageSize = result.PageSize,
                List = result.List.Select(i => _mapper.MapToDto(i)).ToList(),
                Total = result.Total
            };
            return Ok(response);
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(long id)
        {
            var item = await _itemService.Get(User.Identity.GetAppUserId(), id);
            return Ok(_mapper.MapToDto(item));
        }

        [HttpPost]
        public async Task<IHttpActionResult> Post(ItemDto itemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _mapper.MapToEntity(itemDto, new Item());
            item = await _itemService.Create(User.Identity.GetAppUserId(), item);
            return Created(Url.Link("DefaultApi", new { controller = "Items", item.Id }), _mapper.MapToDto(item));
        }

        [HttpPut]
        public async Task<IHttpActionResult> Put(ItemDto itemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _mapper.MapToEntity(itemDto, await _itemService.Get(User.Identity.GetAppUserId(), itemDto.Id));
            item = await _itemService.Update(User.Identity.GetAppUserId(), item);
            return Ok(_mapper.MapToDto(item));
        }

        [HttpDelete]
        public async Task<IHttpActionResult> Delete(long id)
        {
            await _itemService.Delete(User.Identity.GetAppUserId(), id);
            return Ok();
        }
    }
}
