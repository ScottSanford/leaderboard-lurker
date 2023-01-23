import type { Config } from 'jest'

const config: Config = {
  testMatch: ['**/tests/*.test.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  verbose: true,
  testPathIgnorePatterns: ['src/tests/index.test.ts']
}

export default config
