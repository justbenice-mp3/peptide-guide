import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const insuranceTypes = [
  { id: 'ppo', label: 'PPO', sub: 'Private / preferred provider' },
  { id: 'hmo', label: 'HMO', sub: 'Health maintenance org' },
  { id: 'medicare', label: 'Medicare', sub: 'Federal coverage 65+' },
  { id: 'medicaid', label: 'Medicaid', sub: 'State assistance program' },
  { id: 'tricare', label: 'Tricare', sub: 'Military coverage' },
  { id: 'selfpay', label: 'Self-pay', sub: 'No insurance' },
]

const therapyTypes = [
  { id: 'peptides', label: 'Peptide therapy' },
  { id: 'glp1', label: 'GLP-1 therapy' },
  { id: 'both', label: 'Both' },
]

const conditions = [
  { id: 'obesity', label: 'Obesity / overweight', glp1: true, peptide: false },
  { id: 'diabetes', label: 'Type 2 diabetes', glp1: true, peptide: false },
  { id: 'injury', label: 'Chronic injury', glp1: false, peptide: true },
  { id: 'fatigue', label: 'Chronic fatigue', glp1: false, peptide: true },
  { id: 'hormone', label: 'Hormone imbalance', glp1: false, peptide: true },
  { id: 'ibs', label: 'IBS / gut issues', glp1: false, peptide: true },
  { id: 'none', label: 'None of the above', glp1: false, peptide: false },
]

const approvalData = {
  ppo: {
    peptides: { likelihood: 'Low', color: '#e24b4a', tip: 'Most PPO plans do not cover peptide therapy. A letter of medical necessity from your provider significantly improves chances.' },
    glp1: { likelihood: 'High', color: '#639922', tip: 'PPO plans frequently cover GLP-1s for obesity or diabetes diagnoses. Prior authorization is usually required.' },
  },
  hmo: {
    peptides: { likelihood: 'Very low', color: '#e24b4a', tip: 'HMO plans rarely cover peptide therapy. Self-pay or appeal with strong medical documentation is your best path.' },
    glp1: { likelihood: 'Moderate', color: '#ba7517', tip: 'HMO coverage for GLP-1s varies. You must see an in-network provider first and get a referral.' },
  },
  medicare: {
    peptides: { likelihood: 'Very low', color: '#e24b4a', tip: 'Medicare does not typically cover peptide therapy. Consider self-pay compounding pharmacies.' },
    glp1: { likelihood: 'Moderate', color: '#ba7517', tip: 'Medicare Part D may cover GLP-1s for diabetes. Coverage for weight loss alone is limited but expanding.' },
  },
  medicaid: {
    peptides: { likelihood: 'Very low', color: '#e24b4a', tip: 'Medicaid rarely covers peptide therapy. Focus on appeal documentation and medical necessity.' },
    glp1: { likelihood: 'Moderate', color: '#ba7517', tip: 'Some state Medicaid programs cover GLP-1s for diabetes. Coverage for obesity varies by state.' },
  },
  tricare: {
    peptides: { likelihood: 'Low', color: '#e24b4a', tip: 'Tricare does not typically cover peptide therapy. An appeal with military health documentation may help.' },
    glp1: { likelihood: 'Moderate', color: '#ba7517', tip: 'Tricare covers some GLP-1s for diabetes. Weight loss coverage is limited but improving.' },
  },
  selfpay: {
    peptides: { likelihood: 'N/A', color: '#639922', tip: 'Self-pay gives you direct access. Reputable compounding pharmacies include Empower Pharmacy, Talon Compounding, and Limitless Life Nootropics.' },
    glp1: { likelihood: 'N/A', color: '#639922', tip: 'Self-pay GLP-1 options are widely available. Hone Health, Marek Health, and Ro Body offer affordable self-pay programs.' },
  },
}

