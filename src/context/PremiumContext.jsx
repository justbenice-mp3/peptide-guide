import { createContext, useContext, useState } from 'react'

const PROMO_CODES = {
  'PEPGUIDE6': { months: 6, label: '6 months free premium' },
  'WELCOME3': { months: 3, label: '3 months free premium' },
}

const PremiumContext = createContext()

export function PremiumProvider({ children }) {
  const [isPremium, setIsPremium] = useState(() => {
    const stored = localStorage.getItem('pepguide_premium')
    if (!stored) return false
    const { expiresAt } = JSON.parse(stored)
    return new Date(expiresAt) > new Date()
  })

  const [promoMessage, setPromoMessage] = useState('')

  function redeemCode(code) {
    const promo = PROMO_CODES[code.toUpperCase().trim()]
    if (!promo) {
      setPromoMessage('Invalid promo code. Please try again.')
      return false
    }
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + promo.months)
    localStorage.setItem('pepguide_premium', JSON.stringify({
      expiresAt: expiresAt.toISOString(),
      code: code.toUpperCase(),
    }))
    setIsPremium(true)
    setPromoMessage(`${promo.label} activated! Enjoy PepGuide Premium.`)
    return true
  }

  function getExpiry() {
    const stored = localStorage.getItem('pepguide_premium')
    if (!stored) return null
    const { expiresAt } = JSON.parse(stored)
    return new Date(expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <PremiumContext.Provider value={{ isPremium, redeemCode, promoMessage, setPromoMessage, getExpiry }}>
      {children}
    </PremiumContext.Provider>
  )
}

export function usePremium() {
  return useContext(PremiumContext)
}
