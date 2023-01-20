import { INITIAL_TEAM_POINTS, TIE_GAME_POINTS, WIN_GAME_POINTS } from '../constants'
import { SoccerMatch } from './match-day-service'

export type LeagueLeaderBoard = {
  [key: string]: number
}

export const leagueLeaderBoard: LeagueLeaderBoard = {}

function initializeLeaderBoard({ awayTeam, homeTeam }: SoccerMatch): void {
  [awayTeam, homeTeam].forEach((team) => {
    if (!leagueLeaderBoard[team.name]) {
      leagueLeaderBoard[team.name] = INITIAL_TEAM_POINTS
    }
  })
}

export function updateLeaderBoard({ awayTeam, homeTeam }: SoccerMatch): void {
  initializeLeaderBoard({ awayTeam, homeTeam })

  if (awayTeam.score > homeTeam.score) {
    leagueLeaderBoard[awayTeam.name] += WIN_GAME_POINTS
  } else if (homeTeam.score > awayTeam.score) {
    leagueLeaderBoard[homeTeam.name] += WIN_GAME_POINTS
  } else {
    leagueLeaderBoard[awayTeam.name] += TIE_GAME_POINTS
    leagueLeaderBoard[homeTeam.name] += TIE_GAME_POINTS
  }
}
