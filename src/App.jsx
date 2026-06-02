import { useState } from 'react'
import ImageUpload from './components/ImageUpload'
import TextInput from './components/TextInput'
import StyleSelector from './components/StyleSelector'
import PromptDisplay from './components/PromptDisplay'
import PromptTemplates from './components/PromptTemplates'
import './App.css'

function App() {
  const [images, setImages] = useState([])
  const [userDescription, setUserDescription] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('cinematic')
  const [generatedPrompts, setGeneratedPrompts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showHistory, setShowHistory] = useState(false)

  const handleGeneratePrompt = async () => {
    if (!userDescription.trim() && images.length === 0) {
      setError('Please provide either a description or upload images')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await window.electron.generatePrompt({
        images,
        description: userDescription,
        style: selectedStyle,
      })

      setGeneratedPrompts(response.prompts || [])
    } catch (err) {
      setError(err.message || 'Failed to generate prompt')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt)
    alert('Prompt copied to clipboard!')
  }

  const handleSavePrompt = (prompt) => {
    // Save to local storage
    const saved = JSON.parse(localStorage.getItem('savedPrompts') || '[]')
    saved.push({
      id: Date.now(),
      prompt,
      timestamp: new Date().toISOString(),
      style: selectedStyle,
    })
    localStorage.setItem('savedPrompts', JSON.stringify(saved))
    alert('Prompt saved!')
  }

  const handleViewHistory = () => {
    setShowHistory(!showHistory)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Prompt Generator Skill</h1>
          <button
            onClick={handleViewHistory}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {showHistory ? 'Back to Generator' : 'View History'}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showHistory ? (
          <PromptHistory />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Share Your Vision</h2>
                
                <ImageUpload images={images} setImages={setImages} />
                
                <TextInput 
                  value={userDescription}
                  onChange={setUserDescription}
                  placeholder="Describe your video idea... (e.g., 'A girl dancing in rain, cinematic style, slow motion')"
                />

                <StyleSelector selectedStyle={selectedStyle} onChange={setSelectedStyle} />

                <button
                  onClick={handleGeneratePrompt}
                  disabled={loading}
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition"
                >
                  {loading ? 'Generating...' : 'Generate Prompt with AI'}
                </button>

                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}
              </div>

              <PromptTemplates selectedStyle={selectedStyle} />
            </div>

            {/* Output Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Prompts</h2>
              
              {generatedPrompts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">Your AI-generated prompts will appear here</p>
                  <p className="text-sm mt-2">Share your thoughts and images to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {generatedPrompts.map((prompt, idx) => (
                    <PromptDisplay
                      key={idx}
                      prompt={prompt}
                      onCopy={() => handleCopyPrompt(prompt)}
                      onSave={() => handleSavePrompt(prompt)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function PromptHistory() {
  const [saved, setSaved] = useState(() => {
    return JSON.parse(localStorage.getItem('savedPrompts') || '[]')
  })

  const handleDelete = (id) => {
    setSaved(saved.filter(p => p.id !== id))
    localStorage.setItem('savedPrompts', JSON.stringify(saved.filter(p => p.id !== id)))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Saved Prompts</h2>
      
      {saved.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No saved prompts yet</p>
      ) : (
        <div className="space-y-4">
          {saved.map((item) => (
            <div key={item.id} className="border-l-4 border-indigo-600 pl-4 py-3 bg-gray-50 rounded">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(item.timestamp).toLocaleDateString()} - Style: {item.style}
                  </p>
                  <p className="text-gray-800">{item.prompt}</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(item.prompt)
                    alert('Copied!')
                  }}
                  className="ml-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Copy
                </button>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-2 text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
