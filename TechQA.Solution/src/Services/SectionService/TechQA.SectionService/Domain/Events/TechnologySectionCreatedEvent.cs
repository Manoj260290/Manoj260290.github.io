using TechQA.SharedKernel.Domain;

namespace TechQA.SectionService.Domain.Events;

public record TechnologySectionCreatedEvent(
    Guid SectionId,
    string Name,
    string Description,
    DateTime CreatedAt
) : DomainEvent;

public record TechnologySectionUpdatedEvent(
    Guid SectionId,
    string Name,
    string Description,
    DateTime UpdatedAt
) : DomainEvent;

public record TechnologySectionDeletedEvent(
    Guid SectionId,
    DateTime DeletedAt
) : DomainEvent;