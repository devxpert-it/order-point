using OrderPoint.Domain.Entities.Base;
using OrderPoint.Domain.Enumerations;

namespace OrderPoint.Domain.Entities;

public sealed class Category : Entity
{
    public string Name { get; private set; }

    public string Description { get; private set; }

    public CategoryStatus Status { get; private set; }

    public string? ImageUrl { get; private set; }

    private Category(
        Guid id,
        string name,
        string description,
        string? imageUrl,
        DateTimeOffset createdAtUtc) : base(id, createdAtUtc)
    {
        Name = name;
        Description = description;
        Status = CategoryStatus.Active;
        ImageUrl = imageUrl;
    }
}