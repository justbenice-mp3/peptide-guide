import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function AppealLetter() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  const [step, setStep] = useState(1)
  const [letter, setLetter] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    memberId: '',
    insurance: '',
    therapy: '',
    condition: '',
    doctorName: '',
    denialReason: '',
    previousTreatments: '',
  })

  const t = {
    bg: dark ? '#0d0f12' : '#f5f4f0',
    brandDot: dark ? '#4a9eff' : '#c8a96e',
    brandName: dark ? '#ffffff' : '#5a4a32',
    eyebrow: dark ? '#4a7aaa' : '#b0a090',
    title: dark ? '#ffffff' : '#2a2218',
    subtitle: dark ? '#6a9abf' : '#9a8a78',
    card: dark ? '#111620' : '#ffffff',
    cardBorder: dark ? '#1a2a3a' : '#e8e2d8',
    cardName: dark ? '#ffffff' : '#2a2218',
    cardSub: dark ? '#5a8ab0' : '#b0a090',
    input: dark ? '#111620' : '#ffffff',
    inputBorder: dark ? '#1e2d3e' : '#e0d8c8',
    inputText: dark ? '#ffffff' : '#2a2218',
    label: dark ? '#4a7aaa' : '#9a8a78',
    cta: dark ? '#4a9eff' : '#c8a96e',
    ctaDisabled: dark ? '#1a2a3a' : '#e0d8c8',
    ctaDisabledText: dark ? '#3a5a7a' : '#c0b0a0',
    ctaSecText: dark ? '#4a7aaa' : '#b0a090',
    ctaSecBorder: dark ? '#1a2a3a' : '#e0d8c8',
    disclaimer: dark ? '#0a1220' : '#faf7f2',
    disclaimerBorder: dark ? '#1a2a3a' : '#e8e2d8',
    disclaimerText: dark ? '#4a7aaa' : '#b0a090',
    toggleBg: dark ? '#1a2a3a' : '#e0d8c8',
    toggleText: dark ? '#4a7aaa' : '#b0a090',
    letterBg: dark ? '#111620' : '#ffffff',
    letterBorder: dark ? '#1a2a3a' : '#e8e2d8',
    letterText: dark ? '#c0d8f0' : '#2a2218',
    stepDot: dark ? '#1a2a3a' : '#e0d8c8',
    stepDotOn: dark ? '#4a9eff' : '#c8a96e',
  }

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const inputStyle = {
    width: '100%',
    background: t.input,
    border: `0.5px solid ${t.inputBorder}`,
    borderRadius: 8,
    padding: '11px 14px',
    fontSize: 14,
    color: t.inputText,
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    fontSize: 11,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: t.label,
    marginBottom: 6,
    display: 'block',
  }

  const canGenerate = form.firstName && form.lastName && form.insurance && form.therapy && form.condition && form.doctorName

  async function generateLetter() {
    setLoading(true)
    try {
      const prompt = `You are a patient advocate helping write a formal insurance appeal letter. Write a professional, compelling appeal letter based on this patient profile. The letter should be formal, cite medical necessity, reference the denial reason if provided, and include a clear request for reconsideration.

Patient profile:
- Name: ${form.firstName} ${form.lastName}
- Date of birth: ${form.dob || 'not provided'}
- Member ID: ${form.memberId || 'not provided'}
- Insurance company: ${form.insurance}
- Therapy being appealed: ${form.therapy}
- Medical condition: ${form.condition}
- Prescribing doctor: ${form.doctorName}
- Denial reason: ${form.denialReason || 'not specified'}
- Previous treatments tried: ${form.previousTreatments || 'not specified'}

Write a complete formal appeal letter. Use [DATE] as a placeholder for the date. Use [INSURANCE COMPANY ADDRESS] as a placeholder for the address. Make it professional, persuasive, and medically grounded. End with a signature block for the patient.`

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.4,
        }),
      })

      const data = await response.json()
      setLetter(data.choices[0].message.content)
      setStep(2)
    } catch (e) {
      alert('Unable to generate letter. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function copyLetter() {
    await navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: t.bg, padding: '1.5rem' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.brandDot }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: t.brandName, letterSpacing: '0.03em' }}>PeptideGuide</span>
        </div>
        <button onClick={toggle} style={{ background: t.toggleBg, border: 'none', borderRadius: 99, padding: '5px 12px', fontSize: 12, color: t.toggleText, cursor: 'pointer' }}>
          {dark ? 'Light mode' : 'Dark mode'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: '1.5rem' }}>
        {[1, 2].map(i => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= step ? t.stepDotOn : t.stepDot, transition: 'background 0.3s' }} />
        ))}
      </div>

      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: t.ctaSecText, fontSize: 13, cursor: 'pointer', marginBottom: '1rem', padding: 0 }}>
        ← Back
      </button>

      {step === 1 && (
        <>
          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 8 }}>
            Appeal letter generator
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: t.title, letterSpacing: '-0.3px', marginBottom: 4 }}>
            Fill in your details
          </h2>
          <p style={{ fontSize: 13, color: t.subtitle, marginBottom: '1.5rem', lineHeight: 1.5 }}>
            We will generate a formal appeal letter based on your profile. No data is stored or transmitted.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={labelStyle}>First name</label>
                <input style={inputStyle} placeholder="Adrian" value={form.firstName} onChange={e => update('firstName', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Last name</label>
                <input style={inputStyle} placeholder="Smith" value={form.lastName} onChange={e => update('lastName', e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={labelStyle}>Date of birth</label>
                <input style={inputStyle} placeholder="MM/DD/YYYY" value={form.dob} onChange={e => update('dob', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Member ID</label>
                <input style={inputStyle} placeholder="Optional" value={form.memberId} onChange={e => update('memberId', e.target.value)} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Insurance company</label>
              <input style={inputStyle} placeholder="e.g. Blue Cross Blue Shield" value={form.insurance} onChange={e => update('insurance', e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>Therapy being appealed</label>
              <input style={inputStyle} placeholder="e.g. Semaglutide, BPC-157" value={form.therapy} onChange={e => update('therapy', e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>Your medical condition</label>
              <input style={inputStyle} placeholder="e.g. Obesity, chronic injury" value={form.condition} onChange={e => update('condition', e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>Prescribing doctor name</label>
              <input style={inputStyle} placeholder="Dr. Jane Smith" value={form.doctorName} onChange={e => update('doctorName', e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>Denial reason (if known)</label>
              <input style={inputStyle} placeholder="e.g. Not medically necessary" value={form.denialReason} onChange={e => update('denialReason', e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>Previous treatments tried</label>
              <textarea
                style={{ ...inputStyle, minHeight: 80, resize: 'vertical', fontFamily: 'inherit' }}
                placeholder="e.g. Physical therapy for 6 months, metformin for 1 year..."
                value={form.previousTreatments}
                onChange={e => update('previousTreatments', e.target.value)}
              />
            </div>
          </div>

          <div style={{ background: t.disclaimer, border: `0.5px solid ${t.disclaimerBorder}`, borderRadius: 8, padding: '12px 14px', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: 12, color: t.disclaimerText, lineHeight: 1.6, margin: 0 }}>
              Information entered here is used only to generate your letter and is never stored or transmitted to any server.
            </p>
          </div>

          <button
            onClick={generateLetter}
            disabled={!canGenerate || loading}
            style={{
              width: '100%',
              background: !canGenerate || loading ? t.ctaDisabled : t.cta,
              color: !canGenerate || loading ? t.ctaDisabledText : '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '14px 16px',
              fontSize: 14,
              fontWeight: 500,
              cursor: !canGenerate || loading ? 'not-allowed' : 'pointer'
            }}>
            {loading ? 'Generating your letter...' : 'Generate appeal letter'}
          </button>
        </>
      )}

      {step === 2 && letter && (
        <>
          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 8 }}>
            Your appeal letter
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: t.title, letterSpacing: '-0.3px', marginBottom: 4 }}>
            Review and send
          </h2>
          <p style={{ fontSize: 13, color: t.subtitle, marginBottom: '1.5rem', lineHeight: 1.5 }}>
            Review your letter carefully. Fill in any remaining placeholders before sending.
          </p>

          <div style={{ background: t.letterBg, border: `0.5px solid ${t.letterBorder}`, borderRadius: 10, padding: '16px', marginBottom: '1.5rem', maxHeight: 400, overflowY: 'auto' }}>
            <pre style={{ fontSize: 13, color: t.letterText, lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
              {letter}
            </pre>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={copyLetter}
              style={{ background: t.cta, color: '#fff', border: 'none', borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              {copied ? 'Copied to clipboard' : 'Copy letter'}
            </button>
            <button
              onClick={() => navigate('/providers')}
              style={{ background: 'transparent', color: t.ctaSecText, border: `0.5px solid ${t.ctaSecBorder}`, borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              Find a telehealth provider
            </button>
            <button
              onClick={() => setStep(1)}
              style={{ background: 'transparent', color: t.ctaSecText, border: `0.5px solid ${t.ctaSecBorder}`, borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              Edit details
            </button>
          </div>
        </>
      )}
    </div>
  )
}
