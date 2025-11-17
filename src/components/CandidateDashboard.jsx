import React from 'react'
import GradientButton from './GradientButton'

export default function CandidateDashboard() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-black/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-semibold">Flames.blue</div>
          <nav className="text-sm text-black/60">Candidate</nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-semibold">Discover Jobs</h2>
          <SwipeDeck />
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-black/10 p-4">
            <h3 className="font-medium mb-2">Applications</h3>
            <p className="text-sm text-black/60">Track your applied jobs here.</p>
          </div>
          <div className="rounded-2xl border border-black/10 p-4">
            <h3 className="font-medium mb-2">Messages</h3>
            <p className="text-sm text-black/60">Basic inbox coming soon.</p>
          </div>
        </aside>
      </main>
    </div>
  )
}

function SwipeDeck() {
  const [jobs, setJobs] = React.useState([])
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const load = async () => {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/jobs`)
      const data = await res.json()
      if (data.length === 0) {
        // seed a few mock jobs if none
        await Promise.all([
          fetch(`${base}/jobs`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title:'ICU Nurse', location_country:'KSA', employment_type:'Permanent', specialties:['ICU'] })}),
          fetch(`${base}/jobs`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title:'ER Technician', location_country:'UAE', employment_type:'Per diem', specialties:['Emergency'] })}),
          fetch(`${base}/jobs`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title:'Dialysis Nurse', location_country:'Qatar', employment_type:'Part-time', specialties:['Dialysis'] })}),
        ])
        const res2 = await fetch(`${base}/jobs`)
        const data2 = await res2.json()
        setJobs(data2)
      } else {
        setJobs(data)
      }
    }
    load()
  }, [])

  const card = jobs[index]

  const swipe = (dir) => {
    setIndex(i => Math.min(jobs.length, i + 1))
  }

  if (!card) {
    return (
      <div className="rounded-2xl border border-black/10 p-8 text-center text-black/60">No more jobs — check back soon.</div>
    )
  }

  return (
    <div className="rounded-2xl border border-black/10 p-6 shadow-sm">
      <div className="space-y-2">
        <div className="text-sm text-black/60">{card.location_country}</div>
        <h3 className="text-xl font-semibold">{card.title}</h3>
        <div className="flex flex-wrap gap-2">
          {(card.specialties || []).map(s => (
            <span key={s} className="text-xs px-2 py-1 rounded-full border border-black/10">{s}</span>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-6">
        <button onClick={() => swipe('left')} className="flex-1 rounded-xl border border-black/10 py-3">Pass</button>
        <GradientButton onClick={() => swipe('right')} className="flex-1">Apply</GradientButton>
      </div>
    </div>
  )
}
