using OrderPoint.Domain.Entities;

namespace OrderPoint.Application.Dtos.Mappers;

internal static class CategoryMapper
{
    internal static CategoryDto ToCategoryDto(this Category category) => new(
        category.Id,
        category.CreatedAtUtc,
        category.UpdatedAtUtc,
        category.Name);
}