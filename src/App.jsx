import { Routes, Route } from 'react-router-dom'
import Welcome from './screens/Welcome'
import Quiz from './screens/Quiz'
import Anatomy from './screens/Anatomy'
import Results from './screens/Results'
import Insurance from './screens/Insurance'
import AppealLetter from './screens/AppealLetter'
import Providers from './screens/Providers'

export default function App() {
  return (
    <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/anatomy" element={<Anatomy />} />
        <Route path="/results" element={<Results />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/appeal" element={<AppealLetter />} />
        <Route path="/providers" element={<Providers />} />
      </Routes>
    </div>
  )
}
