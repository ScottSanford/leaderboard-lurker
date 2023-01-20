import { createReadStream } from 'fs'
import readline from 'readline'

export function readStream(
  fileInput: string,
  processLineCallback: (line: string) => void,
  processCloseCallback?: () => void
): void {
  const fileStream = createReadStream(fileInput, 'utf-8')
  const readLine = readline.createInterface({ input: fileStream })

  readLine.on('line', processLineCallback)

  if (processCloseCallback) {
    readLine.on('close', processCloseCallback)
  }
}
