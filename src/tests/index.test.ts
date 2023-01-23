import { stdin } from 'mock-stdin'
import { index } from '../index'
import { readAndProcessStream } from '../read-process-stream'

const mockProcessSoccerMatch = jest.fn()
const mockEndOfMatchDay = jest.fn()

const mockStdin = stdin()

describe.only('Initializing the CLI app', () => {
  afterEach(() => {
    jest.clearAllMocks()
    mockStdin.restore()
    process.stdin.isTTY = false
    process.stdout.isTTY = false
  })

  test('index function handles non-TTY input and output', () => {
    process.argv = []
    process.stdin.isTTY = false
    process.stdout.isTTY = false

    index()

    expect(readAndProcessStream).toHaveBeenCalledWith(
      mockStdin,
      mockProcessSoccerMatch,
      mockEndOfMatchDay
    )
  })

  test('logs an error message when no file is provided', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    process.stdin.isTTY = true
    process.stdout.isTTY = true

    process.nextTick(() => {
      mockStdin.send(['TeamA 0, TeamB 2'])
    })

    index()

    expect(console.log).toHaveBeenCalledTimes(2)
    expect(console.log).toHaveBeenCalledWith(
      'No file, no league winners. Did you forget to scout the competition?'
    )
    expect(console.log).toHaveBeenCalledWith('Example: leaderboardlurker input/sample-input.txt')
  })

  test('calls `readStream` with the file input when a file is provided', () => {
    process.argv = ['node', 'index.js', 'sample-input.txt']
    process.stdin.isTTY = true
    process.stdout.isTTY = true

    process.nextTick(() => {
      mockStdin.send(['TeamA 0, TeamB 2'])
    })

    index()

    expect(readAndProcessStream).toHaveBeenCalledWith(
      process.argv[2],
      mockProcessSoccerMatch,
      mockEndOfMatchDay
    )
  })
})
