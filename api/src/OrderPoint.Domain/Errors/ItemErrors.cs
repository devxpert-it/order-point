using OrderPoint.Domain.Outcomes;

namespace OrderPoint.Domain.Errors;

public static class ItemErrors
{
    public static readonly Error NotFound = Error
        .NotFound("Item.NotFound", "Item not found");

    internal static readonly Error NameIsRequired = Error.Validation(
        "Item.NameIsRequired",
        "Item name is required");

    internal static readonly Error DescriptionIsRequired = Error.Validation(
        "Item.DescriptionIsRequired",
        "Item description is required");
    
    internal static readonly Error PortionIsRequired = Error.Validation(
        "Item.PortionIsRequired",
        "Item portion is required");
    
    internal static readonly Error PriceIsRequired = Error.Validation(
        "Item.PriceIsRequired",
        "Item price is required");
    
    internal static readonly Error CategoryIdIsRequired = Error.Validation(
        "Item.CategoryIdIsRequired",
        "Item category id is required");
    
    internal static readonly Error ItemStatusIsRequired = Error.Validation(
        "Item.ItemStatusIsRequired",
        "Item item status is required");
}