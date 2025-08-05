using Microsoft.AspNetCore.Mvc;
using TechQA.SharedKernel.DTOs;
using TechQA.QAService.Application.Services;

namespace TechQA.QAService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionAnswersController : ControllerBase
{
    private readonly QuestionAnswerService _questionAnswerService;

    public QuestionAnswersController(QuestionAnswerService questionAnswerService)
    {
        _questionAnswerService = questionAnswerService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuestionAnswerDto>>> GetAllQuestionAnswers(CancellationToken cancellationToken)
    {
        var result = await _questionAnswerService.GetAllQuestionAnswersAsync(cancellationToken);
        
        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpGet("section/{sectionId:guid}")]
    public async Task<ActionResult<IEnumerable<QuestionAnswerDto>>> GetQuestionAnswersBySection(Guid sectionId, CancellationToken cancellationToken)
    {
        var result = await _questionAnswerService.GetQuestionAnswersBySectionAsync(sectionId, cancellationToken);
        
        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<QuestionAnswerDto>> GetQuestionAnswer(Guid id, CancellationToken cancellationToken)
    {
        var result = await _questionAnswerService.GetQuestionAnswerAsync(id, cancellationToken);
        
        if (result.IsFailure)
        {
            return NotFound(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<ActionResult<QuestionAnswerDto>> CreateQuestionAnswer(CreateQuestionAnswerRequest request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _questionAnswerService.CreateQuestionAnswerAsync(request, cancellationToken);
        
        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return CreatedAtAction(nameof(GetQuestionAnswer), new { id = result.Value.Id }, result.Value);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<QuestionAnswerDto>> UpdateQuestionAnswer(Guid id, UpdateQuestionAnswerRequest request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _questionAnswerService.UpdateQuestionAnswerAsync(id, request, cancellationToken);
        
        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpPatch("{id:guid}/toggle-completion")]
    public async Task<ActionResult<QuestionAnswerDto>> ToggleCompletion(Guid id, CancellationToken cancellationToken)
    {
        var result = await _questionAnswerService.ToggleCompletionAsync(id, cancellationToken);
        
        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> DeleteQuestionAnswer(Guid id, CancellationToken cancellationToken)
    {
        var result = await _questionAnswerService.DeleteQuestionAnswerAsync(id, cancellationToken);
        
        if (result.IsFailure)
        {
            return NotFound(result.Error);
        }

        return NoContent();
    }

    [HttpGet("section/{sectionId:guid}/progress")]
    public async Task<ActionResult<object>> GetSectionProgress(Guid sectionId, CancellationToken cancellationToken)
    {
        var result = await _questionAnswerService.GetProgressBySectionAsync(sectionId, cancellationToken);
        
        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        var (total, completed) = result.Value;
        var progressPercentage = total > 0 ? (double)completed / total * 100 : 0;

        return Ok(new
        {
            SectionId = sectionId,
            TotalQuestions = total,
            CompletedQuestions = completed,
            ProgressPercentage = Math.Round(progressPercentage, 2)
        });
    }
}