import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomePage from '@/pages/HomePage'
import QuizPage from '@/pages/QuizPage'
import ResultsPage from '@/pages/ResultsPage'
import LeaderboardPage from '@/pages/LeaderboardPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text font-body">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}