using TechQA.SharedKernel.Domain;

namespace TechQA.QAService.Domain.ValueObjects;

public class Answer : ValueObject
{
    public string Value { get; private set; }

    private Answer(string value)
    {
        Value = value;
    }

    public static Answer Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Answer cannot be null or empty.", nameof(value));

        if (value.Length > 2000)
            throw new ArgumentException("Answer cannot exceed 2000 characters.", nameof(value));

        return new Answer(value.Trim());
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }

    public static implicit operator string(Answer answer) => answer.Value;
    public static implicit operator Answer(string value) => Create(value);
}