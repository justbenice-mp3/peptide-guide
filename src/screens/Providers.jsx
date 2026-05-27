import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const providers = [
  {
    name: 'Defy Medical',
    type: 'peptides',
    specialty: 'Peptide and hormone therapy',
    insurance: ['selfpay', 'ppo'],
    description: 'Nationwide telehealth specializing in peptide therapy, TRT, and hormone optimization.',
    url: 'https://defymedical.com',
    selfpay: true,
    tag: 'Peptide specialist',
  },
  {
    name: 'Marek Health',
    type: 'peptides',
    specialty: 'Lab-based hormone optimization',
    insurance: ['selfpay'],
    description: 'Evidence-based hormone and peptide optimization with comprehensive lab testing.',
    url: 'https://marekhealth.com',
    selfpay: true,
    tag: 'Lab-focused',
  },
  {
    name: 'Hone Health',
    type: 'both',
    specialty: 'Men and women\'s health',
    insurance: ['selfpay', 'ppo', 'hmo'],
    description: 'Telehealth for hormone optimization and GLP-1 therapy with insurance support.',
    url: 'https://honehealth.com',
    selfpay: true,
    tag: 'Insurance friendly',
  },
  {
    name: 'Ro Body',
    type: 'glp1',
    specialty: 'GLP-1 weight management',
    insurance: ['selfpay', 'ppo'],
    description: 'Affordable GLP-1 program with ongoing provider support and medication access.',
    url: 'https://ro.co/weight-loss',
    selfpay: true,
    tag: 'GLP-1 focused',
  },
  {
    name: 'Found',
    type: 'glp1',
    specialty: 'Weight care program',
    insurance: ['selfpay', 'ppo', 'hmo'],
    description: 'Comprehensive weight management including GLP-1 prescriptions and coaching.',
    url: 'https://joinfound.com',
    selfpay: true,
    tag: 'GLP-1 focused',
  },
  {
    name: 'Plushcare',
    type: 'both',
    specialty: 'Primary care telehealth',
    insurance: ['ppo', 'hmo', 'medicare', 'medicaid'],
    description: 'Primary care telehealth accepting most major insurance plans including Medicare.',
    url: 'https://plushcare.com',
    selfpay: false,
    tag: 'Most insurance',
  },
]

const selfPayPharmacies = [
  {
    name: 'Empower Pharmacy',
    description: 'One of the largest compounding pharmacies in the US. Wide peptide and GLP-1 formulary.',
    url: 'https://empowerpharmacy.com',
  },
  {
    name: 'Talon Compounding',
    description: 'Specialized compounding pharmacy with peptide focus and telehealth partnerships.',
    url: 'https://taloncompounding.com',
  },
  {
    name: 'Limitless Life Nootropics',
    description: 'Research-grade peptides with transparent sourcing and third-party testing.',
    url: 'https://limitlesslifenootropics.com',
  },
]

const nutritionists = [
  {
    name: 'Nourish',
    description: 'Registered dietitians covered by most insurance plans via telehealth.',
    url: 'https://usenourish.com',
  },
  {
    name: 'Fay Nutrition',
    description: 'Insurance-covered nutrition counseling with metabolic health specialists.',
    url: 'https://myfaynutrition.com',
  },
]

