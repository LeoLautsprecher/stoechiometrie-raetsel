import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { EquationView } from '../components/EquationView'
import { mainEquations } from '../config/equations'
import { isMainSolved, isUnlocked, markMainSolved } from '../state/progress'

export function EquationScreen() {
  const { index } = useParams()
  const position = Number(index)
  // Erzwingt ein Neu-Rendern nach dem Lösen, ohne den Zustand über Gleichungen hinweg zu teilen.
  const [, forceRender] = useState(0)

  if (!isUnlocked()) return <Navigate to="/" replace />
  if (!Number.isInteger(position) || position < 1 || position > mainEquations.length) {
    return <Navigate to="/uebersicht" replace />
  }

  const equation = mainEquations[position - 1]
  const solved = isMainSolved(equation.id)

  return (
    <div className="screen">
      <h1>
        Gleichung {position} von {mainEquations.length}
      </h1>

      {!solved && <p>Ergänze die fehlenden Zahlen, sodass die Gleichung ausgeglichen ist.</p>}
      <EquationView
        key={equation.id}
        equation={equation}
        solved={solved}
        onSolved={() => {
          markMainSolved(equation.id)
          forceRender((n) => n + 1)
        }}
      />


      <div className="nav-row">
        <Link className="btn btn-secondary" to="/uebersicht">
          Übersicht
        </Link>
      </div>
    </div>
  )
}
