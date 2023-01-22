import { endOfMatchDay, processSoccerMatch } from './services/match-day-service'
import { readStream } from './read-stream'

export function index(): void {
  if (!process.stdout.isTTY || !process.stdin.isTTY) {
    readStream(process.stdin, processSoccerMatch, endOfMatchDay)
    return
  }

  if (process.argv.length === 2) {
    console.log('No file, no league winners. Did you forget to scout the competition?')
    console.log('Example: leaderboardlurker input/sample-input.txt')
    return
  }

  const fileInput = process.argv[2]
  readStream(fileInput, processSoccerMatch, endOfMatchDay)
}

index()
