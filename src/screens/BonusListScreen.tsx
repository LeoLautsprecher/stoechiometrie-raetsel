import { Link, Navigate } from 'react-router-dom'
import { bonusEquations, mainEquations } from '../config/equations'
import { isBonusSolved, isMainSolved, isUnlocked } from '../state/progress'

export function BonusListScreen() {
  if (!isUnlocked()) return <Navigate to="/" replace />
  const allMainSolved = mainEquations.every((eq) => isMainSolved(eq.id))
  if (!allMainSolved) return <Navigate to="/uebersicht" replace />

  return (
    <div className="screen">
      <h1>Bonusgleichungen</h1>
      <p>Diese Gleichungen sind optional und schwerer.</p>
      <ul className="bonus-list">
        {bonusEquations.map((eq) => {
          const solved = isBonusSolved(eq.id)
          return (
            <li key={eq.id} className="bonus-list-item">
              <Link to={`/bonus/${eq.id}`} className={solved ? 'solved' : ''}>
                <span>{eq.title ?? eq.id}</span>
                <span>{solved ? '✓ gelöst' : ''}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      <Link className="btn btn-secondary" to="/uebersicht">
        Übersicht
      </Link>
    </div>
  )
}
