import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
})

export default function Results() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  const [stack, setStack] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    badge: dark ? '#0a1e32' : '#f0ead8',
    badgeBorder: dark ? '#1a3a5c' : '#e0d0b0',
    badgeText: dark ? '#4a9eff' : '#8a6a2a',
    divider: dark ? '#1a2a3a' : '#e8e2d8',
    cta: dark ? '#4a9eff' : '#c8a96e',
    ctaSecText: dark ? '#4a7aaa' : '#b0a090',
    ctaSecBorder: dark ? '#1a2a3a' : '#e0d8c8',
    disclaimer: dark ? '#0a1220' : '#faf7f2',
    disclaimerBorder: dark ? '#1a2a3a' : '#e8e2d8',
    disclaimerText: dark ? '#4a7aaa' : '#b0a090',
    toggleBg: dark ? '#1a2a3a' : '#e0d8c8',
    toggleText: dark ? '#4a7aaa' : '#b0a090',
    loadingText: dark ? '#4a7aaa' : '#b0a090',
    dot: dark ? '#4a9eff' : '#c8a96e',
  }

  useEffect(() => {
    generateStack()
  }, [])

  async function generateStack() {
    try {
      const profile = JSON.parse(localStorage.getItem('peptide_profile') || '{}')
      const prompt = `You are a peptide education assistant. Based on this wellness profile, suggest an educational peptide stack. This is NOT medical advice — it is for educational purposes only to help the user have an informed conversation with their healthcare provider.

Profile:
- Goals: ${profile.goals?.join(', ') || 'general wellness'}
- Age range: ${profile.age || 'unknown'}
- Biological sex: ${profile.sex || 'unknown'}
- Activity level: ${profile.activity || 'unknown'}
- Body focus areas: ${profile.bodyParts?.join(', ') || 'general'}

Respond ONLY with a valid JSON object in this exact format, no other text:
{
  "stack": [
    {
      "name": "peptide name",
      "category": "Recovery" or "Performance" or "Longevity" or "Cognitive" or "Hormonal" or "Weight",
      "tier": "Tier 1" or "Tier 2" or "Tier 3",
      "purpose": "one short sentence on what this peptide is known for educationally",
      "note": "one short sentence on why it fits this profile"
    }
  ],
  "summary": "2-3 sentence educational summary of this stack for this profile",
  "glp1_relevant": true or false
}`

      const completion = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
      })

      const raw = completion.choices[0].message.content
      const json = JSON.parse(raw)
      setStack(json)
    } catch (e) {
      setError('Unable to generate stack. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const categoryColors = {
    Recovery: { bg: dark ? '#0a1e32' : '#f0ead8', text: dark ? '#4a9eff' : '#8a6a2a', border: dark ? '#1a3a5c' : '#e0d0b0' },
    Performance: { bg: dark ? '#0a1e20' : '#eaf3de', text: dark ? '#4adf9f' : '#3b6d11', border: dark ? '#1a3a2a' : '#c0dd97' },
    Longevity: { bg: dark ? '#1a1020' : '#fbeaf0', text: dark ? '#bf7aff' : '#993556', border: dark ? '#3a1a5c' : '#f4c0d1' },
    Cognitive: { bg: dark ? '#0a1a30' : '#eeedfe', text: dark ? '#7a9aff' : '#534ab7', border: dark ? '#1a2a5c' : '#afa9ec' },
    Hormonal: { bg: dark ? '#1a100a' : '#faece7', text: dark ? '#ff8a4a' : '#993c1d', border: dark ? '#3a1a0a' : '#f5c4b3' },
    Weight: { bg: dark ? '#0a1a1a' : '#e1f5ee', text: dark ? '#4adfd0' : '#0f6e56', border: dark ? '#1a3a3a' : '#9fe1cb' },
  }

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

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: '50%', background: t.dot,
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
              }} />
            ))}
          </div>
          <p style={{ fontSize: 13, color: t.loadingText }}>Generating your educational stack...</p>
          <style>{`@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <p style={{ color: t.subtitle, marginBottom: '1rem' }}>{error}</p>
          <button onClick={generateStack} style={{ background: t.cta, color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 14, cursor: 'pointer' }}>
            Try again
          </button>
        </div>
      )}

      {stack && !loading && (
        <>
          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 8 }}>
            Your educational stack
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: t.title, letterSpacing: '-0.3px', marginBottom: 4 }}>
            Suggested peptide overview
          </h2>
          <p style={{ fontSize: 13, color: t.subtitle, marginBottom: '1.5rem', lineHeight: 1.6 }}>
            {stack.summary}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1.5rem' }}>
            {stack.stack.map((p, i) => {
              const colors = categoryColors[p.category] || categoryColors.Recovery
              return (
                <div key={i} style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: t.cardName }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: t.cardSub, marginTop: 2 }}>{p.purpose}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
                      <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, background: t.badge, color: t.badgeText, border: `0.5px solid ${t.badgeBorder}`, whiteSpace: 'nowrap' }}>
                        {p.tier}
                      </span>
                      <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, background: colors.bg, color: colors.text, border: `0.5px solid ${colors.border}`, whiteSpace: 'nowrap' }}>
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: t.eyebrow, fontStyle: 'italic' }}>{p.note}</div>
                </div>
              )
            })}
          </div>

          {stack.glp1_relevant && (
            <div style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: 10, padding: '14px 16px', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: 12, color: t.eyebrow, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>GLP-1 may also be relevant</div>
              <p style={{ fontSize: 13, color: t.cardSub, lineHeight: 1.6 }}>
                Based on your goals, GLP-1 receptor agonists such as semaglutide or tirzepatide may be worth discussing with your provider. Tap below to explore insurance coverage and telehealth options.
              </p>
            </div>
          )}

          <div style={{ background: t.disclaimer, border: `0.5px solid ${t.disclaimerBorder}`, borderRadius: 8, padding: '12px 14px', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: 12, color: t.disclaimerText, lineHeight: 1.6, margin: 0 }}>
              This is not a prescription. This educational overview is intended to help you have an informed conversation with a licensed healthcare provider. Do not begin any therapy without medical supervision.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => navigate('/insurance')}
              style={{ background: t.cta, color: '#fff', border: 'none', borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              Check insurance and find providers
            </button>
            <button onClick={() => navigate('/appeal')}
              style={{ background: 'transparent', color: t.ctaSecText, border: `0.5px solid ${t.ctaSecBorder}`, borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              Generate insurance appeal letter
            </button>
            <button onClick={() => navigate('/')}
              style={{ background: 'transparent', color: t.ctaSecText, border: `0.5px solid ${t.ctaSecBorder}`, borderRadius: 8, padding: '14px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              Start over
            </button>
          </div>
        </>
      )}
    </div>
  )
}
