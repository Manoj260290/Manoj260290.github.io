import { useState, useEffect } from 'react';
import { questionService } from '../services/questionService';
import './QuestionAnswerList.css';

const QuestionAnswerList = ({ selectedSection, onRefresh }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    if (selectedSection) {
      loadQuestions();
    } else {
      setQuestions([]);
    }
  }, [selectedSection]);

  const loadQuestions = async () => {
    if (!selectedSection) return;

    try {
      setLoading(true);
      const questionsData = await questionService.getQuestionsBySection(selectedSection.id);
      setQuestions(questionsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCompletion = async (questionId) => {
    try {
      const updatedQuestion = await questionService.toggleCompletion(questionId);
      setQuestions(questions.map(q => 
        q.id === questionId ? updatedQuestion : q
      ));
      if (onRefresh) onRefresh();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await questionService.deleteQuestion(questionId);
        setQuestions(questions.filter(q => q.id !== questionId));
        if (onRefresh) onRefresh();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
  };

  const handleUpdateQuestion = async (questionId, formData) => {
    try {
      const updatedQuestion = await questionService.updateQuestion(questionId, formData);
      setQuestions(questions.map(q => 
        q.id === questionId ? updatedQuestion : q
      ));
      setEditingQuestion(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!selectedSection) {
    return (
      <div className="question-answer-list">
        <div className="no-section-selected">
          <h3>Select a Section</h3>
          <p>Choose a technology section to view and manage its questions and answers.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="question-answer-list">
        <div className="loading">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="question-answer-list">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="question-answer-list">
      <div className="section-header">
        <h2>{selectedSection.name}</h2>
        <p>{selectedSection.description}</p>
      </div>

      {questions.length === 0 ? (
        <div className="no-questions">
          <p>No questions available for this section. Add your first question!</p>
        </div>
      ) : (
        <div className="questions-container">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              isEditing={editingQuestion?.id === question.id}
              onToggleCompletion={handleToggleCompletion}
              onDelete={handleDeleteQuestion}
              onEdit={handleEditQuestion}
              onUpdate={handleUpdateQuestion}
              onCancelEdit={() => setEditingQuestion(null)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const QuestionCard = ({ 
  question, 
  isEditing, 
  onToggleCompletion, 
  onDelete, 
  onEdit, 
  onUpdate, 
  onCancelEdit 
}) => {
  const [formData, setFormData] = useState({
    question: question.question,
    answer: question.answer,
    isCompleted: question.isCompleted
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(question.id, formData);
  };

  if (isEditing) {
    return (
      <div className="question-card editing">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Question:</label>
            <textarea
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Answer:</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              required
              rows={5}
            />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isCompleted}
                onChange={(e) => setFormData({ ...formData, isCompleted: e.target.checked })}
              />
              Mark as completed
            </label>
          </div>
          <div className="form-actions">
            <button type="button" onClick={onCancelEdit} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`question-card ${question.isCompleted ? 'completed' : ''}`}>
      <div className="question-header">
        <div className="completion-status">
          <button
            className={`completion-btn ${question.isCompleted ? 'completed' : ''}`}
            onClick={() => onToggleCompletion(question.id)}
            title={question.isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
          >
            {question.isCompleted ? '✓' : '○'}
          </button>
        </div>
        <div className="question-actions">
          <button onClick={() => onEdit(question)} className="edit-btn" title="Edit">
            ✎
          </button>
          <button onClick={() => onDelete(question.id)} className="delete-btn" title="Delete">
            ×
          </button>
        </div>
      </div>
      
      <div className="question-content">
        <h4>Question:</h4>
        <p>{question.question}</p>
      </div>
      
      <div className="answer-content">
        <h4>Answer:</h4>
        <p>{question.answer}</p>
      </div>
      
      <div className="question-meta">
        <small>Created: {new Date(question.createdAt).toLocaleString()}</small>
        {question.updatedAt && (
          <small>Updated: {new Date(question.updatedAt).toLocaleString()}</small>
        )}
        {question.completedAt && (
          <small>Completed: {new Date(question.completedAt).toLocaleString()}</small>
        )}
      </div>
    </div>
  );
};

export default QuestionAnswerList;