using OrderPoint.Application;
using OrderPoint.Infrastructure;
using OrderPoint.ServiceDefaults;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Aspire
builder.AddServiceDefaults();

// API docs
builder.Services.AddOpenApi();

// Modules
builder.Services.AddApplicationModule();
builder.Services.AddInfrastructureModule();

// ---------------------------------------------------------------------------------------------------------------------

WebApplication app = builder.Build();

// API docs
app.MapOpenApi();

// HTTP
app.UseHttpsRedirection();

// Aspire
app.MapDefaultEndpoints();

app.Run();