using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TechQA.QAService.Application.Interfaces;
using TechQA.QAService.Domain.Entities;
using TechQA.QAService.Infrastructure.Data;

namespace TechQA.QAService.Infrastructure.Repositories;

public class QuestionAnswerRepository : IQuestionAnswerRepository
{
    private readonly QADbContext _context;

    public QuestionAnswerRepository(QADbContext context)
    {
        _context = context;
    }

    public async Task<QuestionAnswer?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.QuestionAnswers.FindAsync(new object[] { id }, cancellationToken);
    }

    public async Task<IEnumerable<QuestionAnswer>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.QuestionAnswers.ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<QuestionAnswer>> FindAsync(Expression<Func<QuestionAnswer, bool>> predicate, CancellationToken cancellationToken = default)
    {
        return await _context.QuestionAnswers.Where(predicate).ToListAsync(cancellationToken);
    }

    public async Task<QuestionAnswer> AddAsync(QuestionAnswer entity, CancellationToken cancellationToken = default)
    {
        var result = await _context.QuestionAnswers.AddAsync(entity, cancellationToken);
        return result.Entity;
    }

    public Task UpdateAsync(QuestionAnswer entity, CancellationToken cancellationToken = default)
    {
        _context.QuestionAnswers.Update(entity);
        return Task.CompletedTask;
    }

    public Task DeleteAsync(QuestionAnswer entity, CancellationToken cancellationToken = default)
    {
        _context.QuestionAnswers.Remove(entity);
        return Task.CompletedTask;
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<IEnumerable<QuestionAnswer>> GetBySectionIdAsync(Guid sectionId, CancellationToken cancellationToken = default)
    {
        return await _context.QuestionAnswers
            .Where(qa => qa.SectionId == sectionId)
            .OrderBy(qa => qa.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetTotalCountBySectionIdAsync(Guid sectionId, CancellationToken cancellationToken = default)
    {
        return await _context.QuestionAnswers
            .CountAsync(qa => qa.SectionId == sectionId, cancellationToken);
    }

    public async Task<int> GetCompletedCountBySectionIdAsync(Guid sectionId, CancellationToken cancellationToken = default)
    {
        return await _context.QuestionAnswers
            .CountAsync(qa => qa.SectionId == sectionId && qa.IsCompleted, cancellationToken);
    }

    public async Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.QuestionAnswers
            .AnyAsync(qa => qa.Id == id, cancellationToken);
    }
}