import {
  leagueLeaderBoard,
  LeagueLeaderBoard,
  updateLeaderBoard,
} from './leaderboard-service'

interface Team {
  name: string
  score: number
}

export interface SoccerMatch {
  awayTeam: Team
  homeTeam: Team
}

let currentMatchDayTeams: string[] = []
let currentMatchDay = 1

const lineFileRegex =
  /^(\s*[A-Za-z0-9]+( \s*[A-Za-z0-9]+)+\s*),(\s*[A-Za-z0-9]+(\s* [A-Za-z0-9]+)+\s*$)/i

function formatSoccerMatchResults(soccerMatch: string): SoccerMatch {
  const [awayTeam, homeTeam] = soccerMatch.split(',')

  return {
    awayTeam: {
      name: awayTeam.substring(0, awayTeam.length - 1).trim(),
      score: parseInt(awayTeam.substring(awayTeam.length - 1)),
    },
    homeTeam: {
      name: homeTeam.substring(0, homeTeam.length - 1).trim(),
      score: parseInt(homeTeam.substring(homeTeam.length - 1)),
    }
  }
}

function getMatchDayLeaders(leaderBoard: LeagueLeaderBoard, n = 3): LeagueLeaderBoard {
  return Object.entries(leaderBoard)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {} as LeagueLeaderBoard)
}

function showMatchDayResults(): void {
  console.log(`Matchday ${currentMatchDay}`)

  const matchDayLeaders = Object.entries(getMatchDayLeaders(leagueLeaderBoard))
  matchDayLeaders.forEach(([name, score]: [string, number]) => {
    console.log(`${name}, ${score} ${score === 1 ? 'pt' : 'pts'}`)
  })

  console.log('\n')
}

function isEndOfMatchDay(awayTeamName: string, homeTeamName: string): boolean {
  return currentMatchDayTeams.includes(awayTeamName) || currentMatchDayTeams.includes(homeTeamName)
}

export function processSoccerMatch(line: string): void {
  const isValidSoccerMatch = lineFileRegex.test(line)
  if (!isValidSoccerMatch) return

  const { awayTeam, homeTeam } = formatSoccerMatchResults(line)

  if (isEndOfMatchDay(awayTeam.name, homeTeam.name)) {
    endOfMatchDay()
    currentMatchDay++
  }

  currentMatchDayTeams = [
    ...currentMatchDayTeams,
    awayTeam.name,
    homeTeam.name
  ]
  updateLeaderBoard({ awayTeam, homeTeam })
}

export function endOfMatchDay() {
  showMatchDayResults()
  currentMatchDayTeams = []
}
