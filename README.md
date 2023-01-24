# Welcome to LeaderboardLurker :soccer:
The ultimate tool for tracking (or lurking to see) the top teams in your league!
To get started, you'll need to install the executable locally by running the following command. This program runs on NodeJS (tested on `v16.19.0`). The recommended approach to install this Node version is through [Node Version Manager](https://github.com/nvm-sh/nvm).
After successfully installing `nvm` and running `v16.19.0`, run the following command in your terminal prompt.
```bash
npm run install:global
```
This will install _node_modules_, build the project, & install the `leaderboardlurker` command locally to your machine. Once the installation is complete, you can run the tool using one of the following commands:

1. `leaderboardlurker input/sample-input.txt`
2. `cat input/sample-input.txt | leaderboardlurker`
3. `leaderboardlurker < input/sample-input.txt`

To run tests, run the following command: `npm test`

With LeaderboardLurker, you'll never have to play hide-and-seek with the league leaders again! Our tool is like a sherlock for the soccer world, it finds the answers you need in no time.

So, don't be a benchwarmer, join the game and become a __leaderboard lurker__ today!
___
# Architectual Decisions
The app uses NodeJS `v16.19.0` and is written in TypeScript. TypeScript provides additional type safety on top of JavaScript while also improving the development experience through IDE's and linters. I chose Node + TypeScript as those were my strongest languages, however, after completing this exercise I felt I could easily complete this app in Ruby.

The application is architected into 3 main components:
1. Command Line Parser
2. Read & Process Streamer
3. Business Core Logic (Services)
## Command Line Parser
`src/index.ts` > `index`
This is the entry point into the CLI application. Inside the function, it starts by checking whether the standard input (stdin) and standard output (stdout) are terminal interface (TTY) or not. For example, if the user types in the following commands:
```
cat path/to/sample-input.txt | leaderboardlurker
// or
leaderboardlurker < <sample-text-file.txt>
```
If either one of them is not a TTY, it supplies the `readAndProcessStream` function with the `process.stdin` as the way to identify the input file to read and parse.
Otherwise, the function performs an error check to see if the user supplied an input file location as one of the terminal arguments. If the user forgot to supply a file argument, the program will log two messages to the console and return. For example, if the user types:
```
leaderboardlurker
```
Lastly, if neither the first two conditions are met, then we must have a file that was supplied via the process.argv[2] like so:
```
leaderboardlurker input/sample-input.txt
```
### Read & Process Streamer
`src/read-process-stream.ts` > `readAndProcessStream`
This is the main function to read and process the text file line by line. Originally, I decided to use `fs.readFileSync` to read the file, however, the prompt suggested the app should handle "input data could be in the order of terabytes". In order to handle larger file sizes, I decided to go with `fs.createReadStream`. This reads the file's contents in chunks, rather than all at once. This doesn't need to load the entire file into memory, and also it can start sending the data as soon as it starts reading.

Additionally, `readAndProcessStream` abstracts the business logic by requiring processing callbacks (`processLineCallback` & `processCloseCallback`) as part of the function's arguments. There are some benefits that were considered here:
1. Loosely coupled logic
2. Unit tests are easier to write
3. Easier ability to add additional business requirements (i.e. Business requirements now require to process player stats)

If I were to refactor to support additional requirements, I would consider creating an additional function to check for the line type that would dictate which set of business logic to use.

### Business Core Logic (Services)
`src/services/`
This directory contains the business logic of the application. My file and folder organizational approach was to create a single directory to contain all business logic. I also seperated similar logic into their own respective files. Currently there are only 2 files to handle the current business use cases: `leaderboard-service.ts` & `match-day-service.ts`, but I envisioned something could be added very easily like so:
```
/services
    /matches
        leaderboard-service.ts
        match-day-service.ts
    /players
        player-service.ts
        player-position-service.ts
```

#### Match Day Service
`src/services/match-day-service.ts`
- `processSoccerMatch` is the wrapper around handling the file input line by line. I first do an early return to check if the line item is valid based on the regex test. Next, if the line is valid, I check if the match day has ended (using a separate function to better understand what the if statement is checking) to output the results. If not, then I keep going, adding the results to a state array variable for the teams that currently played and updating the leaderboard.

#### Leaderboard Service
`src/services/leaderboard-service.ts`
- Since the business requirements required the app to persist state, I decided to use an object to keep record of each team's consecutive total points.
- Initially, this file contained impure functions, functions that did not return anything and was doing many side-effects. I refactored this file to include a `addTeamMatchPoints`, that manages the leaderboard state in cleaner way. This made unit testing this section much easier.
- `getLeagueLeaders` is where we take the leaderboard state object and return a new object where first we are sorting the values by total team points, slicing to return just the top 3 results, and then taking advantage of Array.reduce to return a new accumulated object. I added a 2nd argument to this function in case business requirements changed (maybe to show top 5).

### Test Cases
Tests were written in the Jest testing framework. My approach was to focus on writing tests that cover the behavior of the application, as opposed to simply reaching a specific test coverage metric.
In my opinion, tests that are based on the expected behavior of the application will better catch bugs and edge cases that may not be covered by tests that simply aim to reach a certain coverage percentage. This happened to me while I was testing the `addTeamMatchPoints` function. My tests told me to add an additional condition to the function (if a team does not exist in the leaderboard object).
Lastly, I believe writing tests based on behavior can also make it easier to understand and maintain the test suite, as the tests will be more closely aligned with the overall design and functionality of the application.

### Error Handling
- The application handles if no input file is given. A console output will be shown in the `stdout`.
- Line items are skipped via a RegEx in the `processSoccerMatch` function.

### Technical Constraints
One of the limitiations I encoutered was this program does not run continuously after reaching the end of a file. The application will close once the end of the file is reached. This is one of the limitations of Node's `fs.createReadStream`.

Secondly, while I was not able to test for a TB in file size, I simulated a "larger" sample size with a million line items. To run this, you can run the run the bash script I created in the repo called `matches`. Run this command (note: it will take a few seconds):
```
npm run generate:matches
```
While running the larger sample size, I was curious to see how my local machine would handle this IO operation. I opened up the linux `top` command to show the active linux processes. After hitting `Ctrl + i`, I was able to witness a consistent %CPU% ~12% & the %MEM ~3.3%. This is great if this service needed to run on an instance with other services (maybe on EC2).

Lastly, another approach I considered to handle large CPU-intesnive input loads was taking advantage of [Node's Worker Threads](https://nodejs.org/api/worker_threads.html#worker-threads). While not used in this project, this was considered if I experiencing CPU limits. In the end, I ended up settling with just using `fs.createReadStream`, which felt significant for this week's worth project.

### Clean Code
I am using Prettier & ESLint to help enforce a consistent coding style and identify potential errors or issues in code. Additionally, I wanted to ensure my project used clean code best practices. Here was some of my thoughts while I was building this application:
1. Capture complicated logic in very descriptive, self-reading functions & variables.
2. Avoid unnecessary indentation, smartly handle conditional code using if statements at the beginning of functions (prevent the code having to read unncessary lines).
3. Take advantage of writing pure functions, functions that always return the expected output with its inputs. This makes unit testing much easier!
4. Focus on writing self explanatory code that even makes sense to junior developers.
