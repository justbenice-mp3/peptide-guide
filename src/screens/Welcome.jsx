import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: 48, marginBottom: '1rem' }}>💊</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem' }}>
            PeptideGuide
          </h1>
          <p style={{ fontSize: 16, color: '#aaa', lineHeight: 1.6 }}>
            Personalized peptide and GLP-1 education tool. Learn what may work for your wellness goals and how to talk to your doctor.
          </p>
        </div>

        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: 12, padding: '1rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>
            ⚠️ <strong style={{ color: '#aaa' }}>Not a medical service.</strong> This app provides educational information only. Always consult a licensed healthcare provider before starting any therapy.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button 
            className="btn-primary"
            onClick={() => navigate('/quiz')}
          >
            Get Started →
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/insurance')}
          >
            Jump to Insurance Navigator
          </button>
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: '#555', paddingTop: '1rem' }}>
        Free to use · No medical data stored
      </p>
    </div>
  )
}
