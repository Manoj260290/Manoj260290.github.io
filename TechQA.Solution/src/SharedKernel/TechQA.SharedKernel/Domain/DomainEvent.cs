namespace TechQA.SharedKernel.Domain;

public abstract record DomainEvent(DateTime OccurredOn) : IDomainEvent
{
    protected DomainEvent() : this(DateTime.UtcNow)
    {
    }
}