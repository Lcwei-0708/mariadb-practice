import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navbar } from './components/Navbar'
import SQLEditor from './components/SQLEditor'
import TestConfigForm from './components/TestConfigForm'
import TestResult from './components/TestResult'
import './App.css'
import { Button } from '@/components/ui/button'

function App() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [concurrentUsers, setConcurrentUsers] = useState(10)
  const [totalRequests, setTotalRequests] = useState(100)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    try {
      const encodedQuery = query
      const response = await fetch('http://localhost:5000/loadtest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: encodedQuery,
          concurrent_users: concurrentUsers,
          total_requests: totalRequests,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`${response.status} - ${errorData.message || '未知錯誤'}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-4 space-y-4">
        <div className="grid gap-4">
          <div className="p-6 rounded-lg border bg-card">
            <SQLEditor query={query} setQuery={setQuery} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-6 rounded-lg border bg-card">
              <TestConfigForm
                concurrentUsers={concurrentUsers}
                setConcurrentUsers={setConcurrentUsers}
                totalRequests={totalRequests}
                setTotalRequests={setTotalRequests}
              />
              <Button 
                className="w-full mt-4" 
                onClick={handleSubmit}
              >
                {t('start.test')}
              </Button>
            </div>
            <div className="md:col-span-2 p-6 rounded-lg border bg-card">
              <TestResult result={result} error={error} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
