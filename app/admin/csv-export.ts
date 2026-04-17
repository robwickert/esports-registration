export function safeCsvCell(value: string): string {
  const escaped = value.replace(/"/g, '""')
  return /^[=+\-@\t\r]/.test(value) ? `"'${escaped}"` : `"${escaped}"`
}

export function buildCsv(headers: string[], rows: string[][]): string {
  return [headers, ...rows]
    .map((row) => row.map((cell) => safeCsvCell(cell)).join(','))
    .join('\n')
}
