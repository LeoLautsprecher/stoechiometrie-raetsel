import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACCESS_CODE } from '../config/equations'
import { unlock } from '../state/progress'

export function AccessCodeScreen() {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const normalized = code.trim().toLowerCase()
    if (normalized === ACCESS_CODE.trim().toLowerCase()) {
      unlock()
      navigate('/uebersicht')
    } else {
      setError(true)
    }
  }

  return (
    <div className="screen">
      <h1>Stöchiometrie-Rätsel</h1>
      <p>Bitte gib den Zugangscode ein.</p>
      <form className="card" onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            setError(false)
          }}
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Zugangscode"
        />
        <button className="btn btn-primary" type="submit">
          Bestätigen
        </button>
        {error && <p className="feedback feedback-error">Falscher Code.</p>}
      </form>
    </div>
  )
}
