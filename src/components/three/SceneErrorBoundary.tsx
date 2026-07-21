import type { ReactNode } from 'react'
import { Component } from 'react'
import { Html } from '@react-three/drei'

interface SceneErrorBoundaryProps {
  children: ReactNode
}

interface SceneErrorBoundaryState {
  error: Error | null
}

const errorPanelStyle = {
  width: 'min(420px, calc(100vw - 40px))',
  padding: '18px',
  border: '1px solid rgba(245, 138, 58, 0.24)',
  borderRadius: '18px',
  background:
    'linear-gradient(180deg, rgba(10, 13, 19, 0.96), rgba(10, 13, 19, 0.86))',
  boxShadow: '0 18px 56px rgba(0, 0, 0, 0.42)',
  color: '#f4f6fb',
  fontFamily: "'Aptos', 'Segoe UI', sans-serif",
  pointerEvents: 'none',
} as const

export class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = {
    error: null,
  }

  static getDerivedStateFromError(error: Error): SceneErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error) {
    if (import.meta.env.DEV) {
      console.error('3D scene asset error:', error)
    }
  }

  render() {
    if (this.state.error) {
      return (
        <Html center>
          <div style={errorPanelStyle}>
            <p
              style={{
                margin: 0,
                color: '#f59a57',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              Asset load error
            </p>
            <p
              style={{
                margin: '10px 0 0',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              The gym scene could not finish loading.
            </p>
            <p
              style={{
                margin: '8px 0 0',
                color: '#c9d0dc',
                fontSize: '0.92rem',
                lineHeight: 1.5,
              }}
            >
              {this.state.error.message}
            </p>
          </div>
        </Html>
      )
    }

    return this.props.children
  }
}
