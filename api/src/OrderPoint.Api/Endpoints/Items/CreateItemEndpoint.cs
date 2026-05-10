using OrderPoint.Domain.Entities;
using OrderPoint.Domain.Enumerations;

namespace OrderPoint.Api.Endpoints.Items;

public sealed record CreateItemRequest(
    string Name,
    string Description,
    ItemStatus Status,
    double Portion,
    decimal Price,
    string? ImageUrl,
    Guid CategoryId,
    Category Category);

public class CreateItemEndpoint
{
    
}