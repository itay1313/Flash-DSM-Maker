'use client'

import { useState, useEffect, useRef } from 'react'

interface ProjectAIModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerate: (data: { projectName: string; shortDescription: string; goals: string; targetAudience: string }) => void
}

interface Message {
  id: string
  type: 'ai' | 'user'
  content: string
  questionType?: 'goals' | 'audience' | 'useCase'
}

const questions = [
  { type: 'goals' as const, text: 'What are your project goals?', placeholder: 'e.g., Increase user engagement, improve conversion rates...' },
  { type: 'audience' as const, text: 'Who is your target audience?', placeholder: 'e.g., Small business owners, developers, students...' },
  { type: 'useCase' as const, text: 'Define your use case', placeholder: 'e.g., E-commerce platform, SaaS dashboard, mobile app...' },
]

export default function ProjectAIModal({ isOpen, onClose, onGenerate }: ProjectAIModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({
    goals: '',
    audience: '',
    useCase: '',
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Initialize conversation with welcome message and first question
      setMessages([
        {
          id: '1',
          type: 'ai',
          content: "Hi! I'm here to help you create your project description. Let me ask you a few questions to get started.",
        },
      ])
      setCurrentQuestionIndex(0)
      setAnswers({ goals: '', audience: '', useCase: '' })
      setCurrentInput('')
      
      // Show first question after a short delay
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          setMessages((prev) => [
            ...prev,
            {
              id: '2',
              type: 'ai',
              content: questions[0].text,
              questionType: questions[0].type,
            },
          ])
          inputRef.current?.focus()
        }, 1000)
      }, 500)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = () => {
    if (!currentInput.trim() || isGenerating) return

    const currentQuestion = questions[currentQuestionIndex]
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: currentInput.trim(),
    }

    // Update answers
    const newAnswers = { ...answers, [currentQuestion.type]: currentInput.trim() }
    setAnswers(newAnswers)

    // Add user message
    setMessages((prev) => [...prev, userMessage])
    setCurrentInput('')

    // Check if we have more questions
    if (currentQuestionIndex < questions.length - 1) {
      // Show typing indicator
      setIsTyping(true)
      
      // Ask next question after a delay
      setTimeout(() => {
        setIsTyping(false)
        const nextIndex = currentQuestionIndex + 1
        setCurrentQuestionIndex(nextIndex)
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            type: 'ai',
            content: questions[nextIndex].text,
            questionType: questions[nextIndex].type,
          },
        ])
        setTimeout(() => inputRef.current?.focus(), 100)
      }, 1000)
    } else {
      // All questions answered, show generate option
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            type: 'ai',
            content: "Great! I have all the information I need. Ready to generate your project description?",
          },
        ])
      }, 1000)
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    
    // Add generating message
    setMessages((prev) => [
      ...prev,
      {
        id: `ai-generating-${Date.now()}`,
        type: 'ai',
        content: 'Generating your project description...',
      },
    ])
    
    // Simulate AI generation (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // Generate project name and description based on answers
    const projectName = answers.useCase || 'New Project'
    const shortDescription = `A ${answers.useCase || 'project'} designed for ${answers.audience || 'users'} with goals focused on ${answers.goals || 'success'}.`
    
    onGenerate({
      projectName,
      shortDescription,
      goals: answers.goals,
      targetAudience: answers.audience,
    })
    
    setIsGenerating(false)
    onClose()
  }

  const allQuestionsAnswered = currentQuestionIndex >= questions.length - 1 && answers.goals && answers.audience && answers.useCase

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 left-0 top-0 w-full h-[50vh] bg-black/50 z-[99999] animate-fadeIn flex items-center justify-center"
      onClick={onClose}
      style={{ zIndex: 99999 }}
    >
      <div
        className="relative w-screen h-screen bg-gray-900 shadow-2xl flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
        style={{
          height: "100vh",
          width: "100vw",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                AI Project Assistant
              </h2>
              <p className="text-xs text-gray-400">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Close chat"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  message.type === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-white/10 text-white/90"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-lg px-4 py-3">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-800">
          {allQuestionsAnswered && !isGenerating ? (
            <div className="flex items-center justify-between space-x-3">
              <p className="text-sm text-gray-400 flex-1">
                Ready to generate your project description?
              </p>
              <button
                onClick={handleGenerate}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Generate</span>
              </button>
            </div>
          ) : (
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder={
                    currentQuestionIndex < questions.length
                      ? questions[currentQuestionIndex].placeholder
                      : "Type your message..."
                  }
                  rows={2}
                  className="w-full px-4 py-3 rounded-[8px] bg-white/10 border border-white/0 focus:border-indigo-500/50 text-white placeholder:text-white/40 focus:outline-none resize-none"
                  disabled={isGenerating || isTyping}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!currentInput.trim() || isGenerating || isTyping}
                className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

