using Microsoft.EntityFrameworkCore;
using OrderPoint.Application.Repositories;
using OrderPoint.Domain.Entities;

namespace OrderPoint.Infrastructure.EfCore;

public sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : DbContext(options), IUnitOfWork
{
    internal DbSet<Category> Categories { get; init; }

    internal DbSet<Item> Items { get; init; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(InfrastructureModule).Assembly);

        base.OnModelCreating(modelBuilder);
    }
}