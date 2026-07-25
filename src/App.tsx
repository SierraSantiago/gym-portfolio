import { PortfolioCanvas } from './components/three/PortfolioCanvas'
import { PortfolioOverlay } from './components/ui/PortfolioOverlay'
import { ProjectUI } from './components/ui/ProjectUI'
import { ReceptionUI } from './components/ui/ReceptionUI'
import { portfolioIdentity } from './data/portfolio'

function App() {
  return (
    <main className="app-shell">
      <PortfolioCanvas />
      <PortfolioOverlay identity={portfolioIdentity} />
      <ProjectUI />
      <ReceptionUI />
    </main>
  )
}

export default App
