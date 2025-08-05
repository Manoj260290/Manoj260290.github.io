using TechQA.SharedKernel.Domain;
using TechQA.SectionService.Domain.Entities;

namespace TechQA.SectionService.Application.Interfaces;

public interface ITechnologySectionRepository : IRepository<TechnologySection, Guid>
{
    Task<TechnologySection?> GetByNameAsync(string name, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default);
}