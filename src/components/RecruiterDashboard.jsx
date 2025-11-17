import React from 'react'

export default function RecruiterDashboard() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-semibold">Flames.blue</div>
          <nav className="text-sm text-black/60">Recruiter</nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-semibold">Post a job</h2>
          <JobForm />
          <h2 className="text-2xl font-semibold pt-6">AI-ranked candidates</h2>
          <CandidateList />
        </section>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-black/10 p-4">
            <h3 className="font-medium mb-2">Payments</h3>
            <p className="text-sm text-black/60">One-time hiring fee before candidate details unlock.</p>
          </div>
          <div className="rounded-2xl border border-black/10 p-4">
            <h3 className="font-medium mb-2">Contracts</h3>
            <p className="text-sm text-black/60">Create offers and manage signatures.</p>
          </div>
        </aside>
      </main>
    </div>
  )
}

function JobForm() {
  const [form, setForm] = React.useState({ title:'', location_country:'KSA', employment_type:'Permanent', specialties:[] })
  const [loading, setLoading] = React.useState(false)

  const setField = (k,v) => setForm(p => ({...p,[k]:v}))

  const save = async () => {
    setLoading(true)
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    await fetch(`${base}/jobs`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setLoading(false)
  }

  return (
    <div className="rounded-2xl border border-black/10 p-4 space-y-3">
      <input value={form.title} onChange={e=>setField('title', e.target.value)} placeholder="Job title" className="w-full rounded-xl border border-black/10 px-4 py-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select value={form.location_country} onChange={e=>setField('location_country', e.target.value)} className="rounded-xl border border-black/10 px-4 py-3">
          {['KSA','UAE','Qatar','Oman','Bahrain','Kuwait'].map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={form.employment_type} onChange={e=>setField('employment_type', e.target.value)} className="rounded-xl border border-black/10 px-4 py-3">
          {['Permanent','Part-time','Per diem','Live-in'].map(t=> <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <input value={(form.specialties||[]).join(', ')} onChange={e=>setField('specialties', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} placeholder="Specialties (comma separated)" className="w-full rounded-xl border border-black/10 px-4 py-3" />
      <div className="flex justify-end">
        <button onClick={save} className="rounded-xl px-4 py-3 border border-black/10">{loading ? 'Saving…' : 'Save job'}</button>
      </div>
    </div>
  )
}

function CandidateList() {
  const [cands, setCands] = React.useState([])

  React.useEffect(() => {
    const load = async () => {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/admin/candidates`)
      const data = await res.json()
      setCands(data)
    }
    load()
  }, [])

  return (
    <div className="space-y-3">
      {cands.length === 0 && (
        <div className="rounded-2xl border border-black/10 p-4 text-black/60">No candidates yet.</div>
      )}
      {cands.map(c => (
        <div key={c._id} className="rounded-2xl border border-black/10 p-4 flex items-center justify-between">
          <div>
            <div className="font-medium">{c.full_name || 'Unnamed Candidate'}</div>
            <div className="text-sm text-black/60">{(c.specialties||[]).join(', ')}</div>
          </div>
          <div className="text-sm">Fit Score: <span className="font-medium">{typeof c.fit_score === 'number' ? c.fit_score : '—'}</span></div>
        </div>
      ))}
    </div>
  )
}
