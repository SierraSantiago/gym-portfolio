import { PortfolioCanvas } from './components/three/PortfolioCanvas'
import { PortfolioOverlay } from './components/ui/PortfolioOverlay'
import { portfolioIdentity } from './data/portfolio'

function App() {
  return (
    <main className="app-shell">
      <PortfolioCanvas />
      <PortfolioOverlay identity={portfolioIdentity} />
    </main>
  )
}

export default App
