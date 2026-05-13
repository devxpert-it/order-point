using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OrderPoint.Api.Configuration;
using OrderPoint.Api.Endpoints.Categories;
using OrderPoint.Api.Extensions;
using OrderPoint.Application.Commands.Categories;
using OrderPoint.Application.Commands.Items;
using OrderPoint.Application.Dtos.Categories;
using OrderPoint.Application.Dtos.Items;
using OrderPoint.Domain.Entities;
using OrderPoint.Domain.Enumerations;
using OrderPoint.Domain.Outcomes;

namespace OrderPoint.Api.Endpoints.Items;

public sealed record CreateItemRequest(
    string Name,
    string Description,
    ItemStatus Status,
    double Portion,
    decimal Price,
    string? ImageUrl,
    Guid CategoryId);

internal sealed record CreateItemResponse(ItemDto Data);

internal sealed class CreateItemEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app
            .MapPost("api/items", HandleAsync)
            .WithName("CreateItem")
            .WithTags("Items");
    }
    
    private static async Task<Results<CreatedAtRoute<CreateItemResponse>, ProblemHttpResult>> HandleAsync(
        [FromBody] CreateItemRequest request,
        [FromServices] IValidator<CreateItemRequest> validator,
        [FromServices] ISender sender,
        CancellationToken cancellationToken)
    {
        await validator.ValidateAndThrowAsync(request, cancellationToken);

        CreateItemCommand command = new(
            request.Name,
            request.Description,
            request.Status,
            request.Portion,
            request.Price,
            request.ImageUrl,
            request.CategoryId);

        Result<ItemDto> result = await sender.Send(command, cancellationToken);

        return result.IsSuccess
            ? TypedResults.CreatedAtRoute(
                new CreateItemResponse(result.Value),
                "GetItem",
                new { id = result.Value.Id })
            : result.ToProblemDetails();
    }
    
    internal sealed class CreateItemRequestValidator : AbstractValidator<CreateItemRequest>
    {
        public CreateItemRequestValidator()
        {
            RuleFor(request => request.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(50).WithMessage("Name must be at most 50 characters");

            RuleFor(request => request.Description)
                .NotEmpty().WithMessage("Description is required")
                .MaximumLength(100).WithMessage("Description must be at most 100 characters");

            RuleFor(request => request.Status)
                .IsInEnum().WithMessage("Status is invalid");
            
            RuleFor(request => request.Portion)
                .NotEmpty().WithMessage("Portion is required")
                .GreaterThan(0).WithMessage("Portion must be greater than 0");
            
            RuleFor(request => request.Price)
                .NotEmpty().WithMessage("Price is required")
                .GreaterThan(0).WithMessage("Price must be greater than 0");

            RuleFor(request => request.ImageUrl)
                .MaximumLength(200).WithMessage("ImageUrl must be at most 200 characters");

            RuleFor(request => request.CategoryId)
                .NotEmpty().WithMessage("CategoryId is required");
        }
    }
    
}