namespace TechQA.SharedKernel.DTOs;

public class QuestionAnswerDto
{
    public Guid Id { get; set; }
    public Guid SectionId { get; set; }
    public string Question { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}