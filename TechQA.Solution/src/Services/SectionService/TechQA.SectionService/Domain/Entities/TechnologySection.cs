using TechQA.SharedKernel.Domain;
using TechQA.SectionService.Domain.ValueObjects;
using TechQA.SectionService.Domain.Events;

namespace TechQA.SectionService.Domain.Entities;

public class TechnologySection : AggregateRoot<Guid>
{
    public SectionName Name { get; private set; }
    public string Description { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? UpdatedAt { get; private set; }

    // For EF Core
    private TechnologySection() : base() 
    {
        Name = null!;
        Description = string.Empty;
    }

    private TechnologySection(Guid id, SectionName name, string description) : base(id)
    {
        Name = name;
        Description = description ?? string.Empty;
        CreatedAt = DateTime.UtcNow;

        AddDomainEvent(new TechnologySectionCreatedEvent(Id, Name, Description, CreatedAt));
    }

    public static TechnologySection Create(SectionName name, string description)
    {
        return new TechnologySection(Guid.NewGuid(), name, description);
    }

    public void Update(SectionName name, string description)
    {
        Name = name;
        Description = description ?? string.Empty;
        UpdatedAt = DateTime.UtcNow;

        AddDomainEvent(new TechnologySectionUpdatedEvent(Id, Name, Description, UpdatedAt.Value));
    }

    public void Delete()
    {
        AddDomainEvent(new TechnologySectionDeletedEvent(Id, DateTime.UtcNow));
    }
}