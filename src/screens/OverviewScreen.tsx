import { Link, Navigate } from 'react-router-dom'
import { FINAL_CODE, mainEquations } from '../config/equations'
import { isMainSolved, isUnlocked } from '../state/progress'

export function OverviewScreen() {
  if (!isUnlocked()) return <Navigate to="/" replace />

  return (
    <div className="screen">
      <div className="brand-heading">
        <div className="brand-name">Heliox Advanced Materials</div>
        <div className="brand-tagline">ENGINEERING MATTER</div>
      </div>
      <Link className="btn btn-secondary" to="/anleitung">
        Anleitung
      </Link>
      <ul className="bonus-list">
        {mainEquations.map((eq, i) => {
          const solved = isMainSolved(eq.id)
          return (
            <li key={eq.id} className="bonus-list-item">
              <Link to={`/gleichung/${i + 1}`} className={solved ? 'solved' : ''}>
                <span>{eq.title ?? eq.id}</span>
                <span>{solved ? '✓ gelöst' : ''}</span>
              </Link>
            </li>
          )
        })}
      </ul>

      {mainEquations.every((eq) => isMainSolved(eq.id)) ? (
        <div className="code-display">{FINAL_CODE}</div>
      ) : (
        <div className="code-display code-display-locked">
          {'X'.repeat(FINAL_CODE.length)}
        </div>
      )}

      {mainEquations.every((eq) => isMainSolved(eq.id)) ? (
        <Link className="btn btn-secondary" to="/bonus">
          Zu den Bonusgleichungen
        </Link>
      ) : (
        <span className="btn btn-secondary btn-disabled" aria-disabled="true">
          Zu den Bonusgleichungen
        </span>
      )}
    </div>
  )
}
