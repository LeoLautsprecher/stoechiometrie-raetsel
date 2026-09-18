export type SegmentFormat = 'normal' | 'sub' | 'sup'

export interface FixedSegment {
  kind: 'fixed'
  text: string
  format?: SegmentFormat
}

export interface BlankSegment {
  kind: 'blank'
  id: string
  answer: string
  format?: SegmentFormat
  width?: number
}

export type FormulaSegment = FixedSegment | BlankSegment

export interface FixedCoefficient {
  kind: 'fixed'
  value: number
}

export interface BlankCoefficient {
  kind: 'blank'
  id: string
  answer: string
}

export type Coefficient = FixedCoefficient | BlankCoefficient

export interface Term {
  coefficient: Coefficient
  formula: FormulaSegment[]
}

export interface StoichiometricEquation {
  id: string
  title?: string
  reactants: Term[]
  products: Term[]
}
