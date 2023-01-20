import {
  leagueLeaderBoard,
  LeagueLeaderBoard,
  updateLeaderBoard,
} from './leaderBoard'

interface Team {
  name: string
  score: number
}

export interface SoccerMatch {
  awayTeam: Team
  homeTeam: Team
}

const isValidSoccerMatch = true
let currentMatchDayTeams: string[] = []
let currentMatchDay = 1

export function getCurrentMatchDay() {
  return currentMatchDay
}

export function getCurrentMatchDayTeams() {
  return currentMatchDayTeams
}

export function resetCurrentMatchDayTeams() {
  currentMatchDayTeams = []
}

export function processSoccerMatch(line: string): void {
  if (!isValidSoccerMatch) return

  const { awayTeam, homeTeam } = saveSoccerMatchResults(line)

  if (currentMatchDayTeams.includes(awayTeam.name || homeTeam.name)) {
    showMatchDayResults()
    currentMatchDayTeams = []
    currentMatchDay++
  }

  currentMatchDayTeams.push(awayTeam.name, homeTeam.name)
  updateLeaderBoard({ awayTeam, homeTeam })
}

export function saveSoccerMatchResults(soccerMatch: string): SoccerMatch {
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

function getMatchDayLeaders(leaderBoard: LeagueLeaderBoard, n = 3) {
  return Object.entries(leaderBoard)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {} as LeagueLeaderBoard)
}

export function showMatchDayResults(): void {
  console.log(`Matchday ${getCurrentMatchDay()}`)
  const matchDayLeaders = Object.entries(getMatchDayLeaders(leagueLeaderBoard))
  matchDayLeaders.forEach((leader: [string, number]) => {
    console.log(`${leader[0]}, ${leader[1]} ${leader[1] === 1 ? 'pt' : 'pts'}`)
  })
  console.log('\n')
}
