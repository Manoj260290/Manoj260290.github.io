using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TechQA.SectionService.Application.Interfaces;
using TechQA.SectionService.Domain.Entities;
using TechQA.SectionService.Infrastructure.Data;

namespace TechQA.SectionService.Infrastructure.Repositories;

public class TechnologySectionRepository : ITechnologySectionRepository
{
    private readonly SectionDbContext _context;

    public TechnologySectionRepository(SectionDbContext context)
    {
        _context = context;
    }

    public async Task<TechnologySection?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.TechnologySections.FindAsync(new object[] { id }, cancellationToken);
    }

    public async Task<IEnumerable<TechnologySection>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.TechnologySections.ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<TechnologySection>> FindAsync(Expression<Func<TechnologySection, bool>> predicate, CancellationToken cancellationToken = default)
    {
        return await _context.TechnologySections.Where(predicate).ToListAsync(cancellationToken);
    }

    public async Task<TechnologySection> AddAsync(TechnologySection entity, CancellationToken cancellationToken = default)
    {
        var result = await _context.TechnologySections.AddAsync(entity, cancellationToken);
        return result.Entity;
    }

    public Task UpdateAsync(TechnologySection entity, CancellationToken cancellationToken = default)
    {
        _context.TechnologySections.Update(entity);
        return Task.CompletedTask;
    }

    public Task DeleteAsync(TechnologySection entity, CancellationToken cancellationToken = default)
    {
        _context.TechnologySections.Remove(entity);
        return Task.CompletedTask;
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<TechnologySection?> GetByNameAsync(string name, CancellationToken cancellationToken = default)
    {
        return await _context.TechnologySections
            .FirstOrDefaultAsync(s => s.Name.Value == name, cancellationToken);
    }

    public async Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.TechnologySections
            .AnyAsync(s => s.Id == id, cancellationToken);
    }
}