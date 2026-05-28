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

const regions = [
  {
    id: 'brain',
    label: 'Brain',
    cx: 100, cy: 22, rx: 18, ry: 18,
    shape: 'ellipse',
  },
  {
    id: 'chest',
    label: 'Chest',
    x: 68, y: 46, w: 64, h: 52, r: 8,
    shape: 'rect',
  },
  {
    id: 'shoulders',
    label: 'Shoulders',
    x: 22, y: 46, w: 44, h: 28, r: 8,
    shape: 'rect',
    side: 'left',
  },
  {
    id: 'shoulders',
    x: 134, y: 46, w: 44, h: 28, r: 8,
    shape: 'rect',
    side: 'right',
  },
  {
    id: 'arms',
    label: 'Arms',
    x: 26, y: 76, w: 36, h: 48, r: 8,
    shape: 'rect',
    side: 'left',
  },
  {
    id: 'arms',
    x: 138, y: 76, w: 36, h: 48, r: 8,
    shape: 'rect',
    side: 'right',
  },
  {
    id: 'core',
    label: 'Core',
    x: 70, y: 100, w: 60, h: 52, r: 6,
    shape: 'rect',
  },
  {
    id: 'back',
    label: 'Back',
    x: 70, y: 100, w: 18, h: 50, r: 4,
    shape: 'rect',
  },
  {
    id: 'hips',
    label: 'Hips',
    x: 68, y: 154, w: 64, h: 30, r: 8,
    shape: 'rect',
  },
  {
    id: 'legs',
    label: 'Legs',
    x: 70, y: 186, w: 26, h: 72, r: 8,
    shape: 'rect',
    side: 'left',
  },
  {
    id: 'legs',
    x: 104, y: 186, w: 26, h: 72, r: 8,
    shape: 'rect',
    side: 'right',
  },
]

