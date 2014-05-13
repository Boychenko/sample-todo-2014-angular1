namespace Todo.Domain
{
    public interface IMapper<TEntity, TDto>
        where TEntity : class, new()
        where TDto : new()
    {
        TDto MapToDto(TEntity entity);

        TEntity MapToEntity(TDto dto, TEntity e);
    }
}