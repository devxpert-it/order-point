namespace OrderPoint.Application.Dtos.Items;

public sealed record ItemCategoryDto(
    Guid Id,
    string Name,
    string Description,
    string Status,
    string? ImageUrl,
    DateTimeOffset CreatedAtUtc,
    DateTimeOffset? UpdatedAtUtc);