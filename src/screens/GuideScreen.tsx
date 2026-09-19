import { Link, Navigate } from 'react-router-dom'
import { isUnlocked } from '../state/progress'

export function GuideScreen() {
  if (!isUnlocked()) return <Navigate to="/" replace />

  return (
    <div className="screen guide-screen">
      <h1>Anleitung</h1>
      <ul className="guide-list">
        <li>Trage die fehlenden Koeffizienten vor den Formeln ein.</li>
        <li>Auf beiden Seiten müssen gleich viele Atome jedes Elements stehen.</li>
        <li>Prüfe die Gleichung erst, wenn alle Lücken ausgefüllt sind.</li>
      </ul>
      <div className="guide-example">
        <strong>Beispiel: Wasser</strong>
        <span>2 H₂ + O₂ → 2 H₂O</span>
        <span>Links: 4 H-Atome, 2 O-Atome</span>
        <span>Rechts: 4 H-Atome, 2 O-Atome</span>
      </div>
      <Link className="btn btn-secondary" to="/uebersicht">
        Übersicht
      </Link>
    </div>
  )
}
