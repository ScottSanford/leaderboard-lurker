import { formatSoccerMatchResults, isEndOfMatchDay } from '../match-day-service'

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
