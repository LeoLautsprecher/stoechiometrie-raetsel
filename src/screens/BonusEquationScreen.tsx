import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { EquationView } from '../components/EquationView'
import { bonusEquations, mainEquations } from '../config/equations'
import { isBonusSolved, isMainSolved, isUnlocked, markBonusSolved } from '../state/progress'

export function BonusEquationScreen() {
  const { id } = useParams()
  // Erzwingt ein Neu-Rendern nach dem Lösen, ohne den Zustand über Gleichungen hinweg zu teilen.
  const [, forceRender] = useState(0)

  if (!isUnlocked()) return <Navigate to="/" replace />
  const allMainSolved = mainEquations.every((eq) => isMainSolved(eq.id))
  if (!allMainSolved) return <Navigate to="/uebersicht" replace />

  const equation = bonusEquations.find((eq) => eq.id === id)
  if (!equation) return <Navigate to="/bonus" replace />

  const solved = isBonusSolved(equation.id)

  return (
    <div className="screen">
      <h1>{equation.title ?? equation.id}</h1>
      {solved ? (
        <>
          <p className="feedback" style={{ color: 'var(--color-success)' }}>
            Richtig gelöst!
          </p>
          <div className="nav-row">
            <Link className="btn btn-secondary" to="/bonus">
              Bonusübersicht
            </Link>
            <Link className="btn btn-secondary" to="/uebersicht">
              Übersicht
            </Link>
          </div>
        </>
      ) : (
        <>
          <p>Ergänze die fehlenden Zahlen, sodass die Gleichung ausgeglichen ist.</p>
          <EquationView
            key={equation.id}
            equation={equation}
            onSolved={() => {
              markBonusSolved(equation.id)
              forceRender((n) => n + 1)
            }}
          />
        </>
      )}
    </div>
  )
}
