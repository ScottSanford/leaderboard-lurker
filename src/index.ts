import { createReadStream } from 'fs'
import path from 'path'
import readline from 'readline'

const filePath = path.join(__dirname, '..', 'input', 'sample-input.txt')

function processFileStream(filePath: string): void {
	const fileStream = createReadStream(filePath, 'utf-8')

	const rl = readline.createInterface({
		input: fileStream
	})

	let startLine = 1
	rl.on('line', (line) => {
		console.log(`${startLine++} -`, line)
	})
}

processFileStream(filePath)
