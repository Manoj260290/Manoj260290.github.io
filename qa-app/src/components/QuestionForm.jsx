import { useState } from 'react'
import './QuestionForm.css'

const QuestionForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState('')
  const [category, setCategory] = useState('General')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    'General',
    'Technology',
    'Science',
    'Business',
    'Education',
    'Health',
    'Entertainment',
    'Sports',
    'Other'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsSubmitting(true)
    
    try {
      await onAddQuestion({
        question: question.trim(),
        category
      })
      
      setQuestion('')
      setCategory('General')
    } catch (error) {
      console.error('Error adding question:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="question-form">
      <h2>Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question here..."
            rows="4"
            className="form-textarea"
            required
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting || !question.trim()}
        >
          {isSubmitting ? 'Adding...' : 'Add Question'}
        </button>
      </form>
    </div>
  )
}

export default QuestionForm