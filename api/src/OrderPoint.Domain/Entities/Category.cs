using OrderPoint.Domain.Entities.Base;

namespace OrderPoint.Domain.Entities;

public sealed class Category : Entity
{
    public string Name { get; private set; }

    private Category(
        Guid id,
        string name,
        DateTimeOffset createdAtUtc) : base(id, createdAtUtc) => Name = name;
}