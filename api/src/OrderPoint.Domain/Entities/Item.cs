using OrderPoint.Domain.Entities.Base;
using OrderPoint.Domain.Enumerations;
using OrderPoint.Domain.Errors;
using OrderPoint.Domain.Outcomes;

namespace OrderPoint.Domain.Entities;

public sealed class Item : Entity
{
    public string Name { get; private set; }
    public string Description { get; private set; }
    public ItemStatus Status { get; private set; }
    public double Portion { get; private set; }
    public decimal Price { get; private set; }
    public string? ImageUrl { get; private set; }
    public Guid CategoryId { get; private set; }
    public Category Category { get; private set; } = null!;
    
    //TODO: add Orders later

    private Item(
        Guid id,
        string name,
        string description,
        ItemStatus status,
        double portion,
        decimal price,
        string? imageUrl,
        Guid categoryId,
        DateTimeOffset createdAtUtc) : base(id, createdAtUtc)
    {
        Name = name;
        Description = description;
        Status = status;
        Portion = portion;
        Price = price;
        ImageUrl = imageUrl;
        CategoryId = categoryId;
    }

    public static Result<Item> Create(
        string name,
        string description,
        ItemStatus status,
        double portion,
        decimal price,
        string? imageUrl,
        Guid categoryId)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return Result.Failure<Item>(ItemErrors.NameIsRequired);
        }

        if (string.IsNullOrWhiteSpace(description))
        {
            return Result.Failure<Item>(ItemErrors.DescriptionIsRequired);
        }
        
        if (status != ItemStatus.Available && status != ItemStatus.Unavailable)
        {
            return Result.Failure<Item>(ItemErrors.ItemStatusIsRequired);
        }
        
        if (portion <= 0)
        {
            return Result.Failure<Item>(ItemErrors.PortionIsRequired);
        }
        
        if (price <= 0)
        {
            return Result.Failure<Item>(ItemErrors.PriceIsRequired);
        }
        
        if (Guid.Empty == categoryId)
        {
            return Result.Failure<Item>(ItemErrors.CategoryIdIsRequired);
        }

        Item item = new(Guid.CreateVersion7(), name, description, status, portion, price, imageUrl, categoryId, DateTimeOffset.UtcNow);

        return Result.Success(item);
    }

    public Result Update(
        string name,
        string description,
        ItemStatus status,
        double portion,
        decimal price,
        string? imageUrl,
        Guid categoryId)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return Result.Failure(ItemErrors.NameIsRequired);
        }

        if (string.IsNullOrWhiteSpace(description))
        {
            return Result.Failure(ItemErrors.DescriptionIsRequired);
        }

        if (status != ItemStatus.Available && status != ItemStatus.Unavailable)
        {
            return Result.Failure<Item>(ItemErrors.ItemStatusIsRequired);
        }
        
        if (portion <= 0)
        {
            return Result.Failure<Item>(ItemErrors.PortionIsRequired);
        }
        
        if (price <= 0)
        {
            return Result.Failure<Item>(ItemErrors.PriceIsRequired);
        }
        
        if (Guid.Empty == categoryId)
        {
            return Result.Failure<Item>(ItemErrors.CategoryIdIsRequired);
        }
        
        Name = name;
        Description = description;
        Status = status;
        Portion = portion;
        Price = price;
        ImageUrl = imageUrl;
        CategoryId = categoryId;

        UpdatedAtUtc = DateTimeOffset.UtcNow;

        return Result.Success();
    }
    
}