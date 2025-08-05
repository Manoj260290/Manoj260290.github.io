using Microsoft.EntityFrameworkCore;
using TechQA.SectionService.Domain.Entities;
using TechQA.SectionService.Domain.ValueObjects;

namespace TechQA.SectionService.Infrastructure.Data;

public class SectionDbContext : DbContext
{
    public SectionDbContext(DbContextOptions<SectionDbContext> options) : base(options)
    {
    }

    public DbSet<TechnologySection> TechnologySections { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TechnologySection>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Name)
                .HasConversion(
                    name => name.Value,
                    value => SectionName.Create(value))
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(e => e.Description)
                .HasMaxLength(500);

            entity.Property(e => e.CreatedAt)
                .IsRequired();

            entity.Property(e => e.UpdatedAt);

            // Ignore domain events for EF Core
            entity.Ignore(e => e.DomainEvents);

            entity.HasIndex(e => e.Name).IsUnique();
        });
    }
}