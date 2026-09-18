import type { StoichiometricEquation } from '../types'

// ============================================================
// ZUGANGSCODE & LÖSUNGSCODE
// ============================================================
// ACCESS_CODE:  wird auf dem Startbildschirm abgefragt.
// FINAL_CODE:   wird nach den 3 Hauptgleichungen angezeigt und
//               für das nächste Rätsel benötigt.
// (Vergleich erfolgt ohne Berücksichtigung von Groß-/Kleinschreibung und Leerzeichen.)
// ============================================================
export const ACCESS_CODE = 'HELIOX-ADVANCED' // TODO: eigenen Zugangscode eintragen
export const FINAL_CODE = '1867' // TODO: eigenen Lösungscode eintragen

// ============================================================
// FORMAT-ANLEITUNG FÜR STÖCHIOMETRISCHE GLEICHUNGEN
// ============================================================
// Jede Gleichung besteht aus "reactants" (linke Seite) und
// "products" (rechte Seite). Jede Seite ist eine Liste von Termen.
//
// Ein Term = Koeffizient + Formel:
//
//   coefficient:
//     { kind: 'fixed', value: 2 }             -> vorgegebene, sichtbare Zahl
//     { kind: 'fixed', value: 1 }              -> wird nicht angezeigt (chemische Konvention)
//     { kind: 'blank', id: 'a', answer: '2' }  -> Eingabefeld, das gelöst werden muss
//
//   formula: Liste von Segmenten, die die Formel bilden.
//   Beispiel für "H2O":
//     [
//       { kind: 'fixed', text: 'H' },
//       { kind: 'fixed', text: '2', format: 'sub' },
//       { kind: 'fixed', text: 'O' },
//     ]
//
//   Ein Formel-Segment kann ebenfalls eine Lücke sein, z. B. um einen
//   Index (tiefgestellte Zahl) erraten zu lassen:
//     { kind: 'blank', id: 'b', answer: '4', format: 'sub' }
//
//   format (optional, Standard 'normal'):
//     'normal' -> normaler Text
//     'sub'    -> tiefgestellt (z. B. Indizes wie H2O)
//     'sup'    -> hochgestellt (z. B. Ladungen wie Fe3+)
//
//   WICHTIG: Jede Lücken-"id" muss innerhalb einer Gleichung einmalig sein.
//   Die "answer"-Werte werden als Text verglichen (Leerzeichen/Groß-Klein
//   werden ignoriert), Zahlen also einfach als "2", "10" usw. angeben.
// ============================================================

// Die folgenden Gleichungen sind Platzhalter/Beispiele.
// Bitte durch die tatsächlichen Rätsel-Gleichungen ersetzen.

export const mainEquations: StoichiometricEquation[] = [
  {
    id: 'main-1',
    title: 'Gleichung 1',
    // CH4 + 2 O2 -> CO2 + 2 H2O
    reactants: [
      {
        coefficient: { kind: 'fixed', value: 1 },
        formula: [
          { kind: 'fixed', text: 'C' },
          { kind: 'fixed', text: 'H' },
          { kind: 'fixed', text: '4', format: 'sub' },
        ],
      },
      {
        coefficient: { kind: 'blank', id: 'm1-o2', answer: '2' },
        formula: [
          { kind: 'fixed', text: 'O' },
          { kind: 'fixed', text: '2', format: 'sub' },
        ],
      },
    ],
    products: [
      {
        coefficient: { kind: 'fixed', value: 1 },
        formula: [
          { kind: 'fixed', text: 'C' },
          { kind: 'fixed', text: 'O' },
          { kind: 'fixed', text: '2', format: 'sub' },
        ],
      },
      {
        coefficient: { kind: 'blank', id: 'm1-h2o', answer: '2' },
        formula: [
          { kind: 'fixed', text: 'H' },
          { kind: 'fixed', text: '2', format: 'sub' },
          { kind: 'fixed', text: 'O' },
        ],
      },
    ],
  },
  {
    id: 'main-2',
    title: 'Gleichung 2',
    // 4 Fe + 3 O2 -> 2 Fe2O3
    reactants: [
      {
        coefficient: { kind: 'blank', id: 'm2-fe', answer: '4' },
        formula: [{ kind: 'fixed', text: 'Fe' }],
      },
      {
        coefficient: { kind: 'blank', id: 'm2-o2', answer: '3' },
        formula: [
          { kind: 'fixed', text: 'O' },
          { kind: 'fixed', text: '2', format: 'sub' },
        ],
      },
    ],
    products: [
      {
        coefficient: { kind: 'blank', id: 'm2-fe2o3', answer: '2' },
        formula: [
          { kind: 'fixed', text: 'Fe' },
          { kind: 'fixed', text: '2', format: 'sub' },
          { kind: 'fixed', text: 'O' },
          { kind: 'fixed', text: '3', format: 'sub' },
        ],
      },
    ],
  },
  {
    id: 'main-3',
    title: 'Gleichung 3',
    // H2SO4 + 2 NaOH -> Na2SO4 + 2 H2O
    reactants: [
      {
        coefficient: { kind: 'fixed', value: 1 },
        formula: [
          { kind: 'fixed', text: 'H' },
          { kind: 'fixed', text: '2', format: 'sub' },
          { kind: 'fixed', text: 'S' },
          { kind: 'fixed', text: 'O' },
          { kind: 'fixed', text: '4', format: 'sub' },
        ],
      },
      {
        coefficient: { kind: 'blank', id: 'm3-naoh', answer: '2' },
        formula: [
          { kind: 'fixed', text: 'Na' },
          { kind: 'fixed', text: 'O' },
          { kind: 'fixed', text: 'H' },
        ],
      },
    ],
    products: [
      {
        coefficient: { kind: 'fixed', value: 1 },
        formula: [
          { kind: 'fixed', text: 'Na' },
          // Index als Lücke, statt des Koeffizienten:
          { kind: 'blank', id: 'm3-na-index', answer: '2', format: 'sub' },
          { kind: 'fixed', text: 'S' },
          { kind: 'fixed', text: 'O' },
          { kind: 'fixed', text: '4', format: 'sub' },
        ],
      },
      {
        coefficient: { kind: 'blank', id: 'm3-h2o', answer: '2' },
        formula: [
          { kind: 'fixed', text: 'H' },
          { kind: 'fixed', text: '2', format: 'sub' },
          { kind: 'fixed', text: 'O' },
        ],
      },
    ],
  },
]

