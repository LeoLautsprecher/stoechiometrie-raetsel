import { Navigate, Link } from 'react-router-dom'
import { FINAL_CODE, mainEquations } from '../config/equations'
import { isMainSolved, isUnlocked } from '../state/progress'

export function CodeRevealScreen() {
  if (!isUnlocked()) return <Navigate to="/" replace />

  const allSolved = mainEquations.every((eq) => isMainSolved(eq.id))
  if (!allSolved) return <Navigate to="/uebersicht" replace />

  return (
    <div className="screen">
      <h1>Geschafft!</h1>
      <p>Hier ist dein Code für das nächste Rätsel:</p>
      <div className="code-display">{FINAL_CODE}</div>
      <div className="nav-row">
        <Link className="btn btn-secondary" to="/uebersicht">
          Übersicht
        </Link>
        <Link className="btn btn-secondary" to="/bonus">
          Zu den Bonusgleichungen
        </Link>
      </div>
    </div>
  )
}
