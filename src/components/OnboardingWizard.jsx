import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WizardLayout from './WizardLayout'
import GradientButton from './GradientButton'

const countries = ["KSA","UAE","Qatar","Oman","Bahrain","Kuwait"]

export default function OnboardingWizard() {
  const total = 13
  const [step, setStep] = useState(1)
  const [candidateId, setCandidateId] = useState(null)
  const [form, setForm] = useState({})

  const next = async () => {
    if (!candidateId) {
      // Create candidate record on first next
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/auth/candidate/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: form.full_name || 'Candidate' })
      })
      const data = await res.json()
      setCandidateId(data.id)
    } else {
      // Save previous step data
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      await fetch(`${base}/onboarding/step/${step}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate_id: candidateId, data: form })
      })
    }
    setStep(s => Math.min(total, s + 1))
  }

  const back = () => setStep(s => Math.max(1, s - 1))

  const container = {
    initial: { x: 24, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: -24, opacity: 0, transition: { duration: 0.25 } }
  }

  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  return (
    <WizardLayout step={step} total={total} title={titles[step].title} subtitle={titles[step].subtitle}>
      <div className="min-h-[240px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" {...container} className="space-y-4">
              <input
                value={form.full_name || ''}
                onChange={e => setField('full_name', e.target.value)}
                placeholder="Full name"
                className="w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10"
              />
              <div className="flex justify-end">
                <GradientButton onClick={next}>Next</GradientButton>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" {...container} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <select
                  value={form.location_country || ''}
                  onChange={e => setField('location_country', e.target.value)}
                  className="w-full rounded-xl border border-black/10 px-4 py-3"
                >
                  <option value="">Country</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input
                  value={form.location_city || ''}
                  onChange={e => setField('location_city', e.target.value)}
                  placeholder="City"
                  className="w-full rounded-xl border border-black/10 px-4 py-3"
                />
              </div>
              <div className="flex justify-between">
                <button onClick={back} className="text-black/60">Back</button>
                <GradientButton onClick={next}>Next</GradientButton>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" {...container} className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {countries.map(c => (
                  <button
                    key={c}
                    onClick={() => {
                      const cur = new Set(form.relocate_countries || [])
                      cur.has(c) ? cur.delete(c) : cur.add(c)
                      setField('relocate_countries', Array.from(cur))
                    }}
                    className={`px-4 py-2 rounded-full border ${form.relocate_countries?.includes(c) ? 'border-black bg-black text-white' : 'border-black/10'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button onClick={back} className="text-black/60">Back</button>
                <GradientButton onClick={next}>Next</GradientButton>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" {...container} className="space-y-3">
              {['Permanent','Part-time','Per diem','Live-in'].map(t => (
                <label key={t} className="flex items-center justify-between rounded-xl border border-black/10 px-4 py-3">
                  <span>{t}</span>
                  <input
                    type="checkbox"
                    checked={form.job_types?.includes(t) || false}
                    onChange={() => {
                      const set = new Set(form.job_types || [])
                      set.has(t) ? set.delete(t) : set.add(t)
                      setField('job_types', Array.from(set))
                    }}
                  />
                </label>
              ))}
              <div className="flex justify-between pt-1">
                <button onClick={back} className="text-black/60">Back</button>
                <GradientButton onClick={next}>Next</GradientButton>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="s5" {...container} className="space-y-3">
              {['Just started','Interviewing','Not actively looking'].map(opt => (
                <label key={opt} className={`block rounded-xl border px-4 py-3 cursor-pointer ${form.search_status === opt ? 'border-black' : 'border-black/10'}`}>
                  <input type="radio" name="status" className="mr-2" checked={form.search_status === opt} onChange={() => setField('search_status', opt)} />
                  {opt}
                </label>
              ))}
              <div className="flex justify-between">
                <button onClick={back} className="text-black/60">Back</button>
                <GradientButton onClick={next}>Next</GradientButton>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div key="s6" {...container} className="space-y-3">
              {['Immediately','Few weeks','Few months','Specific date'].map(opt => (
                <label key={opt} className={`block rounded-xl border px-4 py-3 cursor-pointer ${form.start_date_option === opt ? 'border-black' : 'border-black/10'}`}>
                  <input type="radio" name="start" className="mr-2" checked={form.start_date_option === opt} onChange={() => setField('start_date_option', opt)} />
                  {opt}
                </label>
              ))}
              {form.start_date_option === 'Specific date' && (
                <input type="date" value={form.start_date_specific || ''} onChange={e => setField('start_date_specific', e.target.value)} className="w-full rounded-xl border border-black/10 px-4 py-3" />
              )}
              <div className="flex justify-between">
                <button onClick={back} className="text-black/60">Back</button>
                <GradientButton onClick={next}>Next</GradientButton>
              </div>
            </motion.div>
          )}

          {step === 7 && (
            <motion.div key="s7" {...container} className="space-y-4">
              <input type="number" step="0.5" min="0" value={form.experience_years || ''} onChange={e => setField('experience_years', parseFloat(e.target.value))} placeholder="Years of experience" className="w-full rounded-xl border border-black/10 px-4 py-3" />
              <div className="flex justify-between">
                <button onClick={back} className="text-black/60">Back</button>
                <GradientButton onClick={next}>Next</GradientButton>
              </div>
            </motion.div>
          )}

          {step === 8 && (
            <motion.div key="s8" {...container} className="space-y-3">
              <div className="flex items-center gap-4">
                <label className={`px-4 py-2 rounded-full border cursor-pointer ${form.graduate === true ? 'border-black bg-black text-white' : 'border-black/10'}`} onClick={() => setField('graduate', true)}>Yes</label>
                <label className={`px-4 py-2 rounded-full border cursor-pointer ${form.graduate === false ? 'border-black bg-black text-white' : 'border-black/10'}`} onClick={() => setField('graduate', false)}>No</label>
              </div>
              {(form.graduate === true || form.graduate === false) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input value={form.school || ''} onChange={e => setField('school', e.target.value)} placeholder="School" className="rounded-xl border border-black/10 px-4 py-3" />
                  <input value={form.degree || ''} onChange={e => setField('degree', e.target.value)} placeholder="Degree" className="rounded-xl border border-black/10 px-4 py-3" />
                  <input value={form.major || ''} onChange={e => setField('major', e.target.value)} placeholder="Major" className="rounded-xl border border-black/10 px-4 py-3" />
                  <input value={form.gpa || ''} onChange={e => setField('gpa', e.target.value)} placeholder="GPA" className="rounded-xl border border-black/10 px-4 py-3" />
                  <div className="col-span-full">
                    <label className="block text-sm text-black/60 mb-1">{form.graduate ? 'Graduation date' : 'Estimated graduation date'}</label>
                    <input type="date" value={form.graduation_date || ''} onChange={e => setField('graduation_date', e.target.value)} className="w-full rounded-xl border border-black/10 px-4 py-3" />
                  </div>
                </div>
              )}
              <div className="flex justify-between">
                <button onClick={back} className="text-black/60">Back</button>
                <GradientButton onClick={next}>Next</GradientButton>
              </div>
            </motion.div>
          )}

          {step === 9 && (
            <SpecialtiesStep form={form} setField={setField} back={back} next={next} />
          )}

          {step === 10 && (
            <ResumeUpload form={form} setField={setField} back={back} next={next} />
          )}

          {step === 11 && (
            <motion.div key="s11" {...container} className="space-y-3">
              <input value={form.phone || ''} onChange={e => setField('phone', e.target.value)} placeholder="Phone number" className="w-full rounded-xl border border-black/10 px-4 py-3" />
              <input type="password" value={form.password || ''} onChange={e => setField('password', e.target.value)} placeholder="Create password" className="w-full rounded-xl border border-black/10 px-4 py-3" />
              <label className="flex items-center gap-2 text-sm text-black/70">
                <input type="checkbox" checked={form.accept_tos || false} onChange={e => setField('accept_tos', e.target.checked)} />
                I agree to the Terms of Service
              </label>
              <div className="flex justify-between">
                <button onClick={back} className="text-black/60">Back</button>
                <GradientButton onClick={next}>Next</GradientButton>
              </div>
            </motion.div>
          )}

          {step === 12 && (
            <motion.div key="s12" {...container} className="space-y-3">
              <input value={form.visa_status || ''} onChange={e => setField('visa_status', e.target.value)} placeholder="Visa status" className="w-full rounded-xl border border-black/10 px-4 py-3" />
              <input value={form.residency || ''} onChange={e => setField('residency', e.target.value)} placeholder="Residency" className="w-full rounded-xl border border-black/10 px-4 py-3" />
              <input value={form.licensing || ''} onChange={e => setField('licensing', e.target.value)} placeholder="Licensing" className="w-full rounded-xl border border-black/10 px-4 py-3" />
              <label className="flex items-center gap-2 text-sm text-black/70">
                <input type="checkbox" checked={form.biometric_certificate || false} onChange={e => setField('biometric_certificate', e.target.checked)} />
                Biometric exam certificate available
              </label>
              <p className="text-xs text-black/50">These fields do not affect your Fit Score. Recruiters only.</p>
              <div className="flex justify-between">
                <button onClick={back} className="text-black/60">Back</button>
                <GradientButton onClick={next}>Next</GradientButton>
              </div>
            </motion.div>
          )}

          {step === 13 && (
            <motion.div key="s13" {...container} className="space-y-4 text-center">
              <h2 className="text-2xl font-semibold">Welcome to Flames.blue!</h2>
              <p className="text-black/60">Swipe jobs, apply instantly, track your applications.</p>
              <div className="flex justify-center">
                <a href="/candidate" className="inline-block"><GradientButton>Enter Dashboard</GradientButton></a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </WizardLayout>
  )
}

