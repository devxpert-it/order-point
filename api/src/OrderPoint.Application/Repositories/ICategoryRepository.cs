using OrderPoint.Domain.Entities;
using OrderPoint.Domain.Enumerations;

namespace OrderPoint.Application.Repositories;

public interface ICategoryRepository
{
    Task<(IReadOnlyList<Category>, int)> GetPaginatedAsync(
        int pageNumber = 1,
        int pageSize = 10,
        CategorySortBy? sortBy = null,
        CancellationToken cancellationToken = default);
}