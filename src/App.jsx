import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import OnboardingWizard from './components/OnboardingWizard'
import CandidateDashboard from './components/CandidateDashboard'
import RecruiterDashboard from './components/RecruiterDashboard'
import AdminDashboard from './components/AdminDashboard'

function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <header className="border-b border-black/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-semibold tracking-tight">Flames.blue</div>
          <nav className="flex items-center gap-4 text-sm text-black/70">
            <Link to="/onboarding" className="hover:text-black">Candidate</Link>
            <Link to="/recruiter" className="hover:text-black">Recruiter</Link>
            <Link to="/admin" className="hover:text-black">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Premium GCC recruitment for care workers</h1>
          <p className="text-black/60">Automated screening, matching, and compliance. Reduce hiring time from weeks to days with a handcrafted, minimal experience.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="/onboarding" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium bg-[linear-gradient(90deg,#FFA500_0%,#FFD54F_100%)] text-black shadow-sm">Start as Candidate</a>
            <a href="/recruiter" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium border border-black/10">Recruiter</a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/onboarding" element={<OnboardingWizard />} />
      <Route path="/candidate" element={<CandidateDashboard />} />
      <Route path="/recruiter" element={<RecruiterDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}
