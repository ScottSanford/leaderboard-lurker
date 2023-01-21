import {
  addTeamMatchPoints,
  getLeagueLeaders,
  LeagueLeaderBoard,
  TeamMatch,
} from '../leaderboard-service'

describe('leaderboard-service', () => {
  const teamMatchPoints: TeamMatch = {
    name: 'teamA',
    points: 3,
  }
  describe('addTeamPoints()', () => {
    test('adds a team and match points to the leaderboard', () => {
      const leaderBoard: LeagueLeaderBoard = {}
      const expected: LeagueLeaderBoard = { teamA: 3 }
      expect(addTeamMatchPoints(leaderBoard, teamMatchPoints)).toEqual(expected)
    })

    test('updates exisitng team total points', () => {
      const leaderBoard: LeagueLeaderBoard = { teamA: 10 }
      const expected: LeagueLeaderBoard = { teamA: 13 }

      expect(addTeamMatchPoints(leaderBoard, teamMatchPoints)).toEqual(expected)
    })
  })
  describe('getMatchDayLeaders()', () => {
    test('returns top n leaders', () => {
      const leaderBoard = {
        teamA: 10,
        teamB: 8,
        teamC: 6,
        teamD: 4,
      }
      const expected = {
        teamA: 10,
        teamB: 8,
        teamC: 6,
      }

      expect(getLeagueLeaders(leaderBoard, 3)).toEqual(expected)
    })

    test('returns all leaders when n is greater than the length of leaderBoard', () => {
      const leaderBoard = {
        teamA: 10,
        teamB: 8,
      }

      const expected = {
        teamA: 10,
        teamB: 8,
      }

      expect(getLeagueLeaders(leaderBoard, 3)).toEqual(expected)
    })
  })
})
