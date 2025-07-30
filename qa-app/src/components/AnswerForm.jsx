import { useState } from 'react'
import './AnswerForm.css'

const AnswerForm = ({ onAddAnswer, onCancel }) => {
  const [answer, setAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!answer.trim()) return

    setIsSubmitting(true)
    
    try {
      await onAddAnswer(answer.trim())
      setAnswer('')
    } catch (error) {
      console.error('Error adding answer:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="answer-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            rows="3"
            className="answer-textarea"
            required
            autoFocus
          />
        </div>
        
        <div className="answer-form-actions">
          <button
            type="submit"
            className="submit-answer-btn"
            disabled={isSubmitting || !answer.trim()}
          >
            {isSubmitting ? 'Adding...' : 'Add Answer'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="cancel-answer-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AnswerForm