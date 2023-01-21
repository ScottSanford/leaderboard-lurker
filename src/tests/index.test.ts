import { server } from '../index'

describe('Initializing the CLI app', () => {
  test('index function handles missing input file', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    process.argv = ['node', 'index.js']

    server()

    expect(console.log).toHaveBeenCalledWith('No input file was given.')
    expect(console.log).toHaveBeenCalledWith(
      'Example: scores input/sample-input.txt'
    )
  })
})
