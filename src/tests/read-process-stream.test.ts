import { Readable } from 'stream'
import readline from 'readline'
import { readAndProcessStream } from '../read-process-stream'

jest.mock('fs', () => ({
  createReadStream: jest.fn().mockReturnValue(
    new Readable({
      read() {},
    })
  ),
}))

jest.mock('readline', () => ({
  createInterface: jest.fn().mockReturnValue({
    on: jest.fn(),
  }),
}))

describe('readAndProcessStream()', () => {
  const mockFileInput = 'input/sample-input.txt'
  const mockProcessLineCallback = jest.fn()
  const mockProcessCloseCallback = jest.fn()
  const mockReadLine = (require('readline') as typeof import('readline'))
    .createInterface as jest.Mock<readline.ReadLine>
  const onMock = mockReadLine().on as jest.Mock

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('calls the processLineCallback when supplied', () => {
    readAndProcessStream(mockFileInput, mockProcessLineCallback)

    expect(mockReadLine).toHaveBeenCalledWith({
      input: expect.any(Object) as jest.Mock,
      crlfDelay: Infinity,
    })

    expect(onMock).toHaveBeenCalledTimes(1)
    expect(onMock).toHaveBeenCalledWith('line', mockProcessLineCallback)
    expect(onMock).not.toHaveBeenCalledWith('close', mockProcessCloseCallback)
  })

  test('calls the processCloseCallback when supplied', () => {
    readAndProcessStream(mockFileInput, mockProcessLineCallback, mockProcessCloseCallback)

    expect(mockReadLine).toHaveBeenCalledWith({
      input: expect.any(Object) as jest.Mock,
      crlfDelay: Infinity,
    })

    expect(onMock).toHaveBeenCalledTimes(2)
    expect(onMock).toHaveBeenCalledWith('line', mockProcessLineCallback)
    expect(onMock).toHaveBeenCalledWith('close', mockProcessCloseCallback)
  })
})
