using Microsoft.AspNetCore.Mvc;
using TechQA.SharedKernel.DTOs;
using TechQA.SectionService.Application.Services;

namespace TechQA.SectionService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TechnologySectionsController : ControllerBase
{
    private readonly TechnologySectionService _sectionService;

    public TechnologySectionsController(TechnologySectionService sectionService)
    {
        _sectionService = sectionService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TechnologySectionDto>>> GetAllSections(CancellationToken cancellationToken)
    {
        var result = await _sectionService.GetAllSectionsAsync(cancellationToken);
        
        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<TechnologySectionDto>> GetSection(Guid id, CancellationToken cancellationToken)
    {
        var result = await _sectionService.GetSectionAsync(id, cancellationToken);
        
        if (result.IsFailure)
        {
            return NotFound(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<ActionResult<TechnologySectionDto>> CreateSection(CreateTechnologySectionRequest request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _sectionService.CreateSectionAsync(request, cancellationToken);
        
        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return CreatedAtAction(nameof(GetSection), new { id = result.Value.Id }, result.Value);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<TechnologySectionDto>> UpdateSection(Guid id, UpdateTechnologySectionRequest request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _sectionService.UpdateSectionAsync(id, request, cancellationToken);
        
        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> DeleteSection(Guid id, CancellationToken cancellationToken)
    {
        var result = await _sectionService.DeleteSectionAsync(id, cancellationToken);
        
        if (result.IsFailure)
        {
            return NotFound(result.Error);
        }

        return NoContent();
    }
}