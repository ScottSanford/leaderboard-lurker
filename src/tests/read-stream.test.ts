import fs from 'fs'
import { readStream } from '../read-stream'

xdescribe('Read Stream', () => {
  const processLineCallback = jest.fn()
  const processCloseCallback = jest.fn()

  const fileInput = 'input/sample-input.txt'
  const fileContent = 'line1\nline2\nline3\n'

  test('readStream calls processLineCallback for each line in file', async () => {
    jest.spyOn(fs, 'createReadStream').mockReturnValue(fs.createReadStream(fileInput, 'utf-8'))

    readStream(fileInput, processLineCallback)

    await new Promise(process.nextTick)

    expect(processLineCallback).toHaveBeenCalled()
  })

  test('readStream calls processCloseCallback when provided', async () => {
    jest.spyOn(fs, 'createReadStream').mockReturnValue(fs.createReadStream(fileInput, 'utf-8'))

    readStream(fileInput, processLineCallback, processCloseCallback)

    await new Promise(process.nextTick)

    expect(processCloseCallback).toHaveBeenCalled()
  })
})
