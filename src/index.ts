import { endOfMatchDay, processSoccerMatch } from './services/match-day-service'
import { readStream } from './read-stream'

export function index(): void {
  if (process.argv.length !== 3) {
    console.log('No input file was given.')
    console.log('Example: scores input/sample-input.txt')
    return
  }

  const fileInput = process.argv[2]
  readStream(fileInput, processSoccerMatch, endOfMatchDay)
}

index()
