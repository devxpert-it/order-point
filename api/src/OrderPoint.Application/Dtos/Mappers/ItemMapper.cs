using OrderPoint.Domain.Entities;

namespace OrderPoint.Application.Dtos.Mappers;

internal static class ItemMapper
{
    internal static ItemDto ToItemDto(this Item item) => new(
        item.Id,
        item.Name,
        item.Description,
        item.Status.ToString(),
        item.Portion,
        item.Price,
        item.ImageUrl,
        item.CreatedAtUtc,
        item.UpdatedAtUtc,
        item.Category.Name
    );
}