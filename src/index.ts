import { endOfMatchDay, processSoccerMatch } from './services/match-day-service'
import { readAndProcessStream } from './read-process-stream'

export function index(): void {
  if (!process.stdout.isTTY || !process.stdin.isTTY) {
    readAndProcessStream(process.stdin, processSoccerMatch, endOfMatchDay)
    return
  }

  if (process.argv.length === 2) {
    console.log('No file, no league winners. Did you forget to scout the competition?')
    console.log('Example: leaderboardlurker input/sample-input.txt')
    return
  }

  const fileInput = process.argv[2]
  readAndProcessStream(fileInput, processSoccerMatch, endOfMatchDay)
}

index()
