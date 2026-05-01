using OrderPoint.Domain.Entities.Base;

namespace OrderPoint.Domain.Entities;

public sealed class Category : Entity
{
    public string Name { get; private set; }

    public string? ImageUrl { get; private set; }

    private Category(
        Guid id,
        string name,
        string? imageUrl,
        DateTimeOffset createdAtUtc) : base(id, createdAtUtc)
    {
        Name = name;
        ImageUrl = imageUrl;
    }
}