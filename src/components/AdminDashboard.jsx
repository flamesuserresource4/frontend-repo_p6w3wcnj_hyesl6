import React from 'react'

export default function AdminDashboard() {
  const [cands, setCands] = React.useState([])
  const [recs, setRecs] = React.useState([])

  React.useEffect(() => {
    const load = async () => {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const [a,b] = await Promise.all([
        fetch(`${base}/admin/candidates`).then(r=>r.json()),
        fetch(`${base}/admin/recruiters`).then(r=>r.json()),
      ])
      setCands(a)
      setRecs(b)
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="font-semibold">Admin — Flames.blue</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-black/10 p-4">
          <h2 className="text-xl font-semibold mb-3">Candidates</h2>
          <div className="space-y-2 max-h-[60vh] overflow-auto">
            {cands.map(c => (
              <div key={c._id} className="rounded-xl border border-black/10 p-3">
                <div className="font-medium">{c.full_name || 'Unnamed'}</div>
                <div className="text-sm text-black/60">{c.location_country || '—'} · {(c.specialties||[]).join(', ')}</div>
                <div className="text-xs text-black/50">Flags: {(c.compliance_flags||[]).join(', ') || 'None'}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 p-4">
          <h2 className="text-xl font-semibold mb-3">Recruiters</h2>
          <div className="space-y-2 max-h-[60vh] overflow-auto">
            {recs.map(r => (
              <div key={r._id} className="rounded-xl border border-black/10 p-3">
                <div className="font-medium">{r.company_name || r.email}</div>
                <div className="text-sm text-black/60">{r.email}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
