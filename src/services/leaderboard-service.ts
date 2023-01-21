import { SoccerMatch } from './match-day-service'

export type LeagueLeaderBoard = {
  [key: string]: number
}

interface TeamPoints {
  name: string
  points: number
}

export const WIN_GAME_POINTS = 3
export const TIE_GAME_POINTS = 1

let leagueLeaderBoard: LeagueLeaderBoard = {}

export function getLeagueLeaderBoard(): LeagueLeaderBoard {
  return leagueLeaderBoard
}

export function addTeamPoints(
  leaderBoard: LeagueLeaderBoard,
  { name, points }: TeamPoints
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
    leagueLeaderBoard = addTeamPoints(leagueLeaderBoard, {
      name: awayTeam.name,
      points: WIN_GAME_POINTS,
    })
  } else if (homeTeam.score > awayTeam.score) {
    leagueLeaderBoard = addTeamPoints(leagueLeaderBoard, {
      name: homeTeam.name,
      points: WIN_GAME_POINTS,
    })
  } else {
    leagueLeaderBoard = addTeamPoints(leagueLeaderBoard, {
      name: awayTeam.name,
      points: TIE_GAME_POINTS,
    })
    leagueLeaderBoard = addTeamPoints(leagueLeaderBoard, {
      name: homeTeam.name,
      points: TIE_GAME_POINTS,
    })
  }
}
