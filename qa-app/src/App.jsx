import { useState } from 'react'
import './App.css'
import SectionList from './components/SectionList'
import SectionForm from './components/SectionForm'
import QuestionAnswerList from './components/QuestionAnswerList'
import NewQuestionForm from './components/NewQuestionForm'

function App() {
  const [selectedSection, setSelectedSection] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleSectionSelect = (section) => {
    setSelectedSection(section)
  }

  const handleSectionCreated = (newSection) => {
    setRefreshTrigger(prev => prev + 1)
    setSelectedSection(newSection)
  }

  const handleQuestionCreated = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>TechQA Management System</h1>
        <p>Manage technology sections and their question-answer pairs with progress tracking</p>
      </header>
      
      <main className="app-main">
        <div className="app-sidebar">
          <SectionForm onSectionCreated={handleSectionCreated} />
          <SectionList 
            onSectionSelect={handleSectionSelect}
            selectedSectionId={selectedSection?.id}
            key={refreshTrigger}
          />
        </div>
        
        <div className="app-content">
          <NewQuestionForm 
            selectedSection={selectedSection}
            onQuestionCreated={handleQuestionCreated}
          />
          <QuestionAnswerList 
            selectedSection={selectedSection}
            onRefresh={handleRefresh}
          />
        </div>
      </main>
    </div>
  )
}

export default App
