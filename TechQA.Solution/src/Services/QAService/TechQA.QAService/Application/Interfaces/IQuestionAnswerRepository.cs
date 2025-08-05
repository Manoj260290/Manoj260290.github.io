using TechQA.SharedKernel.Domain;
using TechQA.QAService.Domain.Entities;

namespace TechQA.QAService.Application.Interfaces;

public interface IQuestionAnswerRepository : IRepository<QuestionAnswer, Guid>
{
    Task<IEnumerable<QuestionAnswer>> GetBySectionIdAsync(Guid sectionId, CancellationToken cancellationToken = default);
    Task<int> GetTotalCountBySectionIdAsync(Guid sectionId, CancellationToken cancellationToken = default);
    Task<int> GetCompletedCountBySectionIdAsync(Guid sectionId, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default);
}