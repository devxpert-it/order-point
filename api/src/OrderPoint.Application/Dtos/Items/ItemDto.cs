namespace OrderPoint.Application.Dtos.Items;

public sealed record ItemDto(
    Guid Id,
    string Name,
    string Description,
    string Status,
    double Portion,
    decimal Price,
    string? ImageUrl,
    ItemCategoryDto Category,
    DateTimeOffset CreatedAtUtc,
    DateTimeOffset? UpdatedAtUtc);