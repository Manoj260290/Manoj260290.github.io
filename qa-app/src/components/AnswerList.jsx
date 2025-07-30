import { useState } from 'react'
import './AnswerList.css'

const AnswerList = ({ answers, questionId, onDeleteAnswer }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleDeleteAnswer = (answerId) => {
    onDeleteAnswer(questionId, answerId)
    setDeleteConfirm(null)
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

  if (answers.length === 0) {
    return (
      <div className="answer-list empty">
        <p className="no-answers">No answers yet. Be the first to answer!</p>
      </div>
    )
  }

  return (
    <div className="answer-list">
      {answers.map((answer, index) => (
        <div key={answer.id} className="answer-item">
          <div className="answer-header">
            <span className="answer-number">Answer #{index + 1}</span>
            <div className="answer-meta">
              <span className="answer-date">{formatDate(answer.createdAt)}</span>
              <button
                onClick={() => setDeleteConfirm(answer.id)}
                className="delete-answer-btn"
                title="Delete answer"
              >
                🗑️
              </button>
            </div>
          </div>
          
          <div className="answer-content">
            <p>{answer.text}</p>
          </div>

          {deleteConfirm === answer.id && (
            <div className="delete-answer-confirm">
              <span>Delete this answer?</span>
              <button
                onClick={() => handleDeleteAnswer(answer.id)}
                className="confirm-delete"
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="cancel-delete"
              >
                No
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default AnswerList