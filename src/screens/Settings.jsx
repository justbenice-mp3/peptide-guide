import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { usePremium } from '../context/PremiumContext'

export default function Settings() {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  const { isPremium, redeemCode, promoMessage, setPromoMessage, getExpiry } = usePremium()
  const [promoInput, setPromoInput] = useState('')
  const [promoStep, setPromoStep] = useState(false)

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
    divider: dark ? '#1a2a3a' : '#e8e2d8',
    cta: dark ? '#4a9eff' : '#c8a96e',
    ctaSecText: dark ? '#4a7aaa' : '#b0a090',
    ctaSecBorder: dark ? '#1a2a3a' : '#e0d8c8',
    input: dark ? '#111620' : '#ffffff',
    inputBorder: dark ? '#1e2d3e' : '#e0d8c8',
    inputText: dark ? '#ffffff' : '#2a2218',
    toggleBg: dark ? '#1a2a3a' : '#e0d8c8',
    toggleText: dark ? '#4a7aaa' : '#b0a090',
    disclaimer: dark ? '#0a1220' : '#faf7f2',
    disclaimerBorder: dark ? '#1a2a3a' : '#e8e2d8',
    disclaimerText: dark ? '#4a7aaa' : '#b0a090',
    premiumBg: dark ? '#0a1e32' : '#f0ead8',
    premiumBorder: dark ? '#1a3a5c' : '#e0d0b0',
    premiumText: dark ? '#4a9eff' : '#8a6a2a',
    successBg: dark ? '#0a1e0a' : '#eaf3de',
    successBorder: dark ? '#1a3a1a' : '#c0dd97',
    successText: dark ? '#4adf9f' : '#3b6d11',
    errorBg: dark ? '#1e0a0a' : '#fbeaea',
    errorBorder: dark ? '#3a1a1a' : '#f5c0c0',
    errorText: dark ? '#ff6a6a' : '#993333',
  }

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: `0.5px solid ${t.divider}`,
    cursor: 'pointer',
  }

  const rowLabel = {
    fontSize: 14,
    color: t.cardName,
    fontWeight: 500,
  }

  const rowSub = {
    fontSize: 12,
    color: t.cardSub,
    marginTop: 2,
  }

  const chevron = (
    <span style={{ fontSize: 16, color: t.eyebrow }}>›</span>
  )

  function handlePromo() {
    if (!promoInput.trim()) return
    const success = redeemCode(promoInput)
    if (success) setPromoInput('')
  }

  return (
    <div style={{ minHeight: '100vh', background: t.bg, padding: '1.5rem' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.brandDot }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: t.brandName, letterSpacing: '0.03em' }}>PepGuide</span>
        </div>
        <button onClick={() => navigate(-1)} style={{ background: t.toggleBg, border: 'none', borderRadius: 99, padding: '5px 12px', fontSize: 12, color: t.toggleText, cursor: 'pointer' }}>
          Done
        </button>
      </div>

      <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 8 }}>
        Settings
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: t.title, letterSpacing: '-0.3px', marginBottom: '1.5rem' }}>
        Preferences
      </h2>

      {isPremium && (
        <div style={{ background: t.premiumBg, border: `0.5px solid ${t.premiumBorder}`, borderRadius: 10, padding: '12px 16px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: t.premiumText }}>Premium active</div>
            <div style={{ fontSize: 12, color: t.premiumText, opacity: 0.8, marginTop: 2 }}>Expires {getExpiry()}</div>
          </div>
          <span style={{ fontSize: 18 }}>★</span>
        </div>
      )}

      <div style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: 10, padding: '0 16px', marginBottom: '1.25rem' }}>

        <div style={rowStyle} onClick={toggle}>
          <div>
            <div style={rowLabel}>Appearance</div>
            <div style={rowSub}>{dark ? 'Dark mode' : 'Light mode'}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 40, height: 22, borderRadius: 99,
              background: dark ? t.cta : t.divider,
              position: 'relative', cursor: 'pointer', transition: 'background 0.2s'
            }}>
              <div style={{
                position: 'absolute', top: 3,
                left: dark ? 21 : 3,
                width: 16, height: 16,
                borderRadius: '50%', background: '#fff',
                transition: 'left 0.2s'
              }} />
            </div>
          </div>
        </div>

        <div style={{ ...rowStyle, borderBottom: 'none' }} onClick={() => setPromoStep(!promoStep)}>
          <div>
            <div style={rowLabel}>Redeem promo code</div>
            <div style={rowSub}>Enter a code for free premium access</div>
          </div>
          {chevron}
        </div>
      </div>

      {promoStep && (
        <div style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: 10, padding: '16px', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 8 }}>
            Enter promo code
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input
              value={promoInput}
              onChange={e => { setPromoInput(e.target.value); setPromoMessage('') }}
              placeholder="e.g. PEPGUIDE6"
              style={{
                flex: 1, background: t.input, border: `0.5px solid ${t.inputBorder}`,
                borderRadius: 8, padding: '11px 14px', fontSize: 14,
                color: t.inputText, outline: 'none',
                textTransform: 'uppercase', letterSpacing: '0.05em'
              }}
            />
            <button onClick={handlePromo} style={{
              background: t.cta, color: '#fff', border: 'none',
              borderRadius: 8, padding: '11px 18px', fontSize: 14,
              fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap'
            }}>
              Apply
            </button>
          </div>
          {promoMessage && (
            <div style={{
              padding: '10px 12px', borderRadius: 6, fontSize: 12, lineHeight: 1.5,
              background: promoMessage.includes('Invalid') ? t.errorBg : t.successBg,
              border: `0.5px solid ${promoMessage.includes('Invalid') ? t.errorBorder : t.successBorder}`,
              color: promoMessage.includes('Invalid') ? t.errorText : t.successText,
            }}>
              {promoMessage}
            </div>
          )}
        </div>
      )}

      {!isPremium && (
        <div style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: 10, padding: '16px', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.eyebrow, marginBottom: 8 }}>
            Upgrade to premium
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, color: t.cardName, marginBottom: 4 }}>
            Unlock full micronutrient tracking
          </div>
          <p style={{ fontSize: 13, color: t.cardSub, lineHeight: 1.6, marginBottom: '1rem' }}>
            Get detailed vitamin, mineral, and electrolyte breakdowns. Understand exactly what your body needs to support your peptide or GLP-1 protocol.
          </p>
          <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
            <div style={{ flex: 1, background: t.premiumBg, border: `0.5px solid ${t.premiumBorder}`, borderRadius: 8, padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: t.premiumText }}>$4.99</div>
              <div style={{ fontSize: 11, color: t.premiumText, opacity: 0.8 }}>per month</div>
            </div>
            <div style={{ flex: 1, background: t.premiumBg, border: `1.5px solid ${t.cta}`, borderRadius: 8, padding: '12px', textAlign: 'center', position: 'relative' }}>
              <div style={{ fontSize: 10, color: '#fff', background: t.cta, borderRadius: 99, padding: '2px 8px', position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>Best value</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: t.premiumText }}>$19.99</div>
              <div style={{ fontSize: 11, color: t.premiumText, opacity: 0.8 }}>per year</div>
            </div>
          </div>
          <button style={{ width: '100%', background: t.cta, color: '#fff', border: 'none', borderRadius: 8, padding: '13px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            Upgrade now
          </button>
        </div>
      )}

      <div style={{ background: t.card, border: `0.5px solid ${t.cardBorder}`, borderRadius: 10, padding: '0 16px', marginBottom: '1.25rem' }}>
        <a href="mailto:support@pepguide.com" style={{ textDecoration: 'none' }}>
          <div style={rowStyle}>
            <div>
              <div style={rowLabel}>Contact us</div>
              <div style={rowSub}>support@pepguide.com</div>
            </div>
            {chevron}
          </div>
        </a>

        <div style={rowStyle} onClick={() => alert('Thank you! Please leave a review on the App Store or Google Play.')}>
          <div>
            <div style={rowLabel}>Rate PepGuide</div>
            <div style={rowSub}>Enjoying the app? Let us know</div>
          </div>
          {chevron}
        </div>

        <div style={rowStyle} onClick={() => navigate('/privacy')}>
          <div>
            <div style={rowLabel}>Privacy policy</div>
            <div style={rowSub}>How we handle your data</div>
          </div>
          {chevron}
        </div>

        <div style={{ ...rowStyle, borderBottom: 'none' }} onClick={() => navigate('/terms')}>
          <div>
            <div style={rowLabel}>Terms of service</div>
            <div style={rowSub}>Usage guidelines</div>
          </div>
          {chevron}
        </div>
      </div>

      <div style={{ background: t.disclaimer, border: `0.5px solid ${t.disclaimerBorder}`, borderRadius: 8, padding: '12px 14px', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: 12, color: t.disclaimerText, lineHeight: 1.6, margin: 0 }}>
          PepGuide is a wellness education tool. Not a medical service. Always consult a licensed healthcare provider before starting any therapy.
        </p>
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: t.eyebrow }}>
        PepGuide v1.0.0 · Made with care
      </p>
    </div>
  )
}
