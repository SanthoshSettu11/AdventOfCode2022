

const oponentelfPlay = {
    A: 'rock',
    B: 'paper',
    C: 'scissor',
}

const minePlay = {
    X: 'rock',
    Y: 'paper',
    Z: 'scissor',
}


const points = {
    rock: 1,
    paper: 2,
    scissor: 3,
}

const winLosePoints = {
    win: 6,
    draw: 3,
    lose: 0,
}

const constraints = [
    'rock>scissor',
    'scissor>paper',
    'paper>rock'
];

const elfsOpinions = {
    X: 'lose',
    Y: 'draw',
    Z: 'win',
};

const scenariosList = {
    rock: {
        win: 'paper',
        lose: 'scissor',
        draw: 'rock'
    },
    paper: {
        win: 'scissor',
        lose: 'rock',
        draw: 'paper'
    },
    scissor: {
        win: 'rock',
        lose: 'paper',
        draw: 'scissor',
    }
};

const fs = require('fs');

const elfStratergies = fs.readFileSync('day02.txt', { encoding: 'utf-8'} );
let myscore = 0;
let expectedScore = 0;


const checkWithElfsOpinion = (myRoundValue, elfPlay) => {
    const expectedResult = elfsOpinions[myRoundValue];
    expectedScore = expectedScore + winLosePoints[expectedResult] + points[scenariosList[elfPlay][expectedResult]];
}

elfStratergies?.split('\n')?.forEach(eachRound => {
    const roundValues = eachRound?.split(' ');
    if (roundValues[0] && roundValues[1]) {
        const elfs = oponentelfPlay[roundValues[0]];
        const mine = minePlay[roundValues[1]];
        if (elfs === mine) {
            myscore = myscore + winLosePoints.draw + points[mine]
            checkWithElfsOpinion(roundValues[1], elfs);
        } else {
            const winCase = mine + '>' + elfs;
            if(constraints.includes(winCase)) {
                myscore = myscore + winLosePoints.win + points[mine];
                checkWithElfsOpinion(roundValues[1], elfs);
            } else {
                myscore = myscore + winLosePoints.lose + points[mine];
                checkWithElfsOpinion(roundValues[1], elfs);
            }
        }
    }
});


console.log(myscore);

console.log(expectedScore);