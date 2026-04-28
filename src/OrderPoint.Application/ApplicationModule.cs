using Microsoft.Extensions.DependencyInjection;

namespace OrderPoint.Application;

public static class ApplicationModule
{
    public static IServiceCollection AddApplicationModule(this IServiceCollection services)
    {
        return services;
    }
}