import { createReadStream } from 'fs'
import path from 'path'
import readline from 'readline'
import { leagueLeaderBoard, updateLeaderBoard } from './leaderBoard'

const filePath = path.join(__dirname, '..', 'input', 'sample-input.txt')

let currentMatchDay = 1
let currentMatchDayTeams: string[] = []
let isValidSoccerMatch = true

function processFileStream(filePath: string): void {
	const fileStream = createReadStream(filePath, 'utf-8')

	const readLine = readline.createInterface({ input: fileStream })

	readLine.on('line', (line: string) => {
		const { awayTeam, homeTeam } = saveSoccerMatchResults(line)

		if (isValidSoccerMatch) {

			// hit the next day, so we want to end the match day
			if (currentMatchDayTeams.includes(awayTeam.name || homeTeam.name)) {
				showEndMatchDayResults()
				currentMatchDayTeams = []
				currentMatchDay++
			}
		}

		currentMatchDayTeams.push(awayTeam.name, homeTeam.name)
		updateLeaderBoard({ awayTeam, homeTeam })
	})
}

processFileStream(filePath)

interface Team {
	name: string
	score: number
}

export interface SoccerMatch {
	awayTeam: Team
	homeTeam: Team
}

function saveSoccerMatchResults(soccerMatch: string): SoccerMatch {
	const [awayTeam, homeTeam] = soccerMatch.split(',')

	return {
		awayTeam: {
			name: awayTeam.substring(0, awayTeam.length - 1).trim(),
			score: parseInt(awayTeam.substring(awayTeam.length - 1)),
		},
		homeTeam: {
			name: homeTeam.substring(0, homeTeam.length - 1).trim(),
			score: parseInt(homeTeam.substring(homeTeam.length - 1))
		}
	}
}

function getMatchDayLeaders(leaderBoard, n = 3) {
	return Object.entries(leaderBoard)
		.sort((a, b) => (b[1] as number) - (a[1] as number))
		.slice(0, n)
		.reduce((acc, [key, value]) => {
			acc[key] = value
			return acc
		}, {})
}

function showEndMatchDayResults() {
	console.log(`Matchday ${currentMatchDay}`)
	const matchDayLeaders = getMatchDayLeaders(leagueLeaderBoard)
	for (const teamName in matchDayLeaders) {
		console.log(`${teamName}, ${matchDayLeaders[teamName]} ${matchDayLeaders[teamName] === 1 ? 'pt': 'pts'}`)
	}
	console.log('\n')
}
