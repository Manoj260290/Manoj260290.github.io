using TechQA.SharedKernel.Domain;

namespace TechQA.QAService.Domain.Events;

public record QuestionAnswerCreatedEvent(
    Guid QuestionAnswerId,
    Guid SectionId,
    string Question,
    string Answer,
    DateTime CreatedAt
) : DomainEvent;

public record QuestionAnswerUpdatedEvent(
    Guid QuestionAnswerId,
    Guid SectionId,
    string Question,
    string Answer,
    bool IsCompleted,
    DateTime UpdatedAt
) : DomainEvent;

public record QuestionAnswerCompletedEvent(
    Guid QuestionAnswerId,
    Guid SectionId,
    DateTime CompletedAt
) : DomainEvent;

public record QuestionAnswerDeletedEvent(
    Guid QuestionAnswerId,
    Guid SectionId,
    DateTime DeletedAt
) : DomainEvent;