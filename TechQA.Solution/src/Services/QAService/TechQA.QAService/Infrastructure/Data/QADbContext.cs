using Microsoft.EntityFrameworkCore;
using TechQA.QAService.Domain.Entities;
using TechQA.QAService.Domain.ValueObjects;

namespace TechQA.QAService.Infrastructure.Data;

public class QADbContext : DbContext
{
    public QADbContext(DbContextOptions<QADbContext> options) : base(options)
    {
    }

    public DbSet<QuestionAnswer> QuestionAnswers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<QuestionAnswer>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.SectionId)
                .IsRequired();

            entity.Property(e => e.Question)
                .HasConversion(
                    question => question.Value,
                    value => Question.Create(value))
                .HasMaxLength(500)
                .IsRequired();

            entity.Property(e => e.Answer)
                .HasConversion(
                    answer => answer.Value,
                    value => Answer.Create(value))
                .HasMaxLength(2000)
                .IsRequired();

            entity.Property(e => e.IsCompleted)
                .IsRequired();

            entity.Property(e => e.CreatedAt)
                .IsRequired();

            entity.Property(e => e.UpdatedAt);

            entity.Property(e => e.CompletedAt);

            // Ignore domain events for EF Core
            entity.Ignore(e => e.DomainEvents);

            entity.HasIndex(e => e.SectionId);
            entity.HasIndex(e => e.IsCompleted);
        });
    }
}