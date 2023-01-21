import { addTeamPoints } from '../leaderboard-service'

describe('leaderboard-service', () => {
  describe('addTeamPoints', () => {
    test('adds a team and points to the leaderboard', () => {
      const leaderBoard = {}
      const teamPoints = {
        name: 'teamA',
        points: 3,
      }
      const expected = { teamA: 3 }
      expect(addTeamPoints(leaderBoard, teamPoints)).toEqual(expected)
    })

    test('updates points to specific team', () => {
      const leaderBoard = { teamA: 10 }
      const teamPoints = {
        name: 'teamA',
        points: 3,
      }
      const expected = { teamA: 13 }

      expect(addTeamPoints(leaderBoard, teamPoints)).toEqual(expected)
    })
  })
})
