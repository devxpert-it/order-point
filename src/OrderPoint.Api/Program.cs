using System.Reflection;
using FluentValidation;
using OrderPoint.Api.Exceptions;
using OrderPoint.Api.Extensions;
using OrderPoint.Application;
using OrderPoint.Infrastructure;
using OrderPoint.ServiceDefaults;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Aspire
builder.AddServiceDefaults();

// API docs
builder.Services.AddOpenApi();

// Error handling
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<RequestValidationExceptionHandler>();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

// Minimal API
builder.Services.AddEndpoints(Assembly.GetExecutingAssembly());

// FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

// Modules
builder.Services.AddApplicationModule(builder.Configuration);
builder.Services.AddInfrastructureModule(builder.Configuration);

// ---------------------------------------------------------------------------------------------------------------------

WebApplication app = builder.Build();

// Minimal API
app.MapEndpoints();

// API docs
app.MapOpenApi();

// Database
app.ApplyMigrations();

// HTTP
app.UseHttpsRedirection();

// Error handling
app.UseExceptionHandler();

// Aspire
app.MapDefaultEndpoints();

app.Run();