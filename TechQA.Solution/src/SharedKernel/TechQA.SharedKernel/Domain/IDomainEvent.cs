namespace TechQA.SharedKernel.Domain;

public interface IDomainEvent
{
    DateTime OccurredOn { get; }
}