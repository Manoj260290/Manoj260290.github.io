import { useState } from 'react'
import './App.css'
import QuestionForm from './components/QuestionForm'
import QuestionList from './components/QuestionList'
import SearchBar from './components/SearchBar'

function App() {
  // Initialize with some sample data for demonstration
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is React and why is it popular?",
      category: "Technology",
      answers: [
        {
          id: 1,
          text: "React is a JavaScript library for building user interfaces. It's popular because it's component-based, has a virtual DOM for performance, and has a large ecosystem.",
          createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          id: 2,
          text: "React allows developers to create reusable UI components and manage state efficiently, making it easier to build complex applications.",
          createdAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
        }
      ],
      createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
    },
    {
      id: 2,
      question: "How do you maintain a healthy work-life balance?",
      category: "General",
      answers: [
        {
          id: 3,
          text: "Set clear boundaries between work and personal time, prioritize tasks, and make sure to take regular breaks.",
          createdAt: new Date(Date.now() - 21600000).toISOString() // 6 hours ago
        }
      ],
      createdAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const addQuestion = (questionData) => {
    const newQuestion = {
      id: Date.now(),
      question: questionData.question,
      category: questionData.category,
      answers: [],
      createdAt: new Date().toISOString()
    }
    setQuestions(prev => [newQuestion, ...prev])
  }

  const addAnswer = (questionId, answerText) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            answers: [...q.answers, {
              id: Date.now(),
              text: answerText,
              createdAt: new Date().toISOString()
            }]
          }
        : q
    ))
  }

  const deleteQuestion = (questionId) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId))
  }

  const deleteAnswer = (questionId, answerId) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, answers: q.answers.filter(a => a.id !== answerId) }
        : q
    ))
  }

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answers.some(a => a.text.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="app">
      <header className="app-header">
        <h1>Q&A Management System</h1>
        <p>Add questions, provide answers, and manage your knowledge base</p>
      </header>
      
      <main className="app-main">
        <div className="app-sidebar">
          <QuestionForm onAddQuestion={addQuestion} />
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
        
        <div className="app-content">
          <QuestionList 
            questions={filteredQuestions}
            onAddAnswer={addAnswer}
            onDeleteQuestion={deleteQuestion}
            onDeleteAnswer={deleteAnswer}
          />
        </div>
      </main>
    </div>
  )
}

export default App
