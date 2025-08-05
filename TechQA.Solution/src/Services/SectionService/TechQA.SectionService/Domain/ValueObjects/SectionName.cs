using TechQA.SharedKernel.Domain;

namespace TechQA.SectionService.Domain.ValueObjects;

public class SectionName : ValueObject
{
    public string Value { get; private set; }

    private SectionName(string value)
    {
        Value = value;
    }

    public static SectionName Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Section name cannot be null or empty.", nameof(value));

        if (value.Length > 100)
            throw new ArgumentException("Section name cannot exceed 100 characters.", nameof(value));

        return new SectionName(value.Trim());
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }

    public static implicit operator string(SectionName sectionName) => sectionName.Value;
    public static implicit operator SectionName(string value) => Create(value);
}