import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const goals = [
  { id: 'fat_loss', label: 'Fat loss', sub: 'Reduce body fat' },
  { id: 'muscle', label: 'Muscle gain', sub: 'Build lean mass' },
  { id: 'recovery', label: 'Recovery', sub: 'Heal faster' },
  { id: 'cognitive', label: 'Cognitive', sub: 'Focus and clarity' },
  { id: 'longevity', label: 'Longevity', sub: 'Anti-aging' },
  { id: 'sleep', label: 'Sleep', sub: 'Better rest' },
  { id: 'libido', label: 'Libido', sub: 'Sexual health' },
  { id: 'glp1', label: 'Weight loss', sub: 'GLP-1 therapy' },
]

const ages = ['18-25', '26-35', '36-45', '46-55', '55+']
const sexes = ['Male', 'Female', 'Prefer not to say']
const activity = ['Sedentary', 'Lightly active', 'Moderately active', 'Very active']

export default function Quiz() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState([])
  const [age, setAge] = useState('')
  const [sex, setSex] = useState('')
  const [act, setAct] = useState('')

  const t = {
    bg: dark ? '#0d0f12' : '#f5f4f0',
    brandDot: dark ? '#4a9eff' : '#c8a96e',
    brandName: dark ? '#ffffff' : '#5a4a32',
    eyebrow: dark ? '#4a7aaa' : '#b0a090',
    title: dark ? '#ffffff' : '#2a2218',
    subtitle: dark ? '#6a9abf' : '#9a8a78',
    stepDot: dark ? '#1a2a3a' : '#e0d8c8',
    stepDotOn: dark ? '#4a9eff' : '#c8a96e',
    pill: dark ? '#111620' : '#ffffff',
    pillBorder: dark ? '#1e2d3e' : '#e8e2d8',
    pillText: dark ? '#5a8ab0' : '#7a6a58',
    pillOn: dark ? '#0a1e32' : '#c8a96e',
    pillBorderOn: dark ? '#4a9eff' : '#c8a96e',
    pillTextOn: dark ? '#ffffff' : '#ffffff',
    pillSub: dark ? '#3a6a90' : '#b0a090',
    pillSubOn: dark ? '#4a9eff' : '#f0e8d8',
    card: dark ? '#111620' : '#ffffff',
    cardBorder: dark ? '#1a2a3a' : '#e8e2d8',
    cardText: dark ? '#ffffff' : '#2a2218',
    cardSub: dark ? '#5a8ab0' : '#b0a090',
    divider: dark ? '#1a2a3a' : '#e8e2d8',
    cta: dark ? '#4a9eff' : '#c8a96e',
    ctaDisabled: dark ? '#1a2a3a' : '#e0d8c8',
    ctaDisabledText: dark ? '#3a5a7a' : '#c0b0a0',
    ctaSecText: dark ? '#4a7aaa' : '#b0a090',
    ctaSecBorder: dark ? '#1a2a3a' : '#e0d8c8',
    toggleBg: dark ? '#1a2a3a' : '#e0d8c8',
    toggleText: dark ? '#4a7aaa' : '#b0a090',
    summaryBg: dark ? '#111620' : '#ffffff',
    summaryBorder: dark ? '#1a2a3a' : '#e8e2d8',
    summaryLabel: dark ? '#4a7aaa' : '#b0a090',
    summaryValue: dark ? '#ffffff' : '#2a2218',
  }

  function toggleGoal(id) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  function saveAndContinue() {
    const profile = { goals: selected, age, sex, activity: act }
    localStorage.setItem('peptide_profile', JSON.stringify(profile))
    navigate('/anatomy')
  }

  const canProceed2 = age && sex && act

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
        {[1,2,3].map(i => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= step ? t.stepDotOn : t.stepDot, transition: 'background 0.3s' }} />
        ))}
      </div>

      <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 8 }}>
        Step {step} of 3
      </div>

      {step === 1 && (
        <>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: t.title, letterSpacing: '-0.3px', marginBottom: 4 }}>What are your goals?</h2>
          <p style={{ fontSize: 13, color: t.subtitle, marginBottom: '1.5rem', lineHeight: 1.5 }}>Select all that apply</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.5rem' }}>
            {goals.map(g => {
              const on = selected.includes(g.id)
              return (
                <button key={g.id} onClick={() => toggleGoal(g.id)} style={{
                  background: on ? t.pillOn : t.pill,
                  border: `${on ? '1.5px' : '0.5px'} solid ${on ? t.pillBorderOn : t.pillBorder}`,
                  borderRadius: 8, padding: '10px 12px', textAlign: 'left', cursor: 'pointer'
                }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: on ? t.pillTextOn : t.pillText }}>{g.label}</div>
                  <div style={{ fontSize: 11, marginTop: 2, color: on ? t.pillSubOn : t.pillSub }}>{g.sub}</div>
                </button>
              )
            })}
          </div>
          <button onClick={() => setStep(2)} disabled={selected.length === 0}
            style={{ width: '100%', background: selected.length === 0 ? t.ctaDisabled : t.cta, color: selected.length === 0 ? t.ctaDisabledText : '#fff', border: 'none', borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: selected.length === 0 ? 'not-allowed' : 'pointer' }}>
            Continue
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: t.title, letterSpacing: '-0.3px', marginBottom: 4 }}>About you</h2>
          <p style={{ fontSize: 13, color: t.subtitle, marginBottom: '1.5rem', lineHeight: 1.5 }}>Helps personalize your results</p>

          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 10 }}>Age range</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {ages.map(a => (
              <button key={a} onClick={() => setAge(a)} style={{
                background: age === a ? t.pillOn : t.pill,
                border: `${age === a ? '1.5px' : '0.5px'} solid ${age === a ? t.pillBorderOn : t.pillBorder}`,
                borderRadius: 99, padding: '7px 16px', fontSize: 13, fontWeight: 500,
                color: age === a ? '#fff' : t.pillText, cursor: 'pointer'
              }}>{a}</button>
            ))}
          </div>

          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 10 }}>Biological sex</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {sexes.map(s => (
              <button key={s} onClick={() => setSex(s)} style={{
                background: sex === s ? t.pillOn : t.pill,
                border: `${sex === s ? '1.5px' : '0.5px'} solid ${sex === s ? t.pillBorderOn : t.pillBorder}`,
                borderRadius: 99, padding: '7px 16px', fontSize: 13, fontWeight: 500,
                color: sex === s ? '#fff' : t.pillText, cursor: 'pointer'
              }}>{s}</button>
            ))}
          </div>

          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 10 }}>Activity level</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {activity.map(a => (
              <button key={a} onClick={() => setAct(a)} style={{
                background: act === a ? t.pillOn : t.pill,
                border: `${act === a ? '1.5px' : '0.5px'} solid ${act === a ? t.pillBorderOn : t.pillBorder}`,
                borderRadius: 99, padding: '7px 16px', fontSize: 13, fontWeight: 500,
                color: act === a ? '#fff' : t.pillText, cursor: 'pointer'
              }}>{a}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, background: 'transparent', color: t.ctaSecText, border: `0.5px solid ${t.ctaSecBorder}`, borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              Back
            </button>
            <button onClick={() => setStep(3)} disabled={!canProceed2} style={{ flex: 2, background: !canProceed2 ? t.ctaDisabled : t.cta, color: !canProceed2 ? t.ctaDisabledText : '#fff', border: 'none', borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: !canProceed2 ? 'not-allowed' : 'pointer' }}>
              Continue
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: t.title, letterSpacing: '-0.3px', marginBottom: 4 }}>Review your profile</h2>
          <p style={{ fontSize: 13, color: t.subtitle, marginBottom: '1.5rem', lineHeight: 1.5 }}>Next you will select focus areas on a body diagram</p>

          <div style={{ background: t.summaryBg, border: `0.5px solid ${t.summaryBorder}`, borderRadius: 8, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Goals', value: selected.map(g => goals.find(x => x.id === g)?.label).join(', ') },
              { label: 'Age range', value: age },
              { label: 'Biological sex', value: sex },
              { label: 'Activity level', value: act },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 0', borderBottom: i < 3 ? `0.5px solid ${t.summaryBorder}` : 'none' }}>
                <span style={{ fontSize: 12, color: t.summaryLabel }}>{row.label}</span>
                <span style={{ fontSize: 12, color: t.summaryValue, textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, background: 'transparent', color: t.ctaSecText, border: `0.5px solid ${t.ctaSecBorder}`, borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              Back
            </button>
            <button onClick={saveAndContinue} style={{ flex: 2, background: t.cta, color: '#fff', border: 'none', borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              Continue to body map
            </button>
          </div>
        </>
      )}
    </div>
  )
}