export default function Anatomy() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  const [selected, setSelected] = useState([])
  const [hovered, setHovered] = useState(null)

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
    svgBg: dark ? '#0d0f12' : '#f5f4f0',
    bodyFill: dark ? '#1a2535' : '#e8e2d8',
    bodyStroke: dark ? '#2a3a50' : '#c8bfb0',
    selectedFill: dark ? '#0a1e32' : '#f0ead8',
    selectedStroke: dark ? '#4a9eff' : '#c8a96e',
    hoveredFill: dark ? '#111e2e' : '#faf5ee',
    labelBg: dark ? '#111620' : '#ffffff',
    labelBorder: dark ? '#1a2a3a' : '#e8e2d8',
    labelText: dark ? '#ffffff' : '#2a2218',
    labelSub: dark ? '#4a7aaa' : '#b0a090',
    divider: dark ? '#1a2a3a' : '#e8e2d8',
  }

  function togglePart(id) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function saveAndContinue() {
    const existing = JSON.parse(localStorage.getItem('peptide_profile') || '{}')
    localStorage.setItem('peptide_profile', JSON.stringify({ ...existing, bodyParts: selected }))
    navigate('/results')
  }

  const uniqueSelected = [...new Set(selected)]

  return (
    <div style={{ minHeight: '100vh', background: t.bg, padding: '1.5rem' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.brandDot }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: t.brandName, letterSpacing: '0.03em' }}>PepGuide</span>
        </div>
        <button onClick={toggle} style={{ background: t.toggleBg, border: 'none', borderRadius: 99, padding: '5px 12px', fontSize: 12, color: t.toggleText, cursor: 'pointer' }}>
          {dark ? 'Light mode' : 'Dark mode'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: '1.5rem' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= 3 ? t.stepDotOn : t.stepDot }} />
        ))}
      </div>

      <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 8 }}>
        Step 3 of 3
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: t.title, letterSpacing: '-0.3px', marginBottom: 4 }}>
        Select focus areas
      </h2>
      <p style={{ fontSize: 13, color: t.subtitle, marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Tap the body diagram or use the list below to select areas you want to target
      </p>

      <div style={{ display: 'flex', gap: 16, marginBottom: '1.5rem', alignItems: 'flex-start' }}>

        <div style={{ position: 'relative', flexShrink: 0 }}>
          <svg
            viewBox="0 0 200 270"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 140, height: 'auto', display: 'block' }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {regions.map((region, i) => {
              const isSelected = selected.includes(region.id)
              const isHovered = hovered === `${region.id}-${i}`
              const fill = isSelected ? t.selectedFill : isHovered ? t.hoveredFill : t.bodyFill
              const stroke = isSelected ? t.selectedStroke : t.bodyStroke
              const strokeWidth = isSelected ? 1.5 : 1

              if (region.shape === 'ellipse') {
                return (
                  <ellipse
                    key={i}
                    cx={region.cx} cy={region.cy}
                    rx={region.rx} ry={region.ry}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    filter={isSelected ? 'url(#glow)' : undefined}
                    style={{ cursor: 'pointer', transition: 'fill 0.15s, stroke 0.15s' }}
                    onClick={() => togglePart(region.id)}
                    onMouseEnter={() => setHovered(`${region.id}-${i}`)}
                    onMouseLeave={() => setHovered(null)}
                  />
                )
              }
              return (
                <rect
                  key={i}
                  x={region.x} y={region.y}
                  width={region.w} height={region.h}
                  rx={region.r}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  filter={isSelected ? 'url(#glow)' : undefined}
                  style={{ cursor: 'pointer', transition: 'fill 0.15s, stroke 0.15s' }}
                  onClick={() => togglePart(region.id)}
                  onMouseEnter={() => setHovered(`${region.id}-${i}`)}
                  onMouseLeave={() => setHovered(null)}
                />
              )
            })}

            {regions.filter(r => r.label).map((region, i) => {
              const isSelected = selected.includes(region.id)
              if (!isSelected) return null
              const cx = region.shape === 'ellipse' ? region.cx : region.x + region.w / 2
              const cy = region.shape === 'ellipse' ? region.cy : region.y + region.h / 2
              return (
                <circle
                  key={`dot-${i}`}
                  cx={cx} cy={cy} r={3}
                  fill={dark ? '#4a9eff' : '#c8a96e'}
                />
              )
            })}
          </svg>

          <div style={{ fontSize: 10, color: t.eyebrow, textAlign: 'center', marginTop: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Tap to select
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {bodyParts.map(b => {
            const on = selected.includes(b.id)
            return (
              <button
                key={b.id}
                onClick={() => togglePart(b.id)}
                style={{
                  background: on ? t.pillOn : t.pill,
                  border: `${on ? '1.5px' : '0.5px'} solid ${on ? t.pillBorderOn : t.pillBorder}`,
                  borderRadius: 8,
                  padding: '8px 10px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 500, color: on ? t.pillTextOn : t.pillText }}>{b.label}</div>
                <div style={{ fontSize: 10, marginTop: 1, color: on ? t.pillSubOn : t.pillSub }}>{b.sub}</div>
              </button>
            )
          })}
        </div>
      </div>

      {uniqueSelected.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 8 }}>
            Selected areas
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {uniqueSelected.map(id => (
              <button
                key={id}
                onClick={() => togglePart(id)}
                style={{
                  fontSize: 12,
                  padding: '4px 12px',
                  borderRadius: 99,
                  background: t.tagBg,
                  color: t.tagText,
                  border: `0.5px solid ${t.tagBorder}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {bodyParts.find(b => b.id === id)?.label}
                <span style={{ fontSize: 14, lineHeight: 1, opacity: 0.6 }}>×</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 0.5, background: t.divider, marginBottom: '1.5rem' }} />

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => navigate('/quiz')}
          style={{
            flex: 1,
            background: 'transparent',
            color: t.ctaSecText,
            border: `0.5px solid ${t.ctaSecBorder}`,
            borderRadius: 8,
            padding: '14px 16px',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Back
        </button>
        <button
          onClick={saveAndContinue}
          disabled={uniqueSelected.length === 0}
          style={{
            flex: 2,
            background: uniqueSelected.length === 0 ? t.ctaDisabled : t.cta,
            color: uniqueSelected.length === 0 ? t.ctaDisabledText : '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '14px 16px',
            fontSize: 14,
            fontWeight: 500,
            cursor: uniqueSelected.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Generate my stack
        </button>
      </div>
    </div>
  )
}
