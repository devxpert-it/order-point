using OrderPoint.Domain.Entities;

namespace OrderPoint.Application.Repositories;

public interface ICategoryRepository
{
    Task<(IReadOnlyList<Category>, int)> GetPaginatedAsync(
        int pageNumber,
        int pageSize,
        CancellationToken cancellationToken = default);
}