export default function Providers() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  const [filter, setFilter] = useState('all')
  const [tab, setTab] = useState('providers')

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
    pill: dark ? '#111620' : '#ffffff',
    pillBorder: dark ? '#1e2d3e' : '#e8e2d8',
    pillText: dark ? '#5a8ab0' : '#7a6a58',
    pillOn: dark ? '#0a1e32' : '#c8a96e',
    pillBorderOn: dark ? '#4a9eff' : '#c8a96e',
    pillTextOn: '#ffffff',
    cta: dark ? '#4a9eff' : '#c8a96e',
    ctaSecText: dark ? '#4a7aaa' : '#b0a090',
    ctaSecBorder: dark ? '#1a2a3a' : '#e0d8c8',
    disclaimer: dark ? '#0a1220' : '#faf7f2',
    disclaimerBorder: dark ? '#1a2a3a' : '#e8e2d8',
    disclaimerText: dark ? '#4a7aaa' : '#b0a090',
    toggleBg: dark ? '#1a2a3a' : '#e0d8c8',
    toggleText: dark ? '#4a7aaa' : '#b0a090',
    tagBg: dark ? '#0a1e32' : '#f0ead8',
    tagText: dark ? '#4a9eff' : '#8a6a2a',
    tagBorder: dark ? '#1a3a5c' : '#e0d0b0',
    divider: dark ? '#1a2a3a' : '#e8e2d8',
    dot: dark ? '#4a9eff' : '#c8a96e',
  }

  const filtered = providers.filter(p =>
    filter === 'all' ? true :
    filter === 'peptides' ? p.type === 'peptides' || p.type === 'both' :
    filter === 'glp1' ? p.type === 'glp1' || p.type === 'both' :
    filter === 'selfpay' ? p.selfpay : true
  )

  const tabs = [
    { id: 'providers', label: 'Providers' },
    { id: 'pharmacies', label: 'Pharmacies' },
    { id: 'nutrition', label: 'Nutrition' },
  ]

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'peptides', label: 'Peptides' },
    { id: 'glp1', label: 'GLP-1' },
    { id: 'selfpay', label: 'Self-pay' },
  ]

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

      <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 8 }}>
        Provider directory
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: t.title, letterSpacing: '-0.3px', marginBottom: 4 }}>
        Find a provider
      </h2>
      <p style={{ fontSize: 13, color: t.subtitle, marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Telehealth providers, compounding pharmacies, and nutritionists
      </p>

      <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem' }}>
        {tabs.map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)} style={{
            flex: 1, background: tab === tb.id ? t.pillOn : t.pill,
            border: `${tab === tb.id ? '1.5px' : '0.5px'} solid ${tab === tb.id ? t.pillBorderOn : t.pillBorder}`,
            borderRadius: 8, padding: '9px 6px', fontSize: 12, fontWeight: 500,
            color: tab === tb.id ? '#ffffff' : t.pillText, cursor: 'pointer'
          }}>{tb.label}</button>
        ))}
      </div>

      {tab === 'providers' && (
        <>
          <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem' }}>
            {filters.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                background: filter === f.id ? t.pillOn : t.pill,
                border: `${filter === f.id ? '1.5px' : '0.5px'} solid ${filter === f.id ? t.pillBorderOn : t.pillBorder}`,
                borderRadius: 99, padding: '6px 14px', fontSize: 12, fontWeight: 500,
                color: filter === f.id ? '#ffffff' : t.pillText, cursor: 'pointer'
              }}>{f.label}</button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1.5rem' }}>
            {filtered.map((p, i) => (
              <div key={i} style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: t.cardName }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: t.cardSub, marginTop: 2 }}>{p.specialty}</div>
                  </div>
                  <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, background: t.tagBg, color: t.tagText, border: `0.5px solid ${t.tagBorder}`, whiteSpace: 'nowrap', marginLeft: 8 }}>
                    {p.tag}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: t.cardSub, lineHeight: 1.6, marginBottom: 12 }}>
                  {p.description}
                </p>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', background: t.cta, color: '#fff', border: 'none', borderRadius: 6, padding: '10px 14px', fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>
                  Visit {p.name}
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'pharmacies' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1.5rem' }}>
          {selfPayPharmacies.map((ph, i) => (
            <div key={i} style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: t.cardName, marginBottom: 4 }}>{ph.name}</div>
              <p style={{ fontSize: 13, color: t.cardSub, lineHeight: 1.6, marginBottom: 12 }}>{ph.description}</p>
              <a href={ph.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', background: t.cta, color: '#fff', border: 'none', borderRadius: 6, padding: '10px 14px', fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>
                Visit {ph.name}
              </a>
            </div>
          ))}
        </div>
      )}

      {tab === 'nutrition' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1.5rem' }}>
          {nutritionists.map((n, i) => (
            <div key={i} style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: t.cardName, marginBottom: 4 }}>{n.name}</div>
              <p style={{ fontSize: 13, color: t.cardSub, lineHeight: 1.6, marginBottom: 12 }}>{n.description}</p>
              <a href={n.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', background: t.cta, color: '#fff', border: 'none', borderRadius: 6, padding: '10px 14px', fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>
                Visit {n.name}
              </a>
            </div>
          ))}
        </div>
      )}

      <div style={{ background: t.disclaimer, border: `0.5px solid ${t.disclaimerBorder}`, borderRadius: 8, padding: '12px 14px', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: 12, color: t.disclaimerText, lineHeight: 1.6, margin: 0 }}>
          Provider listings are for informational purposes only. PeptideGuide is not affiliated with any listed provider. Always verify credentials and insurance acceptance directly.
        </p>
      </div>

      <button onClick={() => navigate('/')}
        style={{ width: '100%', background: 'transparent', color: t.ctaSecText, border: `0.5px solid ${t.ctaSecBorder}`, borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
        Back to home
      </button>
    </div>
  )
}
