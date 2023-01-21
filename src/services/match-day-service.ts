import { getLeagueLeaderBoard, getLeagueLeaders, updateLeaderBoard } from './leaderboard-service'

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

export function formatSoccerMatchResults(soccerMatch: string): SoccerMatch {
  const [awayTeam, homeTeam] = soccerMatch.split(',')

  return {
    awayTeam: {
      name: awayTeam.substring(0, awayTeam.length - 1).trim(),
      score: parseInt(awayTeam.substring(awayTeam.length - 1)),
    },
    homeTeam: {
      name: homeTeam.substring(0, homeTeam.length - 1).trim(),
      score: parseInt(homeTeam.substring(homeTeam.length - 1)),
    },
  }
}

function showMatchDayResults(): void {
  console.log(`Matchday ${currentMatchDay}`)

  const leaderBoard = getLeagueLeaderBoard()
  const matchDayLeaders = getLeagueLeaders(leaderBoard)
  Object.entries(matchDayLeaders).forEach(([name, score]: [string, number]) => {
    console.log(`${name}, ${score} ${score === 1 ? 'pt' : 'pts'}`)
  })

  console.log('\n')
}

export function isEndOfMatchDay(
  matchDayTeams: string[],
  teams: { awayName: string; homeName: string }
): boolean {
  return matchDayTeams.includes(teams.awayName) || matchDayTeams.includes(teams.homeName)
}

export function processSoccerMatch(line: string): void {
  const isValidSoccerMatch = lineFileRegex.test(line)
  if (!isValidSoccerMatch) return

  const { awayTeam, homeTeam } = formatSoccerMatchResults(line)

  if (
    isEndOfMatchDay(currentMatchDayTeams, {
      awayName: awayTeam.name,
      homeName: homeTeam.name,
    })
  ) {
    endOfMatchDay()
    currentMatchDay++
  }

  currentMatchDayTeams = [...currentMatchDayTeams, awayTeam.name, homeTeam.name]
  updateLeaderBoard({ awayTeam, homeTeam })
}

export function endOfMatchDay(): void {
  showMatchDayResults()
  currentMatchDayTeams = []
}
