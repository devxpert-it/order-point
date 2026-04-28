using MediatR;
using Microsoft.AspNetCore.Mvc;
using OrderPoint.Api.Extensions;
using OrderPoint.Application.Dtos;
using OrderPoint.Application.Queries;
using OrderPoint.Domain.Outcomes;

namespace OrderPoint.Api.Endpoints.Categories;

internal sealed record GetCategoriesResponse(PaginationDto<CategoryDto> Data);

internal sealed class GetCategoriesEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app
            .MapGet("api/categories", Handler)
            .WithName("GetCategories")
            .WithTags("Categories");
    }

    private static async Task<IResult> Handler(
        [FromQuery] int pageNumber,
        [FromQuery] int pageSize,
        [FromServices] ISender sender,
        CancellationToken cancellationToken)
    {
        GetCategoriesQuery query = new(pageNumber, pageSize);

        Result<PaginationDto<CategoryDto>> result = await sender.Send(query, cancellationToken);

        return result.IsSuccess
            ? Results.Ok(new GetCategoriesResponse(result.Value))
            : result.ToProblemDetails();
    }
}