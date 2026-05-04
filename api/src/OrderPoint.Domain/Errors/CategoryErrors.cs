using OrderPoint.Domain.Outcomes;

namespace OrderPoint.Domain.Errors;

public static class CategoryErrors
{
    public static readonly Error NotFound = Error
        .NotFound("Category.NotFound", "Category not found");
}