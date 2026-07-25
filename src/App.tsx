import { PortfolioCanvas } from './components/three/PortfolioCanvas'
import { MobileControls } from './components/ui/MobileControls'
import { PortfolioOverlay } from './components/ui/PortfolioOverlay'
import { ProjectUI } from './components/ui/ProjectUI'
import { ReceptionUI } from './components/ui/ReceptionUI'
import { portfolioIdentity } from './data/portfolio'

function App() {
  return (
    <main className="app-shell">
      <PortfolioCanvas />
      <PortfolioOverlay identity={portfolioIdentity} />
      <MobileControls />
      <ProjectUI />
      <ReceptionUI />
    </main>
  )
}

export default App