export default function Insurance() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  const [insurance, setInsurance] = useState('')
  const [therapy, setTherapy] = useState('')
  const [selectedConditions, setSelectedConditions] = useState([])

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
    pillSub: dark ? '#3a6a90' : '#b0a090',
    pillSubOn: dark ? '#4a9eff' : '#f0e8d8',
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
    divider: dark ? '#1a2a3a' : '#e8e2d8',
  }

  function toggleCondition(id) {
    if (id === 'none') { setSelectedConditions(['none']); return }
    setSelectedConditions(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev.filter(x => x !== 'none'), id]
    )
  }

  const approval = insurance && therapy
    ? approvalData[insurance]?.[therapy === 'both' ? 'glp1' : therapy]
    : null

  const showConditionBoost = selectedConditions.length > 0 &&
    !selectedConditions.includes('none') &&
    conditions.some(c => selectedConditions.includes(c.id) &&
      (therapy === 'glp1' ? c.glp1 : therapy === 'peptides' ? c.peptide : c.glp1 || c.peptide))

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
        Insurance navigator
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: t.title, letterSpacing: '-0.3px', marginBottom: 4 }}>
        Coverage and approval guide
      </h2>
      <p style={{ fontSize: 13, color: t.subtitle, marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Find out your approval likelihood and get resources specific to your insurance
      </p>

      <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 10 }}>
        Your insurance type
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.5rem' }}>
        {insuranceTypes.map(ins => {
          const on = insurance === ins.id
          return (
            <button key={ins.id} onClick={() => setInsurance(ins.id)} style={{
              background: on ? t.pillOn : t.pill,
              border: `${on ? '1.5px' : '0.5px'} solid ${on ? t.pillBorderOn : t.pillBorder}`,
              borderRadius: 8, padding: '10px 12px', textAlign: 'left', cursor: 'pointer'
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: on ? t.pillTextOn : t.pillText }}>{ins.label}</div>
              <div style={{ fontSize: 11, marginTop: 2, color: on ? t.pillSubOn : t.pillSub }}>{ins.sub}</div>
            </button>
          )
        })}
      </div>

      <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 10 }}>
        Therapy type
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
        {therapyTypes.map(th => {
          const on = therapy === th.id
          return (
            <button key={th.id} onClick={() => setTherapy(th.id)} style={{
              flex: 1, background: on ? t.pillOn : t.pill,
              border: `${on ? '1.5px' : '0.5px'} solid ${on ? t.pillBorderOn : t.pillBorder}`,
              borderRadius: 8, padding: '10px 8px', textAlign: 'center', cursor: 'pointer',
              fontSize: 13, fontWeight: 500, color: on ? t.pillTextOn : t.pillText
            }}>{th.label}</button>
          )
        })}
      </div>

      <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 10 }}>
        Relevant health conditions
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.5rem' }}>
        {conditions.map(c => {
          const on = selectedConditions.includes(c.id)
          return (
            <button key={c.id} onClick={() => toggleCondition(c.id)} style={{
              background: on ? t.pillOn : t.pill,
              border: `${on ? '1.5px' : '0.5px'} solid ${on ? t.pillBorderOn : t.pillBorder}`,
              borderRadius: 8, padding: '10px 12px', textAlign: 'left', cursor: 'pointer',
              fontSize: 13, fontWeight: 500, color: on ? t.pillTextOn : t.pillText
            }}>{c.label}</button>
          )
        })}
      </div>

      {approval && (
        <>
          <div style={{ height: 0.5, background: t.divider, marginBottom: '1.5rem' }} />

          <div style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: 10, padding: '16px', marginBottom: '1rem' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 8 }}>
              Approval likelihood
            </div>
            <div style={{ fontSize: 28, fontWeight: 500, color: approval.color, marginBottom: 8 }}>
              {approval.likelihood}
            </div>
            <p style={{ fontSize: 13, color: t.cardSub, lineHeight: 1.6, margin: 0 }}>
              {approval.tip}
            </p>
          </div>

          {showConditionBoost && (
            <div style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: 10, padding: '14px 16px', marginBottom: '1rem' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#639922', marginBottom: 6 }}>
                Condition boost
              </div>
              <p style={{ fontSize: 13, color: t.cardSub, lineHeight: 1.6, margin: 0 }}>
                Your selected health conditions may improve your approval chances. Mention these specifically in your prior authorization request and appeal letter.
              </p>
            </div>
          )}

          <div style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: 10, padding: '14px 16px', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 12 }}>
              What to tell your doctor
            </div>
            {[
              'Request a letter of medical necessity specifically mentioning your diagnosis',
              'Ask for CPT codes that align with your treatment plan',
              'Request documentation of failed alternative treatments',
              'Ask your doctor to include peer-reviewed references supporting the therapy',
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < 3 ? 10 : 0 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.brandDot, marginTop: 5, flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: t.cardSub, lineHeight: 1.6, margin: 0 }}>{tip}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1.5rem' }}>
            <button onClick={() => navigate('/appeal')}
              style={{ background: t.cta, color: '#fff', border: 'none', borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              Generate appeal letter
            </button>
            <button onClick={() => navigate('/providers')}
              style={{ background: 'transparent', color: t.ctaSecText, border: `0.5px solid ${t.ctaSecBorder}`, borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              Find a telehealth provider
            </button>
          </div>
        </>
      )}

      <div style={{ background: t.disclaimer, border: `0.5px solid ${t.disclaimerBorder}`, borderRadius: 8, padding: '12px 14px' }}>
        <p style={{ fontSize: 12, color: t.disclaimerText, lineHeight: 1.6, margin: 0 }}>
          Coverage information is for educational purposes only and may not reflect your specific plan. Contact your insurance provider directly to confirm benefits.
        </p>
      </div>
    </div>
  )
}
