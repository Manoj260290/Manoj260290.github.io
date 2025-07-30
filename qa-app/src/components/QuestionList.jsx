import QuestionItem from './QuestionItem'
import './QuestionList.css'

const QuestionList = ({ questions, onAddAnswer, onDeleteQuestion, onDeleteAnswer }) => {
  if (questions.length === 0) {
    return (
      <div className="question-list empty">
        <div className="empty-state">
          <h3>No questions yet</h3>
          <p>Start by adding your first question using the form on the left.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="question-list">
      <div className="question-list-header">
        <h2>Questions & Answers</h2>
        <span className="question-count">{questions.length} question{questions.length !== 1 ? 's' : ''}</span>
      </div>
      
      <div className="questions-container">
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onAddAnswer={onAddAnswer}
            onDeleteQuestion={onDeleteQuestion}
            onDeleteAnswer={onDeleteAnswer}
          />
        ))}
      </div>
    </div>
  )
}

export default QuestionList