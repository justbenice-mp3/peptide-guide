import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const bodyParts = [
  { id: 'brain', label: 'Brain', sub: 'Cognitive and mood' },
  { id: 'chest', label: 'Chest', sub: 'Heart and lungs' },
  { id: 'shoulders', label: 'Shoulders', sub: 'Joints and mobility' },
  { id: 'arms', label: 'Arms', sub: 'Muscle and strength' },
  { id: 'core', label: 'Core', sub: 'Gut and abdomen' },
  { id: 'back', label: 'Back', sub: 'Spine and posture' },
  { id: 'hips', label: 'Hips', sub: 'Joints and flexibility' },
  { id: 'legs', label: 'Legs', sub: 'Muscle and recovery' },
]

export default function Anatomy() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  const [selected, setSelected] = useState([])

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
    pillTextOn: '#ffffff',
    pillSub: dark ? '#3a6a90' : '#b0a090',
    pillSubOn: dark ? '#4a9eff' : '#f0e8d8',
    cta: dark ? '#4a9eff' : '#c8a96e',
    ctaDisabled: dark ? '#1a2a3a' : '#e0d8c8',
    ctaDisabledText: dark ? '#3a5a7a' : '#c0b0a0',
    ctaSecText: dark ? '#4a7aaa' : '#b0a090',
    ctaSecBorder: dark ? '#1a2a3a' : '#e0d8c8',
    toggleBg: dark ? '#1a2a3a' : '#e0d8c8',
    toggleText: dark ? '#4a7aaa' : '#b0a090',
    tagBg: dark ? '#0a1e32' : '#f0ead8',
    tagText: dark ? '#4a9eff' : '#8a6a2a',
    tagBorder: dark ? '#1a3a5c' : '#e0d0b0',
    svgBody: dark ? '#111620' : '#ffffff',
    svgBorder: dark ? '#1a2a3a' : '#e8e2d8',
    svgSelected: dark ? '#0a1e32' : '#f0ead8',
    svgSelectedBorder: dark ? '#4a9eff' : '#c8a96e',
  }

  function toggle2(id) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function saveAndContinue() {
    const existing = JSON.parse(localStorage.getItem('peptide_profile') || '{}')
    localStorage.setItem('peptide_profile', JSON.stringify({ ...existing, bodyParts: selected }))
    navigate('/results')
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
        {[1,2,3].map(i => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= 3 ? t.stepDotOn : t.stepDot }} />
        ))}
      </div>

      <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 8 }}>
        Step 3 of 3
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: t.title, letterSpacing: '-0.3px', marginBottom: 4 }}>Focus areas</h2>
      <p style={{ fontSize: 13, color: t.subtitle, marginBottom: '1.5rem', lineHeight: 1.5 }}>Select the body areas you want to target</p>

      <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg"
        style={{ width: 140, display: 'block', margin: '0 auto 1.5rem' }}>
        <circle cx="100" cy="28" r="22"
          fill={selected.includes('brain') ? t.svgSelected : t.svgBody}
          stroke={selected.includes('brain') ? t.svgSelectedBorder : t.svgBorder}
          strokeWidth="1.5" style={{ cursor: 'pointer' }}
          onClick={() => toggle2('brain')} />
        <rect x="62" y="55" width="76" height="70" rx="10"
          fill={selected.includes('chest') ? t.svgSelected : t.svgBody}
          stroke={selected.includes('chest') ? t.svgSelectedBorder : t.svgBorder}
          strokeWidth="1.5" style={{ cursor: 'pointer' }}
          onClick={() => toggle2('chest')} />
        <rect x="18" y="58" width="40" height="60" rx="10"
          fill={selected.includes('shoulders') ? t.svgSelected : t.svgBody}
          stroke={selected.includes('shoulders') ? t.svgSelectedBorder : t.svgBorder}
          strokeWidth="1.5" style={{ cursor: 'pointer' }}
          onClick={() => toggle2('shoulders')} />
        <rect x="142" y="58" width="40" height="60" rx="10"
          fill={selected.includes('arms') ? t.svgSelected : t.svgBody}
          stroke={selected.includes('arms') ? t.svgSelectedBorder : t.svgBorder}
          strokeWidth="1.5" style={{ cursor: 'pointer' }}
          onClick={() => toggle2('arms')} />
        <rect x="64" y="128" width="72" height="60" rx="8"
          fill={selected.includes('core') ? t.svgSelected : t.svgBody}
          stroke={selected.includes('core') ? t.svgSelectedBorder : t.svgBorder}
          strokeWidth="1.5" style={{ cursor: 'pointer' }}
          onClick={() => toggle2('core')} />
        <rect x="62" y="130" width="20" height="56" rx="4"
          fill={selected.includes('back') ? t.svgSelected : t.svgBody}
          stroke={selected.includes('back') ? t.svgSelectedBorder : t.svgBorder}
          strokeWidth="1" style={{ cursor: 'pointer' }}
          onClick={() => toggle2('back')} />
        <rect x="64" y="190" width="72" height="36" rx="8"
          fill={selected.includes('hips') ? t.svgSelected : t.svgBody}
          stroke={selected.includes('hips') ? t.svgSelectedBorder : t.svgBorder}
          strokeWidth="1.5" style={{ cursor: 'pointer' }}
          onClick={() => toggle2('hips')} />
        <rect x="66" y="228" width="30" height="80" rx="8"
          fill={selected.includes('legs') ? t.svgSelected : t.svgBody}
          stroke={selected.includes('legs') ? t.svgSelectedBorder : t.svgBorder}
          strokeWidth="1.5" style={{ cursor: 'pointer' }}
          onClick={() => toggle2('legs')} />
        <rect x="104" y="228" width="30" height="80" rx="8"
          fill={selected.includes('legs') ? t.svgSelected : t.svgBody}
          stroke={selected.includes('legs') ? t.svgSelectedBorder : t.svgBorder}
          strokeWidth="1.5" style={{ cursor: 'pointer' }}
          onClick={() => toggle2('legs')} />
      </svg>

      {selected.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.25rem', justifyContent: 'center' }}>
          {selected.map(id => (
            <span key={id} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 99, background: t.tagBg, color: t.tagText, border: `0.5px solid ${t.tagBorder}` }}>
              {bodyParts.find(b => b.id === id)?.label}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.5rem' }}>
        {bodyParts.map(b => {
          const on = selected.includes(b.id)
          return (
            <button key={b.id} onClick={() => toggle2(b.id)} style={{
              background: on ? t.pillOn : t.pill,
              border: `${on ? '1.5px' : '0.5px'} solid ${on ? t.pillBorderOn : t.pillBorder}`,
              borderRadius: 8, padding: '10px 12px', textAlign: 'left', cursor: 'pointer'
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: on ? t.pillTextOn : t.pillText }}>{b.label}</div>
              <div style={{ fontSize: 11, marginTop: 2, color: on ? t.pillSubOn : t.pillSub }}>{b.sub}</div>
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => navigate('/quiz')} style={{ flex: 1, background: 'transparent', color: t.ctaSecText, border: `0.5px solid ${t.ctaSecBorder}`, borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
          Back
        </button>
        <button onClick={saveAndContinue} disabled={selected.length === 0}
          style={{ flex: 2, background: selected.length === 0 ? t.ctaDisabled : t.cta, color: selected.length === 0 ? t.ctaDisabledText : '#fff', border: 'none', borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: selected.length === 0 ? 'not-allowed' : 'pointer' }}>
          Generate my stack
        </button>
      </div>
    </div>
  )
}
