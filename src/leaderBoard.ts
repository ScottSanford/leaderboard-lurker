import { TIE_GAME_POINTS, WIN_GAME_POINTS } from './constants'
import { SoccerMatch } from './matchDay'

export type LeagueLeaderBoard = {
  [key: string]: number
}

export const leagueLeaderBoard: LeagueLeaderBoard = {}

function initializeLeaderBoard({ awayTeam, homeTeam }: SoccerMatch): void {
  if (!leagueLeaderBoard[awayTeam.name]) {
    leagueLeaderBoard[awayTeam.name] = 0
  }

  if (!leagueLeaderBoard[homeTeam.name]) {
    leagueLeaderBoard[homeTeam.name] = 0
  }
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
