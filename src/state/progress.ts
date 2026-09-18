const UNLOCKED_KEY = 'stoich_unlocked'
const MAIN_SOLVED_KEY = 'stoich_main_solved'
const BONUS_SOLVED_KEY = 'stoich_bonus_solved'

export function isUnlocked(): boolean {
  return localStorage.getItem(UNLOCKED_KEY) === 'true'
}

export function unlock(): void {
  localStorage.setItem(UNLOCKED_KEY, 'true')
}

function readSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

function writeSet(key: string, values: Set<string>): void {
  localStorage.setItem(key, JSON.stringify([...values]))
}

export function isMainSolved(id: string): boolean {
  return readSet(MAIN_SOLVED_KEY).has(id)
}

export function markMainSolved(id: string): void {
  const solved = readSet(MAIN_SOLVED_KEY)
  solved.add(id)
  writeSet(MAIN_SOLVED_KEY, solved)
}

export function isBonusSolved(id: string): boolean {
  return readSet(BONUS_SOLVED_KEY).has(id)
}

export function markBonusSolved(id: string): void {
  const solved = readSet(BONUS_SOLVED_KEY)
  solved.add(id)
  writeSet(BONUS_SOLVED_KEY, solved)
}

export function resetProgress(): void {
  localStorage.removeItem(UNLOCKED_KEY)
  localStorage.removeItem(MAIN_SOLVED_KEY)
  localStorage.removeItem(BONUS_SOLVED_KEY)
}
