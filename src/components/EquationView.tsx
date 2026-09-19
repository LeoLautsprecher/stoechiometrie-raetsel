import { useMemo, useState } from 'react'
import type {
  Coefficient,
  FormulaSegment,
  StoichiometricEquation,
  Term,
} from '../types'
import './EquationView.css'

interface Blank {
  id: string
  answer: string
}

function collectBlanks(equation: StoichiometricEquation): Blank[] {
  const blanks: Blank[] = []
  for (const term of [...equation.reactants, ...equation.products]) {
    if (term.coefficient.kind === 'blank') {
      blanks.push({ id: term.coefficient.id, answer: term.coefficient.answer })
    }
    for (const segment of term.formula) {
      if (segment.kind === 'blank') {
        blanks.push({ id: segment.id, answer: segment.answer })
      }
    }
  }
  return blanks
}

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '')
}

interface EquationViewProps {
  equation: StoichiometricEquation
  solved?: boolean
  onSolved: () => void
}

export function EquationView({ equation, solved = false, onSolved }: EquationViewProps) {
  const blanks = useMemo(() => collectBlanks(equation), [equation])
  const [values, setValues] = useState<Record<string, string>>({})
  const [wrongIds, setWrongIds] = useState<Set<string> | null>(null)
  const [checked, setChecked] = useState(false)

  function handleChange(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  function handleCheck() {
    const wrong = new Set<string>()
    for (const blank of blanks) {
      const given = normalize(values[blank.id] ?? '')
      const expected = normalize(blank.answer)
      if (given !== expected) {
        wrong.add(blank.id)
      }
    }
    setWrongIds(wrong)
    setChecked(true)
    if (wrong.size === 0) {
      onSolved()
    }
  }

  function renderCoefficient(coefficient: Coefficient, key: string) {
    if (coefficient.kind === 'fixed') {
      if (coefficient.value === 1) return null
      return (
        <span key={key} className="coefficient">
          {coefficient.value}
        </span>
      )
    }
    return renderBlank(
      { id: coefficient.id, answer: coefficient.answer },
      key,
      'normal',
    )
  }

  function renderBlank(
    blank: Blank,
    key: string,
    format: 'normal' | 'sub' | 'sup',
  ) {
    if (solved) {
      return (
        <span key={key} className={`solved-blank solved-${format}`}>
          {blank.answer}
        </span>
      )
    }
    const isWrong = wrongIds?.has(blank.id) ?? false
    return (
      <input
        key={key}
        className={`blank-input blank-${format}${isWrong ? ' blank-wrong' : ''}`}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        value={values[blank.id] ?? ''}
        onChange={(e) => handleChange(blank.id, e.target.value)}
        aria-label="Lücke"
      />
    )
  }

  function renderSegment(segment: FormulaSegment, key: string) {
    const format = segment.format ?? 'normal'
    if (segment.kind === 'fixed') {
      return (
        <span key={key} className={`formula-text formula-${format}`}>
          {segment.text}
        </span>
      )
    }
    return renderBlank({ id: segment.id, answer: segment.answer }, key, format)
  }

  function renderTerm(term: Term, key: string) {
    return (
      <span key={key} className="term">
        {renderCoefficient(term.coefficient, `${key}-coef`)}
        {term.formula.map((segment, i) => renderSegment(segment, `${key}-seg-${i}`))}
      </span>
    )
  }

  return (
    <div className="equation-view">
      <div className={`equation-line${solved ? ' equation-solved' : ''}`}>
        {equation.reactants.map((term, i) => (
          <span key={`r-${i}`} className="term-wrapper">
            {i > 0 && <span className="plus"> + </span>}
            {renderTerm(term, `r-${i}`)}
          </span>
        ))}
        <span className="arrow"> → </span>
        {equation.products.map((term, i) => (
          <span key={`p-${i}`} className="term-wrapper">
            {i > 0 && <span className="plus"> + </span>}
            {renderTerm(term, `p-${i}`)}
          </span>
        ))}
      </div>

      {!solved && (
        <button className="btn btn-primary" onClick={handleCheck}>
          Prüfen
        </button>
      )}

      {checked && wrongIds && wrongIds.size > 0 && (
        <p className="feedback feedback-error">
          Das ist noch nicht ganz richtig. Versuch es noch einmal.
        </p>
      )}
    </div>
  )
}
