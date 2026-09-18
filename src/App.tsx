import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AccessCodeScreen } from './screens/AccessCodeScreen'
import { OverviewScreen } from './screens/OverviewScreen'
import { EquationScreen } from './screens/EquationScreen'
import { CodeRevealScreen } from './screens/CodeRevealScreen'
import { BonusListScreen } from './screens/BonusListScreen'
import { BonusEquationScreen } from './screens/BonusEquationScreen'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AccessCodeScreen />} />
        <Route path="/uebersicht" element={<OverviewScreen />} />
        <Route path="/gleichung/:index" element={<EquationScreen />} />
        <Route path="/code" element={<CodeRevealScreen />} />
        <Route path="/bonus" element={<BonusListScreen />} />
        <Route path="/bonus/:id" element={<BonusEquationScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App

