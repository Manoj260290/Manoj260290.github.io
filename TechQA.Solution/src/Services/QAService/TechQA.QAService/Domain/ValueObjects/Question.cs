using TechQA.SharedKernel.Domain;

namespace TechQA.QAService.Domain.ValueObjects;

public class Question : ValueObject
{
    public string Value { get; private set; }

    private Question(string value)
    {
        Value = value;
    }

    public static Question Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Question cannot be null or empty.", nameof(value));

        if (value.Length > 500)
            throw new ArgumentException("Question cannot exceed 500 characters.", nameof(value));

        return new Question(value.Trim());
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }

    public static implicit operator string(Question question) => question.Value;
    public static implicit operator Question(string value) => Create(value);
}