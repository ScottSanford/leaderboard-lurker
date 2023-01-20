import { createReadStream } from 'fs'
import readline from 'readline'
import { resetCurrentMatchDayTeams, showMatchDayResults } from './matchDay'

export function readStream(
  input: string,
  processLineCallback: (line: string) => void
): void {
  const fileStream = createReadStream(input, 'utf-8')
  const readLine = readline.createInterface({ input: fileStream })

  readLine.on('line', processLineCallback)

  readLine.on('close', () => {
    showMatchDayResults()
    resetCurrentMatchDayTeams()
  })
}
