using TechQA.SharedKernel.Common;
using TechQA.SharedKernel.DTOs;
using TechQA.QAService.Application.Interfaces;
using TechQA.QAService.Domain.Entities;
using TechQA.QAService.Domain.ValueObjects;

namespace TechQA.QAService.Application.Services;

public class QuestionAnswerService
{
    private readonly IQuestionAnswerRepository _repository;

    public QuestionAnswerService(IQuestionAnswerRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<QuestionAnswerDto>> CreateQuestionAnswerAsync(CreateQuestionAnswerRequest request, CancellationToken cancellationToken = default)
    {
        try
        {
            var question = Question.Create(request.Question);
            var answer = Answer.Create(request.Answer);
            var questionAnswer = QuestionAnswer.Create(request.SectionId, question, answer);

            await _repository.AddAsync(questionAnswer, cancellationToken);
            await _repository.SaveChangesAsync(cancellationToken);

            var dto = MapToDto(questionAnswer);
            return Result.Success(dto);
        }
        catch (ArgumentException ex)
        {
            return Result.Failure<QuestionAnswerDto>(ex.Message);
        }
        catch (Exception ex)
        {
            return Result.Failure<QuestionAnswerDto>($"An error occurred while creating the question-answer: {ex.Message}");
        }
    }

    public async Task<Result<QuestionAnswerDto>> GetQuestionAnswerAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var questionAnswer = await _repository.GetByIdAsync(id, cancellationToken);
        if (questionAnswer == null)
        {
            return Result.Failure<QuestionAnswerDto>("Question-answer not found.");
        }

        var dto = MapToDto(questionAnswer);
        return Result.Success(dto);
    }

    public async Task<Result<IEnumerable<QuestionAnswerDto>>> GetQuestionAnswersBySectionAsync(Guid sectionId, CancellationToken cancellationToken = default)
    {
        var questionAnswers = await _repository.GetBySectionIdAsync(sectionId, cancellationToken);
        var dtos = questionAnswers.Select(MapToDto);
        return Result.Success(dtos);
    }

    public async Task<Result<IEnumerable<QuestionAnswerDto>>> GetAllQuestionAnswersAsync(CancellationToken cancellationToken = default)
    {
        var questionAnswers = await _repository.GetAllAsync(cancellationToken);
        var dtos = questionAnswers.Select(MapToDto);
        return Result.Success(dtos);
    }

    public async Task<Result<QuestionAnswerDto>> UpdateQuestionAnswerAsync(Guid id, UpdateQuestionAnswerRequest request, CancellationToken cancellationToken = default)
    {
        try
        {
            var questionAnswer = await _repository.GetByIdAsync(id, cancellationToken);
            if (questionAnswer == null)
            {
                return Result.Failure<QuestionAnswerDto>("Question-answer not found.");
            }

            var question = Question.Create(request.Question);
            var answer = Answer.Create(request.Answer);
            
            questionAnswer.Update(question, answer);
            
            if (request.IsCompleted && !questionAnswer.IsCompleted)
            {
                questionAnswer.MarkAsCompleted();
            }
            else if (!request.IsCompleted && questionAnswer.IsCompleted)
            {
                questionAnswer.MarkAsIncomplete();
            }

            await _repository.UpdateAsync(questionAnswer, cancellationToken);
            await _repository.SaveChangesAsync(cancellationToken);

            var dto = MapToDto(questionAnswer);
            return Result.Success(dto);
        }
        catch (ArgumentException ex)
        {
            return Result.Failure<QuestionAnswerDto>(ex.Message);
        }
        catch (Exception ex)
        {
            return Result.Failure<QuestionAnswerDto>($"An error occurred while updating the question-answer: {ex.Message}");
        }
    }

    public async Task<Result<QuestionAnswerDto>> ToggleCompletionAsync(Guid id, CancellationToken cancellationToken = default)
    {
        try
        {
            var questionAnswer = await _repository.GetByIdAsync(id, cancellationToken);
            if (questionAnswer == null)
            {
                return Result.Failure<QuestionAnswerDto>("Question-answer not found.");
            }

            if (questionAnswer.IsCompleted)
            {
                questionAnswer.MarkAsIncomplete();
            }
            else
            {
                questionAnswer.MarkAsCompleted();
            }

            await _repository.UpdateAsync(questionAnswer, cancellationToken);
            await _repository.SaveChangesAsync(cancellationToken);

            var dto = MapToDto(questionAnswer);
            return Result.Success(dto);
        }
        catch (Exception ex)
        {
            return Result.Failure<QuestionAnswerDto>($"An error occurred while toggling completion: {ex.Message}");
        }
    }

    public async Task<Result> DeleteQuestionAnswerAsync(Guid id, CancellationToken cancellationToken = default)
    {
        try
        {
            var questionAnswer = await _repository.GetByIdAsync(id, cancellationToken);
            if (questionAnswer == null)
            {
                return Result.Failure("Question-answer not found.");
            }

            questionAnswer.Delete();
            await _repository.DeleteAsync(questionAnswer, cancellationToken);
            await _repository.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
        catch (Exception ex)
        {
            return Result.Failure($"An error occurred while deleting the question-answer: {ex.Message}");
        }
    }

    public async Task<Result<(int Total, int Completed)>> GetProgressBySectionAsync(Guid sectionId, CancellationToken cancellationToken = default)
    {
        try
        {
            var total = await _repository.GetTotalCountBySectionIdAsync(sectionId, cancellationToken);
            var completed = await _repository.GetCompletedCountBySectionIdAsync(sectionId, cancellationToken);

            return Result.Success((total, completed));
        }
        catch (Exception ex)
        {
            return Result.Failure<(int, int)>($"An error occurred while getting progress: {ex.Message}");
        }
    }

    private static QuestionAnswerDto MapToDto(QuestionAnswer questionAnswer)
    {
        return new QuestionAnswerDto
        {
            Id = questionAnswer.Id,
            SectionId = questionAnswer.SectionId,
            Question = questionAnswer.Question,
            Answer = questionAnswer.Answer,
            IsCompleted = questionAnswer.IsCompleted,
            CreatedAt = questionAnswer.CreatedAt,
            UpdatedAt = questionAnswer.UpdatedAt,
            CompletedAt = questionAnswer.CompletedAt
        };
    }
}