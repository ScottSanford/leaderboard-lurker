import { SoccerMatch } from './match-day-service'

export type LeagueLeaderBoard = {
  [key: string]: number
}

export interface TeamMatch {
  name: string
  points: number
}

export const WIN_GAME_POINTS = 3
export const TIE_GAME_POINTS = 1

let leagueLeaderBoard: LeagueLeaderBoard = {}

export function getLeagueLeaderBoard(): LeagueLeaderBoard {
  return leagueLeaderBoard
}

export function addTeamMatchPoints(
  leaderBoard: LeagueLeaderBoard,
  { name, points }: TeamMatch
): LeagueLeaderBoard {
  if (!leaderBoard[name]) {
    return {
      ...leaderBoard,
      [name]: points,
    }
  }

  return {
    ...leaderBoard,
    [name]: leaderBoard[name] + points,
  }
}

export function updateLeaderBoard({ awayTeam, homeTeam }: SoccerMatch): void {
  if (awayTeam.score > homeTeam.score) {
    leagueLeaderBoard = addTeamMatchPoints(leagueLeaderBoard, {
      name: awayTeam.name,
      points: WIN_GAME_POINTS,
    })
  } else if (homeTeam.score > awayTeam.score) {
    leagueLeaderBoard = addTeamMatchPoints(leagueLeaderBoard, {
      name: homeTeam.name,
      points: WIN_GAME_POINTS,
    })
  } else {
    leagueLeaderBoard = addTeamMatchPoints(leagueLeaderBoard, {
      name: awayTeam.name,
      points: TIE_GAME_POINTS,
    })
    leagueLeaderBoard = addTeamMatchPoints(leagueLeaderBoard, {
      name: homeTeam.name,
      points: TIE_GAME_POINTS,
    })
  }
}

export function getLeagueLeaders(leaderBoard: LeagueLeaderBoard, n = 3): LeagueLeaderBoard {
  return Object.entries(leaderBoard)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {} as LeagueLeaderBoard)
}
