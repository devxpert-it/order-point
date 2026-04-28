namespace OrderPoint.Application.Dtos;

public sealed record CategoryDto(
    Guid Id,
    DateTimeOffset CreatedAtUtc,
    DateTimeOffset? UpdatedAtUtc,
    string Name);