const titles = {
  1: { title: "What's your name?", subtitle: 'Please enter your full name.' },
  2: { title: 'Where do you live?', subtitle: 'Please select your current location.' },
  3: { title: 'Where do you want to relocate?', subtitle: 'Choose multiple countries.' },
  4: { title: 'What type of job are you looking for?', subtitle: 'Select all that apply.' },
  5: { title: 'How far are you in your search?', subtitle: '' },
  6: { title: 'When can you start?', subtitle: '' },
  7: { title: 'How many years of experience do you have?', subtitle: '' },
  8: { title: 'Education', subtitle: 'Tell us about your education.' },
  9: { title: 'Specialties', subtitle: 'Search and select relevant specialties.' },
 10: { title: 'Upload Resume', subtitle: 'We will auto-fill key details.' },
 11: { title: 'Phone & Account Setup', subtitle: '' },
 12: { title: 'Work Eligibility & Compliance', subtitle: 'Saudi-specific' },
 13: { title: 'All set', subtitle: '' },
}

function SpecialtiesStep({ form, setField, back, next }) {
  const [query, setQuery] = React.useState('')
  const [options, setOptions] = React.useState([])

  React.useEffect(() => {
    const load = async () => {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/meta/specialties`)
      const data = await res.json()
      setOptions(data)
    }
    load()
  }, [])

  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase()))

  return (
    <motion.div key="s9" initial={{ x: 24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -24, opacity: 0 }} className="space-y-4">
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search specialties"
        className="w-full rounded-xl border border-black/10 px-4 py-3"
      />
      <div className="flex flex-wrap gap-2 max-h-56 overflow-auto">
        {filtered.map(sp => (
          <button
            key={sp}
            onClick={() => {
              const set = new Set(form.specialties || [])
              set.has(sp) ? set.delete(sp) : set.add(sp)
              setField('specialties', Array.from(set))
            }}
            className={`px-3 py-2 rounded-full border text-sm ${form.specialties?.includes(sp) ? 'border-black bg-black text-white' : 'border-black/10'}`}
          >
            {sp}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button onClick={back} className="text-black/60">Back</button>
        <GradientButton onClick={next}>Next</GradientButton>
      </div>
    </motion.div>
  )
}

function ResumeUpload({ form, setField, back, next }) {
  const [uploading, setUploading] = React.useState(false)
  const fileRef = React.useRef(null)

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0]
    if (!file) return
    setUploading(true)
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch(`${base}/resume/upload`, { method: 'POST', body: fd })
    const data = await res.json()
    if (data.extracted) {
      Object.entries(data.extracted).forEach(([k,v]) => setField(k, v))
    }
    setUploading(false)
  }

  return (
    <motion.div key="s10" initial={{ x: 24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -24, opacity: 0 }} className="space-y-4">
      <input type="file" ref={fileRef} className="w-full rounded-xl border border-black/10 px-4 py-3" />
      <div className="flex items-center justify-between">
        <button onClick={back} className="text-black/60">Back</button>
        <div className="flex gap-2">
          <button onClick={handleUpload} className="rounded-xl px-4 py-3 border border-black/10">{uploading ? 'Uploading…' : 'Upload'}</button>
          <GradientButton onClick={next}>Next</GradientButton>
        </div>
      </div>
    </motion.div>
  )
}
