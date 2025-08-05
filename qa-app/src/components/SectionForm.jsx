import { useState } from 'react';
import { sectionService } from '../services/sectionService';
import './SectionForm.css';

const SectionForm = ({ onSectionCreated, editSection = null, onEditComplete = null }) => {
  const [formData, setFormData] = useState({
    name: editSection?.name || '',
    description: editSection?.description || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Section name is required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (editSection) {
        // Update existing section
        const updatedSection = await sectionService.updateSection(editSection.id, formData);
        onEditComplete(updatedSection);
      } else {
        // Create new section
        const newSection = await sectionService.createSection(formData);
        onSectionCreated(newSection);
        setFormData({ name: '', description: '' });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (editSection && onEditComplete) {
      onEditComplete(null);
    } else {
      setFormData({ name: '', description: '' });
      setError('');
    }
  };

  return (
    <form className="section-form" onSubmit={handleSubmit}>
      <h3>{editSection ? 'Edit Section' : 'Create New Section'}</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="name">Section Name *</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., React Fundamentals"
          maxLength={100}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of this technology section..."
          maxLength={500}
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Saving...' : (editSection ? 'Update Section' : 'Create Section')}
        </button>
      </div>
    </form>
  );
};

export default SectionForm;