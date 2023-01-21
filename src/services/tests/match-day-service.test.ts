import {
  formatSoccerMatchResults,
  getMatchDayLeaders,
  isEndOfMatchDay,
} from '../match-day-service'

describe('match-day-service', () => {
  describe('formatSoccerMatchResults()', () => {
    test('formatSoccerMatchResults formats match results correctly', () => {
      const soccerMatch = 'Team A 1, Team B 2'
      const expected = {
        awayTeam: {
          name: 'Team A',
          score: 1,
        },
        homeTeam: {
          name: 'Team B',
          score: 2,
        },
      }
      expect(formatSoccerMatchResults(soccerMatch)).toEqual(expected)
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

      expect(getMatchDayLeaders(leaderBoard, 3)).toEqual(expected)
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

      expect(getMatchDayLeaders(leaderBoard, 3)).toEqual(expected)
    })
  })

  describe('isEndOfMatchDay()', () => {
    test('returns true when match teams are in matchDayTeams', () => {
      const teams = {
        awayName: 'teamA',
        homeName: 'teamB',
      }
      const matchDayTeams = ['teamA', 'teamB']
      expect(isEndOfMatchDay(matchDayTeams, teams)).toBe(true)
    })

    test('returns false when match teams are not in matchDayTeams', () => {
      const teams = {
        awayName: 'teamA',
        homeName: 'teamB',
      }

      const matchDayTeams = ['teamC', 'teamD']
      expect(isEndOfMatchDay(matchDayTeams, teams)).toBe(false)
    })
  })
})
