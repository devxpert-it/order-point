IDistributedApplicationBuilder builder = DistributedApplication.CreateBuilder(args);

IResourceBuilder<PostgresServerResource> postgres = builder
    .AddPostgres("postgres")
    .WithDataVolume()
    .WithLifetime(ContainerLifetime.Persistent);

IResourceBuilder<PostgresDatabaseResource> database = postgres
    .AddDatabase("order-point-db");

IResourceBuilder<ProjectResource> api = builder
    .AddProject<Projects.OrderPoint_Api>("order-point-api")
    .WithUrlForEndpoint("http", url => url.Url += "/scalar")
    .WithUrlForEndpoint("https", url => url.Url += "/scalar")
    .WithHttpHealthCheck("/health")
    .WithReference(database)
    .WaitFor(database);

builder.Build().Run();