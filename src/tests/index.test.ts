import { index } from '../index'
import * as RS from '../read-process-stream'
import { endOfMatchDay, processSoccerMatch } from '../services/match-day-service'

describe.only('Initializing the CLI app', () => {
  process.stdout.isTTY = true
  process.stdin.isTTY = true
  process.argv = ['node', './leaderboardlurker']
  // const readStreamSpy = jest.spyOn(RS, 'readStream').mockImplementation(() => {})

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('logs an error message when no file is provided', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})

    index()

    expect(console.log).toHaveBeenCalledTimes(2)
    expect(console.log).toHaveBeenCalledWith(
      'No file, no league winners. Did you forget to scout the competition?'
    )
    expect(console.log).toHaveBeenCalledWith('Example: leaderboardlurker input/sample-input.txt')
  })

  xtest('index function handles non-TTY input and output', () => {
    process.argv = []

    index()

    // expect(readStreamSpy).toHaveBeenCalledWith(process.stdin, processSoccerMatch, endOfMatchDay)
  })

  test('calls `readStream` with the file input when a file is provided', () => {
    process.argv = ['node', 'index.js', 'sample-input.txt']

    index()

    // expect(readStreamSpy).toHaveBeenCalledWith(
    //   'sample-input.txt',
    //   processSoccerMatch,
    //   endOfMatchDay
    // )
  })
})
