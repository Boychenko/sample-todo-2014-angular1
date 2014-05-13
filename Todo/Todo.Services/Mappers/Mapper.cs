using Omu.ValueInjecter;

using Todo.Domain;

namespace Todo.Services.Mappers
{
    public class Mapper<TEntity, TDto> : IMapper<TEntity, TDto>
        where TEntity : class, new()
        where TDto : new()
    {
        public TDto MapToDto(TEntity entity)
        {
            var dto = new TDto();
            dto.InjectFrom(entity); // optionally add convention here

            return dto;
        }

        public TEntity MapToEntity(TDto dto, TEntity e)
        {
            e.InjectFrom(dto); // optionally add conventions here
            return e;
        }
    }
}