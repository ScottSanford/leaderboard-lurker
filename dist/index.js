"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const teams = new Map();
let matchday = 1;
const processResult = (result) => {
    const [homeTeam, homeScore, awayTeam, awayScore] = result.split(', ');
    addTeam(homeTeam);
    addTeam(awayTeam);
    if (homeScore > awayScore) {
        teams.get(homeTeam).points += 3;
    }
    else if (homeScore < awayScore) {
        teams.get(awayTeam).points += 3;
    }
    else {
        teams.get(homeTeam).points += 1;
        teams.get(awayTeam).points += 1;
    }
};
const getTopTeams = () => {
    const sortedTeams = [...teams.values()].sort((a, b) => b.points - a.points);
    console.log(`Matchday ${matchday}`);
    for (let i = 0; i < 3; i++) {
        console.log(`${sortedTeams[i].name}, ${sortedTeams[i].points} pts`);
    }
    console.log('\n');
    matchday++;
};
const addTeam = (name) => {
    if (!teams.has(name)) {
        teams.set(name, { name, points: 0 });
    }
};
const file = process.argv[2];
const results = (0, fs_1.readFileSync)(file, 'utf8').split('\n');
results.forEach((result) => {
    processResult(result);
    getTopTeams();
});
//# sourceMappingURL=index.js.map