import { processSoccerMatch } from './matchDay'
import { readStream } from './readStream'

function index() {
  if (process.argv.length !== 3) {
    console.log('Incorrect number of params entered')
    console.log('usage: scores input/sample-input.txt')
    return
  }

  const fileInput = process.argv[2]
  readStream(fileInput, processSoccerMatch)
}

index()