export const bonusEquations: StoichiometricEquation[] = [
  {
    id: 'bonus-1',
    title: 'Bonusgleichung 1',
    // C3H8 + 5 O2 -> 3 CO2 + 4 H2O
    reactants: [
      {
        coefficient: { kind: 'fixed', value: 1 },
        formula: [
          { kind: 'fixed', text: 'C' },
          { kind: 'fixed', text: '3', format: 'sub' },
          { kind: 'fixed', text: 'H' },
          { kind: 'fixed', text: '8', format: 'sub' },
        ],
      },
      {
        coefficient: { kind: 'blank', id: 'b1-o2', answer: '5' },
        formula: [
          { kind: 'fixed', text: 'O' },
          { kind: 'fixed', text: '2', format: 'sub' },
        ],
      },
    ],
    products: [
      {
        coefficient: { kind: 'blank', id: 'b1-co2', answer: '3' },
        formula: [
          { kind: 'fixed', text: 'C' },
          { kind: 'fixed', text: 'O' },
          { kind: 'fixed', text: '2', format: 'sub' },
        ],
      },
      {
        coefficient: { kind: 'blank', id: 'b1-h2o', answer: '4' },
        formula: [
          { kind: 'fixed', text: 'H' },
          { kind: 'fixed', text: '2', format: 'sub' },
          { kind: 'fixed', text: 'O' },
        ],
      },
    ],
  },
  {
    id: 'bonus-2',
    title: 'Bonusgleichung 2',
    // 2 KMnO4 + 16 HCl -> 2 KCl + 2 MnCl2 + 5 Cl2 + 8 H2O
    reactants: [
      {
        coefficient: { kind: 'blank', id: 'b2-kmno4', answer: '2' },
        formula: [
          { kind: 'fixed', text: 'K' },
          { kind: 'fixed', text: 'Mn' },
          { kind: 'fixed', text: 'O' },
          { kind: 'fixed', text: '4', format: 'sub' },
        ],
      },
      {
        coefficient: { kind: 'blank', id: 'b2-hcl', answer: '16' },
        formula: [
          { kind: 'fixed', text: 'H' },
          { kind: 'fixed', text: 'Cl' },
        ],
      },
    ],
    products: [
      {
        coefficient: { kind: 'blank', id: 'b2-kcl', answer: '2' },
        formula: [
          { kind: 'fixed', text: 'K' },
          { kind: 'fixed', text: 'Cl' },
        ],
      },
      {
        coefficient: { kind: 'blank', id: 'b2-mncl2', answer: '2' },
        formula: [
          { kind: 'fixed', text: 'Mn' },
          { kind: 'fixed', text: 'Cl' },
          { kind: 'fixed', text: '2', format: 'sub' },
        ],
      },
      {
        coefficient: { kind: 'blank', id: 'b2-cl2', answer: '5' },
        formula: [
          { kind: 'fixed', text: 'Cl' },
          { kind: 'fixed', text: '2', format: 'sub' },
        ],
      },
      {
        coefficient: { kind: 'blank', id: 'b2-h2o', answer: '8' },
        formula: [
          { kind: 'fixed', text: 'H' },
          { kind: 'fixed', text: '2', format: 'sub' },
          { kind: 'fixed', text: 'O' },
        ],
      },
    ],
  },
]
