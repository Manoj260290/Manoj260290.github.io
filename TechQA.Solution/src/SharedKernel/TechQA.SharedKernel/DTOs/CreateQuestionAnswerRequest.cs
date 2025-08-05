using System.ComponentModel.DataAnnotations;

namespace TechQA.SharedKernel.DTOs;

public class CreateQuestionAnswerRequest
{
    [Required]
    public Guid SectionId { get; set; }

    [Required]
    [StringLength(500, MinimumLength = 1)]
    public string Question { get; set; } = string.Empty;

    [Required]
    [StringLength(2000, MinimumLength = 1)]
    public string Answer { get; set; } = string.Empty;
}

public class UpdateQuestionAnswerRequest
{
    [Required]
    [StringLength(500, MinimumLength = 1)]
    public string Question { get; set; } = string.Empty;

    [Required]
    [StringLength(2000, MinimumLength = 1)]
    public string Answer { get; set; } = string.Empty;

    public bool IsCompleted { get; set; }
}