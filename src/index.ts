import { createReadStream } from 'fs'
import path from 'path'
import readline from 'readline'

const filePath = path.join(__dirname, '..', 'input', 'sample-input.txt')

function processFileStream(filePath: string): void {
	const fileStream = createReadStream(filePath, 'utf-8')

	const rl = readline.createInterface({
		input: fileStream
	})

	const regex = /([\w\s]+)\s(\d+)\s*,\s*([\w\s]+)\s(\d+)/g
	rl.on('line', (line: string) => {
		const [awayTeam, homeTeam] = line.split(',')

		const team1 = getTeamNameAndScore(awayTeam)
		const team2 = getTeamNameAndScore(homeTeam)
		console.log('1', team1)
		console.log('2', team2)
		console.log('======================================')
	})
}

interface Team {
	name: string
	score: number
}

// TODO: Handle if there is no string length
// TODO: Move to a separate file
// TODO: Write unit tests
function getTeamNameAndScore(team: string): Team {
	const name = team.substring(0, team.length - 1)
	const score = parseInt(team.substring(team.length - 1))

	return { name, score }
}

processFileStream(filePath)
