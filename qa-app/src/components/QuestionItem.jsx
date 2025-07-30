import { useState } from 'react'
import AnswerForm from './AnswerForm'
import AnswerList from './AnswerList'
import './QuestionItem.css'

const QuestionItem = ({ question, onAddAnswer, onDeleteQuestion, onDeleteAnswer }) => {
  const [showAnswerForm, setShowAnswerForm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleAddAnswer = (answerText) => {
    onAddAnswer(question.id, answerText)
    setShowAnswerForm(false)
  }

  const handleDeleteQuestion = () => {
    onDeleteQuestion(question.id)
    setShowDeleteConfirm(false)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="question-item">
      <div className="question-header">
        <div className="question-meta">
          <span className="question-category">{question.category}</span>
          <span className="question-date">{formatDate(question.createdAt)}</span>
        </div>
        <div className="question-actions">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="delete-btn"
            title="Delete question"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="question-content">
        <h3 className="question-text">{question.question}</h3>
      </div>

      <div className="question-stats">
        <span className="answer-count">
          {question.answers.length} answer{question.answers.length !== 1 ? 's' : ''}
        </span>
      </div>

      <AnswerList 
        answers={question.answers}
        questionId={question.id}
        onDeleteAnswer={onDeleteAnswer}
      />

      <div className="question-footer">
        {!showAnswerForm ? (
          <button
            onClick={() => setShowAnswerForm(true)}
            className="add-answer-btn"
          >
            Add Answer
          </button>
        ) : (
          <AnswerForm
            onAddAnswer={handleAddAnswer}
            onCancel={() => setShowAnswerForm(false)}
          />
        )}
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="delete-confirm-content">
            <h4>Delete Question?</h4>
            <p>This will permanently delete the question and all its answers.</p>
            <div className="delete-confirm-actions">
              <button
                onClick={handleDeleteQuestion}
                className="confirm-delete-btn"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="cancel-delete-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionItem