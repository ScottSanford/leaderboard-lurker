# Welcome to LeaderboardLurker :soccer:
The ultimate tool for tracking the top teams in your league!
To get started, you'll need to install the executable locally by running the following command. This program runs on NodeJS (tested on `v16.19.0`). The recommended approach to install this Node version is through [Node Version Manager](https://github.com/nvm-sh/nvm).
After successfully installing `nvm` and running `v16.19.0`, run the following command in your terminal prompt.
```bash
npm run install:global
```
This will install the `leaderboardlurker` command locally to your machine. Once the installation is complete, you can run the tool using one of the following commands:

1. `leaderboardlurker input/sample-input.txt`
2. `cat input/sample-input.txt | leaderboardlurker`
3. `leaderboardlurker < input/sample-input.txt`

To run tests, run the following command: `npm test`

With LeaderboardLurker, you'll never have to play hide-and-seek with the league leaders again! Our tool is like a sherlock for the soccer world, it finds the answers you need in no time.

So, don't be a benchwarmer, join the game and become a __leaderboard lurker__ today!
___
# Design
The app uses NodeJS `v16.19.0` and is written in TypeScript. TypeScript provides additional type safety on top of JavaScript while also improving the development experience through IDE's and linters.

The application is architected into 3 main components:
1. Command Line Parser
2. Read & Process Streamer
3. Business Core Logic (Services)
## Command Line Parser
`src/index.ts` > `index()`
This is the entry point into the CLI app. Inside the function, it starts by checking whether the standard input (stdin) and standard output (stdout) are terminal interface (TTY) or not. For example, if the user types in the following commands:
```
cat path/to/sample-input.txt | leaderboardlurker
// or
leaderboardlurker < <sample-text-file.txt>
```
If either one of them is not a TTY, it supplies the `readAndProcessStream` function with the `process.stdin` as its first argument.
Otherwise, the function performs an error check to see if the user left out arguments. If the user forgot to supply a file argument, the program will log two messages to the console and return. For example, if the user types:
```
leaderboardlurker
```
Lastly, if neither the first two conditions are met, then we must have a file that was supplied via the process.argv[2] like so:
```
leaderboardlurker input/sample-input.txt
```
### Read & Process Streamer
`src/read-process-stream.ts` > `readAndProcessStream()`
This is the main function to read and process the text file line by line. In order to handle larger size files, I decided to use `fs.createReadStream()` as opposed to `fs.readFileSync()`. This reads the file's contents in chunks, rather than all at once. This doesn't need to load the entire file into memory, and also it can start sending the data as soon as it starts reading.

This function abstracts the business logic by requiring processing callbacks (`processLineCallback` & `processCloseCallback`) as part of the function's arguments. There are some benefits that were considered here:
1. Loosely coupled logic
2. Unit tests are easier to write
3. Easier ability to add additional business requirements (i.e. Business requirements now require to process player stats)

If I were to refactor to support additional requirements, I would do something similar to the following:

```
const fileType = process.argv[3]
switch(fileType) {
    case: '-p':
    return readAndProcessStream(fileInput, processPlayerStats, endOfPlayerStats)
    default:
    return readAndProcessStream(fileInput, processSoccerMatch, endOfMatchDay)
}
```
### Business Core Logic (Services)
`/src/services/`
This directory contains the business logic of the application. My file and folder organizational approach was a single directory to contain all business logic. Currently there are only 2 files to handle the current business use cases: `leaderboard-service.ts` & `match-day-service.ts`, but I envisioned something could be added very easily like so:
```
/services
    /matches
        leaderboard-service.ts
        match-day-service.ts
    /players
        player-service.ts
        player-position-service.ts
```

### Test Cases
Tests were written in the Jest testing framework. My approach was to focus on writing tests that cover the behavior of the application, as opposed to simply reaching a specific test coverage metric.
In my opinion, tests that are based on the expected behavior of the application will better catch bugs and edge cases that may not be covered by tests that simply aim to reach a certain coverage percentage. This happened to me while I was testing the `addTeamMatchPoints` function. My tests told me to add an additional condition to the function (if a team does not exist in the leaderboard object).
Lastly, I believe writing tests based on behavior can also make it easier to understand and maintain the test suite, as the tests will be more closely aligned with the overall design and functionality of the application.

### Error Handling
- The application handles if no input file is given. A console output will be shown in the `stdout`.
- Line items are skipped via a RegEx in the `processSoccerMatch` function.

### Technical Constraints
One of the limitiations I encoutered was this program does not run continously (even reaching the end of a file). The application will close once the end of the file is reached. This is one of the limitations of Node's `createReadStream`.

Secondly, while I was not able to test for a TB in file size, I simulated a "larger" sample size with a million line item records. To run this, you can run the run the bash script in the repo called `matches`. Run these commands:
```
chmod +x ./matches
./matches
```
While testing this, I opened up the linux `top` command to show the active linux processes. After hitting `Ctrl + i`, I was able to witness a consistent %CPU% ~12% & the %MEM ~3.3%. This is great if this service needed to run on an instance with other services (maybe on EC2).

### Clean Code
I am using Prettier & ESLint to help enforce a consistent coding style and identify potential errors or issues in code. Additionally, I wanted to ensure my project used clean code best practices. Here was some of my thoughts while I was building this application:
1. Capture complicated logic in a very descriptive, self-reading functions or variables.
2. Avoid unnecessary indentation, smartly handle conditional code using if statements at the beginning of functions (prevent the code having to read unncessary lines).
3. Focus on writing self explanatory code that makes sense to even a junior developer and in case of complex code/logic, document using the comments properly.
4. Take advantage of writing pure functions, functions that always return the expected output with its inputs. This makes unit testing much easier!
