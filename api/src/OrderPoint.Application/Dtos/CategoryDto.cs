namespace OrderPoint.Application.Dtos;

public sealed record CategoryDto(
    Guid Id,
    string Name,
    string? ImageUrl,
    int ItemsCount,
    DateTimeOffset CreatedAtUtc,
    DateTimeOffset? UpdatedAtUtc);