import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import Welcome from './screens/Welcome'
import Quiz from './screens/Quiz'
import Anatomy from './screens/Anatomy'
import Results from './screens/Results'
import Insurance from './screens/Insurance'
import AppealLetter from './screens/AppealLetter'
import Providers from './screens/Providers'
import Settings from './screens/Settings'
import Tracker from './screens/Tracker'

function GearIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { dark } = useTheme()

  const hideOn = ['/settings']
  if (hideOn.includes(location.pathname)) return null

  const t = {
    bg: dark ? '#0d0f12' : '#ffffff',
    border: dark ? '#1a2a3a' : '#e8e2d8',
    active: dark ? '#4a9eff' : '#c8a96e',
    inactive: dark ? '#3a5a7a' : '#c0b0a0',
  }

  const tabs = [
    { path: '/', label: 'Home', icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? t.active : t.inactive} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )},
    { path: '/tracker', label: 'Tracker', icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? t.active : t.inactive} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 6v6l4 2" />
      </svg>
    )},
    { path: '/insurance', label: 'Insurance', icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? t.active : t.inactive} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )},
    { path: '/providers', label: 'Providers', icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? t.active : t.inactive} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )},
    { path: '/settings', label: 'Settings', icon: (active) => <GearIcon color={active ? t.active : t.inactive} /> },
  ]

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      background: t.bg, borderTop: `0.5px solid ${t.border}`,
      display: 'flex', padding: '8px 0 12px',
      zIndex: 100,
    }}>
      {tabs.map(tab => {
        const active = location.pathname === tab.path
        return (
          <button key={tab.path} onClick={() => navigate(tab.path)}
            style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 0' }}>
            {tab.icon(active)}
            <span style={{ fontSize: 10, color: active ? t.active : t.inactive, fontWeight: active ? 500 : 400 }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default function App() {
  return (
    <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100vh', paddingBottom: 70 }}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/anatomy" element={<Anatomy />} />
        <Route path="/results" element={<Results />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/appeal" element={<AppealLetter />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tracker" element={<Tracker />} />
      </Routes>
      <BottomNav />
    </div>
  )
}
