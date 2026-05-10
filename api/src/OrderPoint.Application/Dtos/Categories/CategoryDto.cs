namespace OrderPoint.Application.Dtos.Categories;

public sealed record CategoryDto(
    Guid Id,
    string Name,
    string Description,
    string Status,
    string? ImageUrl,
    int ItemsCount,
    DateTimeOffset CreatedAtUtc,
    DateTimeOffset? UpdatedAtUtc);