import { index } from '../index'

describe('Initializing the CLI app', () => {
  test('index function handles missing input file', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    process.argv = ['node', 'index.js']

    index()

    expect(console.log).toHaveBeenCalledWith(
      'No file, no league winners. Did you forget to scout the competition?'
    )
    expect(console.log).toHaveBeenCalledWith('Example: scores input/sample-input.txt')
  })
})
