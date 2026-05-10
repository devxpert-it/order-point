using OrderPoint.Application.Repositories;
using OrderPoint.Domain.Entities;
using OrderPoint.Domain.Enumerations;
using OrderPoint.Domain.Sorting;

namespace OrderPoint.Infrastructure.EfCore.Repositories;

internal sealed class ItemEfCoreRepository(ApplicationDbContext dbContext) : IItemRepository
{
    public Task<(IReadOnlyList<Item>, int)> GetPaginatedAsync(
        int pageNumber = 1,
        int pageSize = 10,
        string? searchQuery = null,
        ItemStatus? status = null,
        ItemSortBy? sortBy = null,
        CancellationToken cancellationToken = default) =>
        throw new NotImplementedException();

    public Task<Item?> GetAsync(Guid id, CancellationToken cancellationToken = default)
        => throw new NotImplementedException();

    public async Task CreateAsync(Item item, CancellationToken cancellationToken = default)
        => await dbContext.Items.AddAsync(item, cancellationToken);

    public void Delete(Item item)
        => throw new NotImplementedException();
}