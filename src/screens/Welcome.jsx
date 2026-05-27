import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Welcome() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()

  const t = {
    bg: dark ? '#0d0f12' : '#f5f4f0',
    brandDot: dark ? '#4a9eff' : '#c8a96e',
    brandName: dark ? '#ffffff' : '#5a4a32',
    title: dark ? '#ffffff' : '#2a2218',
    subtitle: dark ? '#6a9abf' : '#9a8a78',
    card: dark ? '#111620' : '#fff',
    cardBorder: dark ? '#1a2a3a' : '#e8e2d8',
    cardText: dark ? '#5a8ab0' : '#b0a090',
    cta: dark ? '#4a9eff' : '#c8a96e',
    ctaSec: dark ? '#1a2a3a' : '#e8e2d8',
    ctaSecText: dark ? '#4a7aaa' : '#b0a090',
    disclaimer: dark ? '#0a1220' : '#faf7f2',
    disclaimerBorder: dark ? '#1a2a3a' : '#e8e2d8',
    disclaimerText: dark ? '#4a7aaa' : '#b0a090',
    toggleBg: dark ? '#1a2a3a' : '#e0d8c8',
    toggleText: dark ? '#4a7aaa' : '#b0a090',
  }

  return (
    <div style={{ minHeight: '100vh', background: t.bg, padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.brandDot }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: t.brandName, letterSpacing: '0.03em' }}>PeptideGuide</span>
        </div>
        <button onClick={toggle} style={{ background: t.toggleBg, border: 'none', borderRadius: 99, padding: '5px 12px', fontSize: 12, color: t.toggleText, cursor: 'pointer' }}>
          {dark ? 'Light mode' : 'Dark mode'}
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.brandDot, marginBottom: 12 }}>
          Peptide + GLP-1 Navigator
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 500, color: t.title, letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: 12 }}>
          Understand your options.<br />Talk to your provider.
        </h1>
        <p style={{ fontSize: 14, color: t.subtitle, lineHeight: 1.7, marginBottom: '2rem' }}>
          Answer a short quiz, explore your goals, and receive an educational peptide or GLP-1 stack to present to a licensed healthcare provider.
        </p>

        <div style={{ background: t.disclaimer, border: `0.5px solid ${t.disclaimerBorder}`, borderRadius: 8, padding: '12px 14px', marginBottom: '2rem' }}>
          <p style={{ fontSize: 12, color: t.disclaimerText, lineHeight: 1.6, margin: 0 }}>
            This app provides educational information only and is not a medical service. Always consult a licensed healthcare provider before starting any therapy.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => navigate('/quiz')}
            style={{ background: t.cta, color: '#fff', border: 'none', borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            Get started
          </button>
          <button onClick={() => navigate('/insurance')}
            style={{ background: 'transparent', color: t.ctaSecText, border: `0.5px solid ${t.ctaSec}`, borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            Go to insurance navigator
          </button>
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: t.disclaimerText, paddingTop: '2rem' }}>
        Free to use · No medical data stored
      </p>
    </div>
  )
}
