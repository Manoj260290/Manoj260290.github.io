import { useState } from 'react';
import { questionService } from '../services/questionService';
import './NewQuestionForm.css';

const NewQuestionForm = ({ selectedSection, onQuestionCreated }) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSection) {
      setError('Please select a section first');
      return;
    }

    if (!formData.question.trim() || !formData.answer.trim()) {
      setError('Both question and answer are required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const questionData = {
        sectionId: selectedSection.id,
        question: formData.question.trim(),
        answer: formData.answer.trim()
      };

      const newQuestion = await questionService.createQuestion(questionData);
      onQuestionCreated(newQuestion);
      setFormData({ question: '', answer: '' });
      setIsExpanded(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ question: '', answer: '' });
    setError('');
    setIsExpanded(false);
  };

  if (!selectedSection) {
    return (
      <div className="new-question-form disabled">
        <p>Select a section to add questions</p>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <div className="new-question-form collapsed">
        <button 
          className="expand-btn"
          onClick={() => setIsExpanded(true)}
        >
          + Add New Question
        </button>
      </div>
    );
  }

  return (
    <div className="new-question-form expanded">
      <h3>Add New Question to "{selectedSection.name}"</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Question *</label>
          <textarea
            id="question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            placeholder="Enter your question here..."
            maxLength={500}
            rows={3}
            required
          />
          <small>{formData.question.length}/500 characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="answer">Answer *</label>
          <textarea
            id="answer"
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            placeholder="Enter the answer here..."
            maxLength={2000}
            rows={5}
            required
          />
          <small>{formData.answer.length}/2000 characters</small>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Adding...' : 'Add Question'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewQuestionForm;