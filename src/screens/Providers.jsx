import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const programs = [
  {
    id: 'ro',
    name: 'Ro Body',
    type: ['glp1'],
    specialty: 'GLP-1 weight management program',
    insurance: ['ppo', 'selfpay'],
    selfPayPrice: 'From $99/month',
    description: 'Comprehensive online weight care program with GLP-1 prescriptions, ongoing provider check-ins, and medication delivery.',
    url: 'https://ro.co/weight-loss',
    tag: 'GLP-1 focused',
    approvalOdds: { ppo: 'high', hmo: 'moderate', medicare: 'low', medicaid: 'low', tricare: 'low', selfpay: 'high' },
    conditions: ['obesity', 'diabetes'],
    strengths: ['Affordable self-pay', 'Fast onboarding', 'Medication delivery'],
  },
  {
    id: 'found',
    name: 'Found',
    type: ['glp1'],
    specialty: 'Personalized weight care + GLP-1',
    insurance: ['ppo', 'hmo', 'selfpay'],
    selfPayPrice: 'From $98/month',
    description: 'Science-based weight management combining GLP-1 prescriptions, coaching, and behavioral support.',
    url: 'https://joinfound.com',
    tag: 'Coaching included',
    approvalOdds: { ppo: 'high', hmo: 'moderate', medicare: 'low', medicaid: 'low', tricare: 'low', selfpay: 'high' },
    conditions: ['obesity', 'diabetes'],
    strengths: ['Behavioral coaching', 'Insurance billing', 'App-based tracking'],
  },
  {
    id: 'calibrate',
    name: 'Calibrate',
    type: ['glp1'],
    specialty: 'Metabolic health + GLP-1',
    insurance: ['ppo', 'hmo'],
    selfPayPrice: 'From $199/month',
    description: 'Year-long metabolic reset program with GLP-1 therapy, doctor visits, and lifestyle coaching.',
    url: 'https://joincalibrate.com',
    tag: 'Year-long program',
    approvalOdds: { ppo: 'high', hmo: 'high', medicare: 'moderate', medicaid: 'low', tricare: 'moderate', selfpay: 'high' },
    conditions: ['obesity', 'diabetes', 'hormone'],
    strengths: ['Insurance billing', 'Long-term support', 'Metabolic focus'],
  },
  {
    id: 'hone',
    name: 'Hone Health',
    type: ['glp1', 'peptides'],
    specialty: 'Hormone optimization + GLP-1',
    insurance: ['ppo', 'hmo', 'selfpay'],
    selfPayPrice: 'From $149/month',
    description: 'Telehealth platform for hormone optimization, GLP-1 therapy, and peptide protocols with ongoing provider support.',
    url: 'https://honehealth.com',
    tag: 'Hormones + GLP-1',
    approvalOdds: { ppo: 'high', hmo: 'moderate', medicare: 'low', medicaid: 'low', tricare: 'low', selfpay: 'high' },
    conditions: ['obesity', 'hormone', 'fatigue'],
    strengths: ['Insurance friendly', 'Hormone + GLP-1 combo', 'Lab testing included'],
  },
  {
    id: 'defy',
    name: 'Defy Medical',
    type: ['peptides'],
    specialty: 'Peptide and hormone therapy',
    insurance: ['ppo', 'selfpay'],
    selfPayPrice: 'Consultation from $250',
    description: 'Nationally recognized telehealth clinic specializing in peptide therapy, TRT, and advanced hormone optimization.',
    url: 'https://defymedical.com',
    tag: 'Peptide specialist',
    approvalOdds: { ppo: 'moderate', hmo: 'low', medicare: 'low', medicaid: 'low', tricare: 'low', selfpay: 'high' },
    conditions: ['injury', 'fatigue', 'hormone', 'libido'],
    strengths: ['Peptide expertise', 'Comprehensive labs', 'Experienced providers'],
  },
  {
    id: 'marek',
    name: 'Marek Health',
    type: ['peptides'],
    specialty: 'Lab-based performance optimization',
    insurance: ['selfpay'],
    selfPayPrice: 'From $199/month',
    description: 'Evidence-based hormone and peptide optimization with comprehensive lab testing and performance-focused protocols.',
    url: 'https://marekhealth.com',
    tag: 'Performance focused',
    approvalOdds: { ppo: 'low', hmo: 'low', medicare: 'low', medicaid: 'low', tricare: 'low', selfpay: 'high' },
    conditions: ['fatigue', 'hormone', 'injury', 'libido'],
    strengths: ['Detailed lab analysis', 'Performance protocols', 'Evidence-based'],
  },
  {
    id: 'maximus',
    name: 'Maximus',
    type: ['peptides'],
    specialty: 'Men\'s performance and peptide therapy',
    insurance: ['selfpay'],
    selfPayPrice: 'From $129/month',
    description: 'Men\'s health telehealth focused on testosterone optimization, peptide therapy, and performance enhancement.',
    url: 'https://maximustribe.com',
    tag: 'Men\'s health',
    approvalOdds: { ppo: 'low', hmo: 'low', medicare: 'low', medicaid: 'low', tricare: 'low', selfpay: 'high' },
    conditions: ['hormone', 'fatigue', 'libido', 'muscle'],
    strengths: ['Men\'s focus', 'Affordable', 'Performance protocols'],
  },
  {
    id: 'nourish',
    name: 'Nourish',
    type: ['nutrition'],
    specialty: 'Registered dietitian telehealth',
    insurance: ['ppo', 'hmo', 'medicare', 'medicaid'],
    selfPayPrice: 'From $149/session',
    description: 'Insurance-covered registered dietitian sessions via telehealth. Specializes in metabolic health, weight management, and GLP-1 support.',
    url: 'https://usenourish.com',
    tag: 'Most insurance',
    approvalOdds: { ppo: 'high', hmo: 'high', medicare: 'high', medicaid: 'high', tricare: 'moderate', selfpay: 'high' },
    conditions: ['obesity', 'diabetes', 'ibs', 'fatigue'],
    strengths: ['Covered by most insurance', 'RD certified', 'GLP-1 nutrition support'],
  },
  {
    id: 'fay',
    name: 'Fay Nutrition',
    type: ['nutrition'],
    specialty: 'Insurance-covered nutrition counseling',
    insurance: ['ppo', 'hmo', 'medicare'],
    selfPayPrice: 'From $99/session',
    description: 'Registered dietitians specializing in metabolic health, hormone optimization, and weight management via telehealth.',
    url: 'https://myfaynutrition.com',
    tag: 'Metabolic focus',
    approvalOdds: { ppo: 'high', hmo: 'high', medicare: 'high', medicaid: 'moderate', tricare: 'moderate', selfpay: 'high' },
    conditions: ['obesity', 'diabetes', 'hormone', 'ibs'],
    strengths: ['Insurance billing', 'Metabolic specialists', 'Hormone nutrition'],
  },
  {
    id: 'plushcare',
    name: 'Plushcare',
    type: ['glp1', 'nutrition'],
    specialty: 'Primary care + GLP-1 telehealth',
    insurance: ['ppo', 'hmo', 'medicare', 'medicaid', 'tricare'],
    selfPayPrice: 'From $129/month',
    description: 'Primary care telehealth accepting most major insurance plans. Can prescribe GLP-1 medications and refer to nutrition support.',
    url: 'https://plushcare.com',
    tag: 'Widest insurance',
    approvalOdds: { ppo: 'high', hmo: 'high', medicare: 'high', medicaid: 'high', tricare: 'high', selfpay: 'high' },
    conditions: ['obesity', 'diabetes', 'fatigue'],
    strengths: ['Accepts most insurance', 'Primary care flexibility', 'Fast appointments'],
  },
]

const matchLabels = {
  strong: { label: 'Strong match', color: '#639922', bg: '#eaf3de', border: '#c0dd97', darkColor: '#4adf9f', darkBg: '#0a1e20', darkBorder: '#1a3a2a' },
  good: { label: 'Good match', color: '#ba7517', bg: '#fef3e2', border: '#f5d68a', darkColor: '#ffb74a', darkBg: '#1a1200', darkBorder: '#3a2a00' },
  partial: { label: 'Partial match', color: '#888', bg: '#f5f5f5', border: '#ddd', darkColor: '#5a7a9a', darkBg: '#111620', darkBorder: '#1a2a3a' },
}

const approvalConfig = {
  high: { label: 'High approval odds', color: '#639922', dot: '#4caf50' },
  moderate: { label: 'Moderate approval odds', color: '#ba7517', dot: '#ff9800' },
  low: { label: 'Lower approval odds', color: '#e24b4a', dot: '#f44336' },
}

function getMatchScore(program, profile) {
  let score = 0
  const { goals = [], insurance = '', bodyParts = [], conditions = [] } = profile

  if (insurance && program.insurance.includes(insurance)) score += 40
  else if (insurance === 'selfpay') score += 30

  const therapyGoalMap = {
    glp1: ['glp1', 'fat_loss'],
    peptides: ['recovery', 'muscle', 'cognitive', 'longevity', 'sleep', 'libido'],
    nutrition: ['fat_loss', 'glp1', 'longevity'],
  }

  program.type.forEach(type => {
    const relevantGoals = therapyGoalMap[type] || []
    const goalMatches = goals.filter(g => relevantGoals.includes(g)).length
    score += goalMatches * 15
  })

  if (conditions && program.conditions) {
    const conditionMatches = conditions.filter(c => program.conditions.includes(c)).length
    score += conditionMatches * 10
  }

  if (score >= 60) return 'strong'
  if (score >= 35) return 'good'
  return 'partial'
}

export default function Providers() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  const [tab, setTab] = useState('all')

  const profile = JSON.parse(localStorage.getItem('peptide_profile') || '{}')
  const insurance = profile.insurance || ''
  const conditions = profile.conditions || []

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
    priceBg: dark ? '#0a1220' : '#faf7f2',
    priceText: dark ? '#4a7aaa' : '#9a8a78',
    priceBorder: dark ? '#1a2a3a' : '#e8e2d8',
    strengthBg: dark ? '#111620' : '#f5f4f0',
    strengthText: dark ? '#4a7aaa' : '#9a8a78',
  }

  const tabs = [
    { id: 'all', label: 'All programs' },
    { id: 'glp1', label: 'GLP-1' },
    { id: 'peptides', label: 'Peptides' },
    { id: 'nutrition', label: 'Nutrition' },
  ]

  const filtered = programs
    .filter(p => tab === 'all' ? true : p.type.includes(tab))
    .map(p => ({ ...p, matchScore: getMatchScore(p, profile) }))
    .sort((a, b) => {
      const order = { strong: 0, good: 1, partial: 2 }
      return order[a.matchScore] - order[b.matchScore]
    })

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

      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: t.ctaSecText, fontSize: 13, cursor: 'pointer', marginBottom: '1rem', padding: 0 }}>
        ← Back
      </button>

      <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 8 }}>
        Program matching
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: t.title, letterSpacing: '-0.3px', marginBottom: 4 }}>
        Your matched programs
      </h2>
      <p style={{ fontSize: 13, color: t.subtitle, marginBottom: '1.5rem', lineHeight: 1.5 }}>
        {profile.goals?.length > 0
          ? `Matched to your goals and ${insurance ? insurance.toUpperCase() + ' insurance' : 'profile'}. Sorted by best fit.`
          : 'Browse programs by therapy type. Complete the quiz for personalized matching.'}
      </p>

      <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {tabs.map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)} style={{
            background: tab === tb.id ? t.pillOn : t.pill,
            border: `${tab === tb.id ? '1.5px' : '0.5px'} solid ${tab === tb.id ? t.pillBorderOn : t.pillBorder}`,
            borderRadius: 99, padding: '7px 14px', fontSize: 12, fontWeight: 500,
            color: tab === tb.id ? '#ffffff' : t.pillText, cursor: 'pointer'
          }}>{tb.label}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '1.5rem' }}>
        {filtered.map((p) => {
          const match = matchLabels[p.matchScore]
          const approvalOdd = insurance ? approvalConfig[p.approvalOdds[insurance]] : null
          const matchColor = dark ? match.darkColor : match.color
          const matchBg = dark ? match.darkBg : match.bg
          const matchBorder = dark ? match.darkBorder : match.border

          return (
            <div key={p.id} style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: 12, overflow: 'hidden' }}>

              <div style={{ padding: '14px 16px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ flex: 1, marginRight: 10 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: t.cardName }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: t.cardSub, marginTop: 2 }}>{p.specialty}</div>
                  </div>
                  <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, background: t.tagBg, color: t.tagText, border: `0.5px solid ${t.tagBorder}`, whiteSpace: 'nowrap' }}>
                    {p.tag}
                  </span>
                </div>

                <p style={{ fontSize: 13, color: t.cardSub, lineHeight: 1.6, marginBottom: 12 }}>
                  {p.description}
                </p>

                <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, background: matchBg, color: matchColor, border: `0.5px solid ${matchBorder}`, fontWeight: 500 }}>
                    {match.label}
                  </span>
                  {approvalOdd && (
                    <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, background: dark ? '#111620' : '#fff', border: `0.5px solid ${t.cardBorder}`, color: t.cardSub, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: approvalOdd.dot, display: 'inline-block', flexShrink: 0 }} />
                      {approvalOdd.label}
                    </span>
                  )}
                </div>

                <div style={{ background: t.priceBg, border: `0.5px solid ${t.priceBorder}`, borderRadius: 6, padding: '8px 12px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: t.priceText, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Self-pay estimate</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: t.cardName }}>{p.selfPayPrice}</span>
                </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                  {p.strengths.map((s, i) => (
                    <span key={i} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 99, background: t.strengthBg, color: t.strengthText, border: `0.5px solid ${t.cardBorder}` }}>
                      {s}
                    </span>
                  ))}
                </div>

                <div style={{ fontSize: 11, color: t.eyebrow, marginBottom: 10 }}>
                  Accepts: {p.insurance.map(i => i === 'selfpay' ? 'Self-pay' : i.toUpperCase()).join(' · ')}
                </div>
              </div>

              <div style={{ borderTop: `0.5px solid ${t.cardBorder}`, padding: '10px 16px' }}>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', background: t.cta, color: '#fff', border: 'none', borderRadius: 6, padding: '10px 14px', fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>
                  Visit {p.name}
                </a>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ background: t.disclaimer, border: `0.5px solid ${t.disclaimerBorder}`, borderRadius: 8, padding: '12px 14px', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: 12, color: t.disclaimerText, lineHeight: 1.6, margin: 0 }}>
          Program listings are for informational purposes only. Match scores and approval odds are estimates based on general insurance data. Always verify coverage directly with your insurance provider and the program before enrolling.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={() => navigate('/appeal')}
          style={{ background: 'transparent', color: t.ctaSecText, border: `0.5px solid ${t.ctaSecBorder}`, borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
          Generate insurance appeal letter
        </button>
        <button onClick={() => navigate('/')}
          style={{ background: 'transparent', color: t.ctaSecText, border: `0.5px solid ${t.ctaSecBorder}`, borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
          Back to home
        </button>
      </div>
    </div>
  )
}
