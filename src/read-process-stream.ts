import { createReadStream } from 'fs'
import readline from 'readline'
import { Readable } from 'stream'

export function readAndProcessStream(
  readlineInput: string | Readable,
  processLineCallback: (line: string) => void,
  processCloseCallback?: () => void
): void {
  const readLine = readline.createInterface({
    input: getInputType(readlineInput),
    crlfDelay: Infinity,
  })

  readLine.on('line', processLineCallback)

  if (processCloseCallback) {
    readLine.on('close', processCloseCallback)
  }
}

function getInputType(readlineInput: string | Readable): Readable {
  return typeof readlineInput === 'string'
    ? createReadStream(readlineInput, 'utf-8')
    : readlineInput
}
