using OrderPoint.Domain.Entities;
using OrderPoint.Domain.Enumerations;

namespace OrderPoint.Application.Dtos;

public sealed record ItemDto(
    Guid Id,
    string Name,
    string Description,
    string Status,
    double Portion,
    decimal Price,
    string? ImageUrl,
    DateTimeOffset CreatedAtUtc,
    DateTimeOffset? UpdatedAtUtc,
    string CategoryName);