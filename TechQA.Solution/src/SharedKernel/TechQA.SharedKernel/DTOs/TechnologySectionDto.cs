namespace TechQA.SharedKernel.DTOs;

public class TechnologySectionDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public int TotalQuestions { get; set; }
    public int CompletedQuestions { get; set; }
    public double ProgressPercentage => TotalQuestions > 0 ? (double)CompletedQuestions / TotalQuestions * 100 : 0;
}