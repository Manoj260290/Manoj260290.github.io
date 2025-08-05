using TechQA.SharedKernel.Domain;
using TechQA.QAService.Domain.ValueObjects;
using TechQA.QAService.Domain.Events;

namespace TechQA.QAService.Domain.Entities;

public class QuestionAnswer : AggregateRoot<Guid>
{
    public Guid SectionId { get; private set; }
    public Question Question { get; private set; }
    public Answer Answer { get; private set; }
    public bool IsCompleted { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? UpdatedAt { get; private set; }
    public DateTime? CompletedAt { get; private set; }

    // For EF Core
    private QuestionAnswer() : base()
    {
        Question = null!;
        Answer = null!;
    }

    private QuestionAnswer(Guid id, Guid sectionId, Question question, Answer answer) : base(id)
    {
        SectionId = sectionId;
        Question = question;
        Answer = answer;
        IsCompleted = false;
        CreatedAt = DateTime.UtcNow;

        AddDomainEvent(new QuestionAnswerCreatedEvent(Id, SectionId, Question, Answer, CreatedAt));
    }

    public static QuestionAnswer Create(Guid sectionId, Question question, Answer answer)
    {
        if (sectionId == Guid.Empty)
            throw new ArgumentException("Section ID cannot be empty.", nameof(sectionId));

        return new QuestionAnswer(Guid.NewGuid(), sectionId, question, answer);
    }

    public void Update(Question question, Answer answer)
    {
        Question = question;
        Answer = answer;
        UpdatedAt = DateTime.UtcNow;

        AddDomainEvent(new QuestionAnswerUpdatedEvent(Id, SectionId, Question, Answer, IsCompleted, UpdatedAt.Value));
    }

    public void MarkAsCompleted()
    {
        if (IsCompleted)
            return;

        IsCompleted = true;
        CompletedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;

        AddDomainEvent(new QuestionAnswerCompletedEvent(Id, SectionId, CompletedAt.Value));
    }

    public void MarkAsIncomplete()
    {
        if (!IsCompleted)
            return;

        IsCompleted = false;
        CompletedAt = null;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Delete()
    {
        AddDomainEvent(new QuestionAnswerDeletedEvent(Id, SectionId, DateTime.UtcNow));
    }
}