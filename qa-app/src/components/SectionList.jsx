import { useState, useEffect } from 'react';
import { sectionService } from '../services/sectionService';
import { questionService } from '../services/questionService';
import './SectionList.css';

const SectionList = ({ onSectionSelect, selectedSectionId }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState({});

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      setLoading(true);
      const sectionsData = await sectionService.getAllSections();
      setSections(sectionsData);
      
      // Load progress for each section
      const progressData = {};
      for (const section of sectionsData) {
        try {
          const sectionProgress = await questionService.getSectionProgress(section.id);
          progressData[section.id] = sectionProgress;
        } catch (err) {
          console.warn(`Failed to load progress for section ${section.id}:`, err);
          progressData[section.id] = { totalQuestions: 0, completedQuestions: 0, progressPercentage: 0 };
        }
      }
      setProgress(progressData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSection = async (sectionId, event) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this section? This will also delete all associated questions.')) {
      try {
        await sectionService.deleteSection(sectionId);
        setSections(sections.filter(s => s.id !== sectionId));
        if (selectedSectionId === sectionId) {
          onSectionSelect(null);
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="section-list-loading">Loading sections...</div>;
  if (error) return <div className="section-list-error">Error: {error}</div>;

  return (
    <div className="section-list">
      <h2>Technology Sections</h2>
      {sections.length === 0 ? (
        <p className="no-sections">No sections available. Create your first section!</p>
      ) : (
        <div className="sections-grid">
          {sections.map((section) => {
            const sectionProgress = progress[section.id] || { totalQuestions: 0, completedQuestions: 0, progressPercentage: 0 };
            return (
              <div
                key={section.id}
                className={`section-card ${selectedSectionId === section.id ? 'selected' : ''}`}
                onClick={() => onSectionSelect(section)}
              >
                <div className="section-header">
                  <h3>{section.name}</h3>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDeleteSection(section.id, e)}
                    title="Delete section"
                  >
                    ×
                  </button>
                </div>
                <p className="section-description">{section.description}</p>
                <div className="section-stats">
                  <div className="progress-info">
                    <span>{sectionProgress.completedQuestions} / {sectionProgress.totalQuestions} completed</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${sectionProgress.progressPercentage}%` }}
                      ></div>
                    </div>
                    <span className="progress-percentage">{Math.round(sectionProgress.progressPercentage)}%</span>
                  </div>
                </div>
                <div className="section-dates">
                  <small>Created: {new Date(section.createdAt).toLocaleDateString()}</small>
                  {section.updatedAt && (
                    <small>Updated: {new Date(section.updatedAt).toLocaleDateString()}</small>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SectionList;