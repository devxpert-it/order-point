using Microsoft.EntityFrameworkCore;
using OrderPoint.Application.Repositories;
using OrderPoint.Domain.Entities;
using OrderPoint.Domain.Enumerations;

namespace OrderPoint.Infrastructure.EfCore.Repositories;

internal sealed class CategoryEfCoreRepository(ApplicationDbContext dbContext) : ICategoryRepository
{
    public async Task<(IReadOnlyList<Category>, int)> GetPaginatedAsync(
        int pageNumber = 1,
        int pageSize = 10,
        CategorySortBy? sortBy = null,
        CancellationToken cancellationToken = default)
    {
        IQueryable<Category> query = dbContext.Categories;

        int totalCount = await query.CountAsync(cancellationToken);

        if (sortBy.HasValue)
        {
            query = SortCategories(query, sortBy.Value);
        }

        List<Category> categories = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return (categories.AsReadOnly(), totalCount);
    }

    private static IQueryable<Category> SortCategories(IQueryable<Category> query, CategorySortBy sortBy) =>
        sortBy switch
        {
            CategorySortBy.NameAsc => query.OrderBy(category => category.Name),
            CategorySortBy.NameDesc => query.OrderByDescending(category => category.Name),
            // TODO: when items get added CategorySortBy.ItemsCountAsc => query.OrderBy(category => category.Name),
            // TODO: when items get added CategorySortBy.ItemsCountDesc => query.OrderBy(category => category.Name),
            CategorySortBy.CreatedAtUtcAsc => query.OrderBy(category => category.CreatedAtUtc),
            CategorySortBy.CreatedAtUtcDesc => query.OrderByDescending(category => category.CreatedAtUtc),
            _ => query.OrderByDescending(category => category.CreatedAtUtc)
        };
}