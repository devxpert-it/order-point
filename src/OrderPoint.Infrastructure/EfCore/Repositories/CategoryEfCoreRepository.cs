using Microsoft.EntityFrameworkCore;
using OrderPoint.Application.Repositories;
using OrderPoint.Domain.Entities;

namespace OrderPoint.Infrastructure.EfCore.Repositories;

internal sealed class CategoryEfCoreRepository(ApplicationDbContext dbContext) : ICategoryRepository
{
    public async Task<(IReadOnlyList<Category>, int)> GetPaginatedAsync(
        int pageNumber,
        int pageSize,
        CancellationToken cancellationToken = default)
    {
        IQueryable<Category> query = dbContext.Categories;

        int totalCount = await query.CountAsync(cancellationToken);

        List<Category> categories = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .OrderByDescending(category => category.CreatedAtUtc)
            .ToListAsync(cancellationToken);

        return (categories.AsReadOnly(), totalCount);
    }
}