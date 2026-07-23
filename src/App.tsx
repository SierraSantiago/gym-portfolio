import { PortfolioCanvas } from './components/three/PortfolioCanvas'
import { PortfolioOverlay } from './components/ui/PortfolioOverlay'
import { ReceptionUI } from './components/ui/ReceptionUI'
import { portfolioIdentity } from './data/portfolio'

function App() {
  return (
    <main className="app-shell">
      <PortfolioCanvas />
      <PortfolioOverlay identity={portfolioIdentity} />
      <ReceptionUI />
    </main>
  )
}

export default App
