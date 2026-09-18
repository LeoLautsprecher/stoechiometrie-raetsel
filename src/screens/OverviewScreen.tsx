import { Link, Navigate } from 'react-router-dom'
import { FINAL_CODE, mainEquations } from '../config/equations'
import { isMainSolved, isUnlocked } from '../state/progress'

export function OverviewScreen() {
  if (!isUnlocked()) return <Navigate to="/" replace />

  const allSolved = mainEquations.every((eq) => isMainSolved(eq.id))

  return (
    <div className="screen">
      <h1>Übersicht</h1>
      <p>Wähle eine Gleichung. Du kannst jederzeit zwischen ihnen wechseln.</p>
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

      {allSolved ? (
        <>
          <p>Alle Gleichungen gelöst! Hier ist dein Code:</p>
          <div className="code-display">{FINAL_CODE}</div>
        </>
      ) : (
        <>
          <p>Löse alle Gleichungen, um den Code freizuschalten:</p>
          <div className="code-display code-display-locked">
            {'X'.repeat(FINAL_CODE.length)}
          </div>
        </>
      )}

      {allSolved ? (
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
