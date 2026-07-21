import { Html, useProgress } from '@react-three/drei'

const loaderPanelStyle = {
  width: 'min(320px, calc(100vw - 40px))',
  padding: '18px 18px 16px',
  border: '1px solid rgba(245, 138, 58, 0.22)',
  borderRadius: '18px',
  background:
    'linear-gradient(180deg, rgba(8, 11, 17, 0.94), rgba(8, 11, 17, 0.82))',
  boxShadow: '0 22px 60px rgba(0, 0, 0, 0.38)',
  color: '#f3f6fb',
  fontFamily: "'Aptos', 'Segoe UI', sans-serif",
  pointerEvents: 'none',
} as const

const loaderMetaStyle = {
  margin: 0,
  color: '#f59a57',
  fontSize: '0.74rem',
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
} as const

const loaderTitleStyle = {
  margin: '10px 0 6px',
  fontSize: '1.25rem',
  fontWeight: 700,
  letterSpacing: '-0.02em',
} as const

const loaderTextStyle = {
  margin: 0,
  color: '#b7c0cf',
  fontSize: '0.96rem',
} as const

const loaderTrackStyle = {
  marginTop: '16px',
  width: '100%',
  height: '5px',
  borderRadius: '999px',
  background: 'rgba(255, 255, 255, 0.08)',
  overflow: 'hidden',
} as const

const loaderBarStyle = {
  height: '100%',
  borderRadius: '999px',
  background: 'linear-gradient(90deg, #f58a3a 0%, #ffe2b5 100%)',
} as const

export function SceneLoader() {
  const { progress } = useProgress()
  const roundedProgress = Math.round(progress)

  return (
    <Html center>
      <div style={loaderPanelStyle}>
        <p style={loaderMetaStyle}>Santiago Sierra</p>
        <p style={loaderTitleStyle}>Loading gym</p>
        <p style={loaderTextStyle}>{roundedProgress}%</p>
        <div style={loaderTrackStyle}>
          <div style={{ ...loaderBarStyle, width: `${roundedProgress}%` }} />
        </div>
      </div>
    </Html>
  )
}
