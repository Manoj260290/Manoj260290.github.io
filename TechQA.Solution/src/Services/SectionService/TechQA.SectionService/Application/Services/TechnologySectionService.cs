using TechQA.SharedKernel.Common;
using TechQA.SharedKernel.DTOs;
using TechQA.SectionService.Application.Interfaces;
using TechQA.SectionService.Domain.Entities;
using TechQA.SectionService.Domain.ValueObjects;

namespace TechQA.SectionService.Application.Services;

public class TechnologySectionService
{
    private readonly ITechnologySectionRepository _repository;

    public TechnologySectionService(ITechnologySectionRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<TechnologySectionDto>> CreateSectionAsync(CreateTechnologySectionRequest request, CancellationToken cancellationToken = default)
    {
        try
        {
            // Check if section with same name already exists
            var existingSection = await _repository.GetByNameAsync(request.Name, cancellationToken);
            if (existingSection != null)
            {
                return Result.Failure<TechnologySectionDto>("A section with this name already exists.");
            }

            var sectionName = SectionName.Create(request.Name);
            var section = TechnologySection.Create(sectionName, request.Description);

            await _repository.AddAsync(section, cancellationToken);
            await _repository.SaveChangesAsync(cancellationToken);

            var dto = MapToDto(section);
            return Result.Success(dto);
        }
        catch (ArgumentException ex)
        {
            return Result.Failure<TechnologySectionDto>(ex.Message);
        }
        catch (Exception ex)
        {
            return Result.Failure<TechnologySectionDto>($"An error occurred while creating the section: {ex.Message}");
        }
    }

    public async Task<Result<TechnologySectionDto>> GetSectionAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var section = await _repository.GetByIdAsync(id, cancellationToken);
        if (section == null)
        {
            return Result.Failure<TechnologySectionDto>("Section not found.");
        }

        var dto = MapToDto(section);
        return Result.Success(dto);
    }

    public async Task<Result<IEnumerable<TechnologySectionDto>>> GetAllSectionsAsync(CancellationToken cancellationToken = default)
    {
        var sections = await _repository.GetAllAsync(cancellationToken);
        var dtos = sections.Select(MapToDto);
        return Result.Success(dtos);
    }

    public async Task<Result<TechnologySectionDto>> UpdateSectionAsync(Guid id, UpdateTechnologySectionRequest request, CancellationToken cancellationToken = default)
    {
        try
        {
            var section = await _repository.GetByIdAsync(id, cancellationToken);
            if (section == null)
            {
                return Result.Failure<TechnologySectionDto>("Section not found.");
            }

            // Check if another section with same name already exists
            var existingSection = await _repository.GetByNameAsync(request.Name, cancellationToken);
            if (existingSection != null && existingSection.Id != id)
            {
                return Result.Failure<TechnologySectionDto>("A section with this name already exists.");
            }

            var sectionName = SectionName.Create(request.Name);
            section.Update(sectionName, request.Description);

            await _repository.UpdateAsync(section, cancellationToken);
            await _repository.SaveChangesAsync(cancellationToken);

            var dto = MapToDto(section);
            return Result.Success(dto);
        }
        catch (ArgumentException ex)
        {
            return Result.Failure<TechnologySectionDto>(ex.Message);
        }
        catch (Exception ex)
        {
            return Result.Failure<TechnologySectionDto>($"An error occurred while updating the section: {ex.Message}");
        }
    }

    public async Task<Result> DeleteSectionAsync(Guid id, CancellationToken cancellationToken = default)
    {
        try
        {
            var section = await _repository.GetByIdAsync(id, cancellationToken);
            if (section == null)
            {
                return Result.Failure("Section not found.");
            }

            section.Delete();
            await _repository.DeleteAsync(section, cancellationToken);
            await _repository.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
        catch (Exception ex)
        {
            return Result.Failure($"An error occurred while deleting the section: {ex.Message}");
        }
    }

    private static TechnologySectionDto MapToDto(TechnologySection section)
    {
        return new TechnologySectionDto
        {
            Id = section.Id,
            Name = section.Name,
            Description = section.Description,
            CreatedAt = section.CreatedAt,
            UpdatedAt = section.UpdatedAt,
            TotalQuestions = 0, // Will be populated by QA service
            CompletedQuestions = 0 // Will be populated by QA service
        };
    }
}